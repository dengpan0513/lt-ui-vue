<template>
  <aside :style="styleWidth" :class="classList" class="l-layout-sider">
    <div class="l-layout-sider-children">
      <slot />
    </div>
    <div
      v-if="visibleTrigger"
      :style="styleWidth"
      :class="classListTrigger"
      class="l-layout-sider-trigger"
      @click="onClickTrigger"
    >
      <slot name="trigger" :collapsed="collapsedLocal">
        <template v-if="!reverseArrow">
          <l-icon v-if="!collapsedLocal" name="left" />
          <l-icon v-else name="right" />
        </template>
        <template v-else>
          <l-icon v-if="collapsedLocal" name="left" />
          <l-icon v-else name="right" />
        </template>
      </slot>
    </div>
  </aside>
</template>

<script>
import LIcon from '../Icon/Icon.vue'
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-layout-sider-'
const breakpointMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
}

export default {
  name: 'LSider',
  components: { LIcon },
  model: {
    prop: 'collapsed',
    event: 'update:collapsed'
  },
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    theme: {
      type: String,
      default: 'light',
      validator (value) {
        const themeList = ['light', 'dark']
        return oneOf(value, themeList)
      }
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    hideTrigger: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: undefined
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: [Number, String],
      default: 48
    },
    reverseArrow: {
      type: Boolean,
      default: false
    },
    breakpoint: {
      type: String,
      default: undefined,
      validator (value) {
        const breakpointList = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
        return oneOf(value, breakpointList)
      }
    }
  },
  data () {
    const { collapsed, defaultCollapsed } = this
    const collapsedLocal = collapsed !== undefined ? collapsed : defaultCollapsed
    return {
      collapsedLocal,
      mql: null
    }
  },
  computed: {
    visibleTrigger () {
      const { collapsible, hideTrigger } = this
      return collapsible && !hideTrigger
    },
    classList () {
      const { theme, visibleTrigger } = this
      return [
        createClass(classPrefix, theme),
        visibleTrigger && createClass(classPrefix, 'can-collapse')
      ]
    },
    classListTrigger () {
      const { visibleTrigger, theme } = this
      return [
        visibleTrigger && createClass(classPrefix, 'trigger-', theme)
      ]
    },
    styleWidth () {
      const { collapsedLocal, width, collapsedWidth } = this
      const widthReal = collapsedLocal ? collapsedWidth : width
      const widthValue = typeof widthReal === 'number' ? `${widthReal}px` : widthReal
      return {
        width: widthValue
      }
    }
  },
  mounted () {
    this.handleBreakpoint()
  },
  beforeDestroy () {
    this.mql?.removeEventListener('change', this.onResponsiveTrigger)
  },
  methods: {
    setCollapsed (collapsed, type) {
      this.collapsedLocal = !collapsed
      this.$emit('update:collapsed', this.collapsedLocal)
      this.$emit('collapse', this.collapsedLocal, type)
      if (type === 'responsiveTrigger') {
        this.$emit('breakpoint', this.collapsedLocal)
      }
    },
    onClickTrigger () {
      this.setCollapsed(this.collapsedLocal, 'clickTrigger')
    },
    onResponsiveTrigger (mql) {
      const { matches } = mql
      this.setCollapsed(matches, 'responsiveTrigger')
    },
    handleBreakpoint () {
      if (typeof window !== 'undefined') {
        const { matchMedia } = window
        const { breakpoint } = this
        if (matchMedia && breakpoint && breakpoint in breakpointMap) {
          const minWidth = breakpointMap[this.breakpoint]
          this.mql = matchMedia(`(min-width: ${minWidth})`)
          this.mql.addEventListener('change', this.onResponsiveTrigger)
          this.onResponsiveTrigger(this.mql)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
$transition-width: width .2s cubic-bezier(.34, .69, .1, 1);

.l-layout-sider {
  flex-shrink: 0;
  position: relative;
  transition: $transition-width;
}
.l-layout-sider-can-collapse {
  padding-bottom: 48px;
}
.l-layout-sider-light {
  background-color: #fff;
}
.l-layout-sider-dark {
  background-color: #232324;
}
.l-layout-sider-children {
  height: 100%;
  overflow: auto;
}
.l-layout-sider-trigger {
  line-height: 48px;
  text-align: center;
  z-index: 1;
  cursor: pointer;
  transition: $transition-width;
  &.l-layout-sider-trigger-light {
    background-color: #fff;
    color: $color-text-dark;
  }
  &.l-layout-sider-trigger-dark {
    background-color: rgba(255, 255, 255, .2);
    color: #fff;
  }
}
</style>
