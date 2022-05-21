<template>
  <div :style="styleObject" :class="classList" class="l-row">
    <slot />
  </div>
</template>

<script>
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-row-'

export default {
  name: 'LRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      default: 'start',
      validator (value) {
        const horizontalList = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']
        return oneOf(value, horizontalList)
      }
    },
    align: {
      type: String,
      default: 'top',
      validator (value) {
        const verticalList = ['top', 'middle', 'bottom']
        return oneOf(value, verticalList)
      }
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    styleObject () {
      const { gutter } = this
      let styleMargin = null
      if (gutter) {
        const gap = -(gutter / 2) + 'px'
        styleMargin = {
          marginRight: gap,
          marginLeft: gap
        }
      }
      return gutter ? styleMargin : null
    },
    classList () {
      const { justify, align, wrap } = this
      return [
        justify && createClass(classPrefix, justify),
        align && createClass(classPrefix, align),
        !wrap && createClass(classPrefix, 'no-wrap')
      ]
    }
  },
  mounted () {
    this.checkChild()
  },
  methods: {
    checkChild () {
      for (let i = 0; i < this.$el.children.length; i++) {
        if (!this.$el.children.item(i).classList.contains('l-col')) {
          console.warn('LRow 组件的直接子组件应该是 LCol')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.l-row {
  display: flex;
  flex-wrap: wrap;
}
.l-row-start {
  justify-content: flex-start;
}
.l-row-end {
  justify-content: flex-end;
}
.l-row-center {
  justify-content: center;
}
.l-row-space-between {
  justify-content: space-between;
}
.l-row-space-around {
  justify-content: space-around;
}
.l-row-space-evenly {
  justify-content: space-evenly;
}
.l-row-top {
  align-items: flex-start;
}
.l-row-middle {
  align-items: center;
}
.l-row-bottom {
  align-items: flex-end;
}
.l-row-no-wrap {
  flex-wrap: nowrap;
}
</style>
