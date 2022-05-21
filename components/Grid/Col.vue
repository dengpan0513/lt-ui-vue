<template>
  <div :class="classList" :style="styleObjet" class="l-col">
    <slot />
  </div>
</template>

<script>
import { createClass } from '@/utils/index.js'
const classPrefix = 'l-col-'

export default {
  name: 'LCol',
  props: {
    span: {
      type: Number
    },
    offset: {
      type: Number
    },
    push: {
      type: Number
    },
    pull: {
      type: Number
    },
    order: {
      type: Number
    }
  },
  data () {
    return {
      gutterParent: 0
    }
  },
  computed: {
    classList () {
      const { span, offset, push, pull, order } = this
      const classSpan = span === 0 ? `${classPrefix}0` : span && createClass(classPrefix, span)
      return [
        classSpan,
        offset && createClass(classPrefix, 'offset-', offset),
        push && createClass(classPrefix, 'push-', push),
        pull && createClass(classPrefix, 'pull-', pull),
        order && createClass(classPrefix, 'order-', order)
      ]
    },
    styleObjet () {
      const { gutterParent } = this
      let stylePadding = null
      if (gutterParent) {
        const gap = (gutterParent / 2) + 'px'
        stylePadding = {
          paddingRight: gap,
          paddingLeft: gap
        }
      }
      return gutterParent ? stylePadding : null
    }
  },
  created () {
    this.getGutter()
  },
  methods: {
    getGutter () {
      const parent = this.$parent
      if (parent) {
        const { name } = parent.$options
        const { gutter } = parent
        this.gutterParent = name === 'LRow' ? gutter : 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@for $n from 1 through 24 {
  $width: math.percentage(math.div($n, 24));
  .l-col-#{$n} {
    width: $width;
  }
  .l-col-offset-#{$n} {
    margin-left: $width;
  }
  .l-col-push-#{$n} {
    left: $width;
  }
  .l-col-pull-#{$n} {
    right: $width;
  }
  .l-col-order-#{$n} {
    order: $n;
  }
}

.l-col {
  flex-shrink: 0;
  position: relative;
  &.l-col-0 {
    display: none;
  }
}
</style>
