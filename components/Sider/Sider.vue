<template>
  <aside :style="styleObject" :class="classList" class="l-layout-sider">
    <div class="l-layout-sider-children">
      <slot />
    </div>
    <div
      v-if="collapsible"
      :class="classListTrigger"
      class="l-layout-sider-trigger"
      @click="onClickTrigger"
    >
      <l-icon v-if="!isCollapsed" name="left" />
      <l-icon v-else name="right" />
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
    }
  },
  computed: {
    styleObject () {
      const { width } = this
      const widthValue = typeof width === 'number' ? `${width}px` : width
      return {
        width: widthValue
      }
    },
    classList () {
      const { theme, collapsible } = this
      return [
        createClass(classPrefix, theme),
        collapsible && createClass(classPrefix, 'can-collapse')
      ]
    },
    classListTrigger () {
      const { collapsible, theme } = this
      return [
        collapsible && createClass(classPrefix, 'trigger-', theme)
      ]
    },
    isCollapsed: {
      get () {
        const { collapsed, defaultCollapsed } = this
        return collapsed !== undefined ? collapsed : defaultCollapsed
      },
      set (value) {
        console.log('set', value)
        this.$emit('update:collapsed', value)
      }
    }
  },
  methods: {
    onClickTrigger () {
      console.log('click', this.isCollapsed)
      this.isCollapsed = !this.isCollapsed
      this.$emit('collapse')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;

.l-layout-sider {
  flex-shrink: 0;
  position: relative;
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
