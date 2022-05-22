<template>
  <div
    :style="styleObject"
    :class="classList"
    class="l-divider"
  >
    <span
      v-if="isHorizontal && $slots.default"
      :class="classTextList"
      class="l-divider-text"
    >
      <slot />
    </span>
  </div>
</template>

<script>
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-divider-'

export default {
  name: 'LDivider',
  props: {
    type: {
      type: String,
      default: 'solid',
      validator (value) {
        const typeList = ['solid', 'dashed', 'dotted', 'double']
        return oneOf(value, typeList)
      }
    },
    color: {
      type: String,
      default: '#e5e6eb'
    },
    gap: {
      type: [Number, String]
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        const directionList = ['horizontal', 'vertical']
        return oneOf(value, directionList)
      }
    },
    textPosition: {
      type: String,
      default: 'center',
      validator (value) {
        const textPositionList = ['left', 'center', 'right']
        return oneOf(value, textPositionList)
      }
    }
  },
  computed: {
    isHorizontal () {
      const { direction } = this
      return direction === 'horizontal'
    },
    styleObject () {
      const { isHorizontal, type, color, gap } = this
      const styleBorder = isHorizontal
        ? { borderBottomStyle: type, borderBottomColor: color }
        : { borderLeftStyle: type, borderLeftColor: color }
      let styleMargin = null
      if (gap) {
        const margin = typeof gap === 'string' ? gap : `${gap}px`
        styleMargin = isHorizontal
          ? { marginTop: margin, marginBottom: margin }
          : { marginRight: margin, marginLeft: margin }
      }
      return {
        ...styleBorder,
        ...styleMargin
      }
    },
    classList () {
      const { direction } = this
      return [
        createClass(classPrefix, direction)
      ]
    },
    classTextList () {
      const { isHorizontal, textPosition } = this
      return [
        isHorizontal && createClass(classPrefix, 'text-', textPosition)
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;

.l-divider {
  position: relative;
  .l-divider-text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 16px;
    padding-left: 16px;
    background-color: #fff;
    font-size: $font-size-small;
    color: $color-text-dark;
    font-weight: 500;
    &.l-divider-text-left {
      left: 24px;
    }
    &.l-divider-text-center {
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.l-divider-text-right {
      right: 24px;
    }
  }
}
.l-divider-horizontal {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
}
.l-divider-vertical {
  display: inline-block;
  height: 1em;
  margin-right: 12px;
  margin-left: 12px;
  border-left-width: 1px;
  vertical-align: middle;
}
</style>
