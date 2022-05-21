<template>
  <div :class="classList" class="l-col">
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
  computed: {
    classList () {
      const { span, offset, push, pull, order } = this
      return [
        span && createClass(classPrefix, span),
        offset && createClass(classPrefix, 'offset-', offset),
        push && createClass(classPrefix, 'push-', push),
        pull && createClass(classPrefix, 'pull-', pull),
        order && createClass(classPrefix, 'order-', order)
      ]
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
}
</style>
