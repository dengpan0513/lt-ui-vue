<template>
  <a
    :href="href"
    :target="target"
    :class="classList"
    :tabindex="tabindex"
    class="l-link"
    @click="onClick"
  >
    <l-icon :name="icon" class="l-link-icon" />
    <slot />
  </a>
</template>

<script>
import LIcon from '../Icon/Icon.vue'
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-link-'

export default {
  name: 'LLink',
  components: { LIcon },
  props: {
    href: {
      type: String
    },
    target: {
      type: String,
      default: '_blank',
      validator (value) {
        const targetList = ['_self', '_blank', '_parent', '_top']
        return oneOf(value, targetList)
      }
    },
    underline: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      validator (value) {
        const statusList = ['success', 'warning', 'error']
        return oneOf(value, statusList)
      }
    },
    icon: {
      type: String
    },
    isHover: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { underline, status, isHover, disabled } = this
      return [
        underline && createClass(classPrefix, 'underline'),
        status && createClass(classPrefix, status),
        !isHover && createClass(classPrefix, 'no-hover'),
        disabled && createClass(classPrefix, 'disabled')
      ]
    },
    tabindex () {
      const { disabled } = this
      return disabled === true ? -1 : false
    }
  },
  methods: {
    onClick (event) {
      if (this.disabled) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
@mixin focus-visible($color) {
  &:not(.l-link-disabled) {
    outline: 1px solid $color;
    outline-offset: 0;
    box-shadow: 0 0 3px $color;
  }
}
@mixin link-status($color, $color-focus-visible, $color-disabled) {
  color: $color;
  &:focus-visible {
    @include focus-visible($color-focus-visible);
  }
  &.l-link-disabled {
    color: $color-disabled;
  }
}

.l-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;
  background-color: transparent;
  border-radius: $border-radius-small;
  vertical-align: middle;
  line-height: 1.5715;
  font-size: $font-size;
  color: $color-primary-6;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: $color-fill;
  }
  &:active {
    background-color: $color-fill-dark;
  }
  &:focus-visible {
    @include focus-visible($color-primary-7);
  }
  .l-link-icon {
    margin-right: 4px;
    font-size: $font-size-small;
  }
  &.l-link-disabled {
    background-color: transparent;
    color: $color-primary-3;
    cursor: not-allowed;
    outline: 0;
  }
}
.l-link-underline {
  text-decoration: underline;
}
.l-link-success {
  @include link-status($color-success-6, $color-success-7, $color-success-3);
}
.l-link-warning {
  @include link-status($color-warning-6, $color-warning-7, $color-warning-3);
}
.l-link-error {
  @include link-status($color-danger-6, $color-danger-7, $color-danger-3);
}
.l-link-no-hover {
  &:hover, &:active {
    background-color: transparent;
  }
}
</style>
