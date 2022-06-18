<script>
import LDivider from '../Divider/Divider.vue'
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-space-'

export default {
  name: 'LSpace',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        const directionList = ['horizontal', 'vertical']
        return oneOf(value, directionList)
      }
    },
    size: {
      type: [String, Number, Array],
      default: 'small',
      validator (value) {
        let valid = true
        const sizeList = ['mini', 'small', 'medium', 'large']
        if (typeof value === 'string') {
          valid = oneOf(value, sizeList)
        }
        if (Array.isArray(value)) {
          valid = value.every(size => typeof size === 'number' || oneOf(size, sizeList))
        }
        return valid
      }
    },
    wrap: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      validator (value) {
        const alignList = ['start', 'end', 'center', 'baseline']
        return oneOf(value, alignList)
      }
    },
    fill: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { direction, size, wrap, align, fill } = this
      const classSize = typeof size === 'string' && createClass(classPrefix, 'size-', size)
      const isHorizontal = direction === 'horizontal'
      return [
        'l-space',
        createClass(classPrefix, direction),
        classSize,
        isHorizontal && wrap && createClass(classPrefix, 'wrap'),
        align && createClass(classPrefix, 'align-', align),
        fill && createClass(classPrefix, 'fill')
      ]
    },
    styleObject () {
      const { size } = this
      const gapStyle = {}
      if (typeof size === 'number') {
        gapStyle.gap = `${size}px`
      }
      if (Array.isArray(size)) {
        const sizeMap = {
          mini: 4,
          small: 8,
          medium: 16,
          large: 24
        }
        const sizeDefault = sizeMap.small
        const gapRow = typeof size[0] === 'undefined' ? (typeof size[0] === 'number' ? size[0] : sizeMap[size[0]]) : sizeDefault
        const gapCol = typeof size[1] === 'undefined' ? (typeof size[1] === 'number' ? size[0] : sizeMap[size[1]]) : sizeDefault
        gapStyle.gap = `${gapRow}px ${gapCol}px`
      }
      return {
        ...gapStyle
      }
    }
  },
  render (h) {
    const slotsDefault = this.$slots.default ?? []
    const length = slotsDefault.length
    if (length === 0) return
    const slotsSplit = this.$slots.split
    let splitNode = null
    if (this.split && !slotsSplit) {
      splitNode = h(LDivider, {
        props: { direction: 'vertical' }
      })
    } else if (slotsSplit) {
      splitNode = slotsSplit
    }
    return h(
      'div',
      {
        class: this.classList,
        style: this.styleObject
      },
      slotsDefault.map((VNode, index) => {
        const spaceItem = h('div', { class: 'l-space-item' }, [VNode])
        const indexSpaceItem = index + 1
        if (splitNode && indexSpaceItem < length) {
          return [
            spaceItem,
            h('div', { class: 'l-space-item-split' }, [splitNode])
          ]
        }
        return spaceItem
      })
    )
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
$space-mini: 4px;
$space-small: 8px;
$space-medium: 16px;
$space-large: 24px;
@mixin space-size () {
  &.l-space-size-mini {
    gap: $space-mini;
  }
  &.l-space-size-small {
    gap: $space-small;
  }
  &.l-space-size-medium {
    gap: $space-medium;
  }
  &.l-space-size-large {
    gap: $space-large;
  }
}

.l-space {
  display: inline-flex;
  vertical-align: middle;
}
.l-space-fill {
  display: flex;
}
.l-space-wrap {
  flex-wrap: wrap;
}
.l-space-align-start {
  align-items: flex-start;
}
.l-space-align-end {
  align-items: flex-end;
}
.l-space-align-center {
  align-items: center;
}
.l-space-align-baseline {
  align-items: baseline;
}
.l-space-horizontal {
  > .l-space-item {
    @include flex-center-vertical;
  }
  @include space-size();
}
.l-space-vertical {
  flex-direction: column;
  > .l-space-item {
    @include flex-center-horizontal;
  }
  @include space-size();
}
.l-space-item-split {
  @include flex-center;
}
</style>
