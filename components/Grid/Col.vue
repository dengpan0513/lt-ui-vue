<template>
  <div :class="classList" :style="styleObjet" class="l-col">
    <slot />
  </div>
</template>

<script>
import { createClass, oneOf } from '@/utils/index.js'
const classPrefix = 'l-col-'
const validator = value => {
  let valid = true
  if (typeof value === 'object') {
    const colProps = ['span', 'offset', 'push', 'pull', 'order']
    const keys = Object.keys(value)
    keys.forEach(key => {
      valid = oneOf(key, colProps)
    })
  }
  return valid
}

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
    },
    xs: {
      type: [Number, Object],
      validator
    },
    sm: {
      type: [Number, Object],
      validator
    },
    md: {
      type: [Number, Object],
      validator
    },
    lg: {
      type: [Number, Object],
      validator
    },
    xl: {
      type: [Number, Object],
      validator
    },
    xxl: {
      type: [Number, Object],
      validator
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
      const responsiveProps = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
      const classResponsive = responsiveProps.map(prop => {
        return this.generateResponsiveClass(prop)
      })
      return [
        classSpan,
        offset && createClass(classPrefix, 'offset-', offset),
        push && createClass(classPrefix, 'push-', push),
        pull && createClass(classPrefix, 'pull-', pull),
        order && createClass(classPrefix, 'order-', order),
        ...classResponsive
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
    },
    generateResponsiveClass (prop) {
      const responsiveProp = this[prop]
      const classList = []
      if (!responsiveProp) {
        return classList
      }
      const propType = typeof responsiveProp
      const separator = '-'
      if (propType === 'number') {
        classList.push(createClass(classPrefix, prop, separator, responsiveProp))
      } else if (propType === 'object') {
        const keys = Object.keys(responsiveProp)
        keys.forEach(key => {
          const value = responsiveProp[key]
          const className = key === 'span'
            ? createClass(classPrefix, prop, separator, value)
            : createClass(classPrefix, key, separator, prop, separator, value)
          classList.push(className)
        })
      }
      return classList
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
$prefix-span: ".l-col-";
$prefix-offset: "#{$prefix-span}offset-";
$prefix-push: "#{$prefix-span}push-";
$prefix-pull: "#{$prefix-span}pull-";
$prefix-order: "#{$prefix-span}order-";
@mixin set-col-css ($span, $offset, $push, $pull, $order, $responsive-prop: null) {
  @for $n from 1 through 24 {
    $width: math.percentage(math.div($n, 24));
    #{$span}#{$responsive-prop}#{$n} {
      width: $width;
    }
    #{$offset}#{$responsive-prop}#{$n} {
      margin-left: $width;
    }
    #{$push}#{$responsive-prop}#{$n} {
      left: $width;
    }
    #{$pull}#{$responsive-prop}#{$n} {
      right: $width;
    }
    #{$order}#{$responsive-prop}#{$n} {
      order: $n;
    }
  }
}

.l-col {
  flex-shrink: 0;
  position: relative;
  &.l-col-0 {
    display: none;
  }
}
@include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order);
@include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'xs-');
@media (min-width: 576px) {
  @include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'sm-');
}
@media (min-width: 768px) {
  @include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'md-');
}
@media (min-width: 992px) {
  @include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'lg-');
}
@media (min-width: 1200px) {
  @include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'xl-');
}
@media (min-width: 1600px) {
  @include set-col-css($prefix-span, $prefix-offset, $prefix-push, $prefix-pull, $prefix-order, 'xxl-');
}
</style>
