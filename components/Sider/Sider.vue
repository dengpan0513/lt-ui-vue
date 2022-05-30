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
      <template v-if="!reverseArrow">
        <l-icon v-if="!collapsedLocal" name="left" />
        <l-icon v-else name="right" />
      </template>
      <template v-else>
        <l-icon v-if="collapsedLocal" name="left" />
        <l-icon v-else name="right" />
      </template>
    </div>
  </aside>
</template>

<script>
import LIcon from '../Icon/Icon.vue'
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-layout-sider-'

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
    }
  },
  data () {
    const { collapsed, defaultCollapsed } = this
    const collapsedLocal = collapsed !== undefined ? collapsed : defaultCollapsed
    return {
      collapsedLocal
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
      const { collapsible, theme } = this
      return [
        collapsible && createClass(classPrefix, 'trigger-', theme)
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
  methods: {
    onClickTrigger () {
      this.collapsedLocal = !this.collapsedLocal
      this.$emit('update:collapsed', this.collapsedLocal)
      this.$emit('collapse')
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
