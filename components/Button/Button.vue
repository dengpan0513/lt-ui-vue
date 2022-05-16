<template>
  <button
    :class="classList"
    :type="htmlType"
    :disabled="disabled"
    class="l-button"
    @click="onClick"
  >
    <l-icon v-if="loading" name="loading" spin class="l-button-icon" />
    <l-icon v-else :name="icon" class="l-button-icon" />
    <span v-if="$slots.default" class="l-button-name">
      <slot />
    </span>
  </button>
</template>

<script>
import LIcon from '../Icon/Icon.vue'
import { oneOf, createClass } from '@/utils/index.js'

const classPrefix = 'l-button-'

export default {
  name: 'LButton',
  components: { LIcon },
  props: {
    type: {
      type: String,
      default: 'secondary',
      validator (value) {
        const typeList = ['secondary', 'primary', 'dashed', 'outline', 'text']
        return oneOf(value, typeList)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator (value) {
        const sizeList = ['large', 'medium', 'small', 'mini']
        return oneOf(value, sizeList)
      }
    },
    htmlType: {
      type: String,
      default: 'button',
      validator (value) {
        const htmlTypeList = ['button', 'submit', 'reset']
        return oneOf(value, htmlTypeList)
      }
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (value) {
        const iconPositionList = ['left', 'right']
        return oneOf(value, iconPositionList)
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      validator (value) {
        const statusList = ['success', 'warning', 'danger']
        return oneOf(value, statusList)
      }
    },
    shape: {
      type: String,
      default: 'square',
      validator (value) {
        const shapeList = ['square', 'circle', 'round']
        return oneOf(value, shapeList)
      }
    },
    long: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { type, size, icon, iconPosition, loading, status, shape, long } = this
      const { default: defaultSlot } = this.$slots
      return [
        createClass(classPrefix, type),
        createClass(classPrefix, size),
        (icon || loading) && iconPosition && createClass(classPrefix, 'icon-', iconPosition),
        !defaultSlot && createClass(classPrefix, 'icon-only'),
        loading && createClass(classPrefix, 'loading'),
        status && createClass(classPrefix, status),
        createClass(classPrefix, 'shape-', shape),
        long && createClass(classPrefix, 'long')
      ]
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
$icon-margin: 8px;
@mixin button-size($height, $padding, $padding-icon-only, $is-mini: fasle) {
  height: $height;
  padding: $padding;
  @if $is-mini {
    font-size: $font-size-small;
    line-height: 20px;
  }
  &.l-button-icon-only {
    padding-right: $padding-icon-only;
    padding-left: $padding-icon-only;
  }
  &.l-button-shape-round {
    border-radius: $height * 0.5;
  }
  &.l-button-shape-circle {
    border-radius: 50%;
  }
}
@mixin focus-visible($color) {
  border-color: $color;
  box-shadow: 0 0 3px $color;
  outline: 0;
}
@mixin button-secondary($bgc, $color, $bgc-hover, $bgc-active, $color-focus-visible, $bgc-disabled, $color-disabled) {
  background-color: $bgc;
  color: $color;
  &:hover {
    background-color: $bgc-hover;
  }
  &:active {
    background-color: $bgc-active;
  }
  &:focus-visible {
    @include focus-visible($color-focus-visible);
  }
  &[disabled] {
    background-color: $bgc-disabled;
    color: $color-disabled;
  }
}
@mixin button-primary($bgc, $bgc-hover, $bgc-active, $color-focus-visible, $bgc-disabled) {
  background-color: $bgc;
  color: #fff;
  &:hover {
    background-color: $bgc-hover;
  }
  &:active {
    background-color: $bgc-active;
  }
  &:focus-visible {
    @include focus-visible($color-focus-visible);
  }
  &[disabled] {
    background-color: $bgc-disabled;
  }
}
@mixin button-dashed($bgc, $bdc, $color, $bgc-hover, $bdc-hover, $bgc-active, $bdc-active, $color-focus-visible, $color-disabled) {
  background-color: $bgc;
  border: 1px dashed $bdc;
  color: $color;
  &:hover {
    background-color: $bgc-hover;
    border-color: $bdc-hover;
  }
  &:active {
    background-color: $bgc-active;
    border-color: $bdc-active;
  }
  &:focus-visible {
    @include focus-visible($color-focus-visible);
  }
  &[disabled] {
    background-color: $bgc;
    border-color: $bdc;
    color: $color-disabled;
  }
}
@mixin button-outline($color, $color-hover, $color-active, $color-focus-visible, $color-disabled) {
  background-color: #fff;
  border: 1px solid $color;
  color: $color;
  &:hover {
    border-color: $color-hover;
    color: $color-hover;
  }
  &:active {
    border-color: $color-active;
    color: $color-active;
  }
  &:focus-visible {
    @include focus-visible($color-focus-visible);
  }
  &[disabled] {
    border: 1px solid $color-disabled;
    color: $color-disabled;
  }
}
@mixin button-text($color, $color-disabled) {
  background-color: #fff;
  color: $color;
  &:hover {
    background-color: $color-fill;
  }
  &:active {
    background-color: $color-fill-dark;
  }
  &:focus-visible {
    background-color: $color-fill;
    outline: 0;
  }
  &[disabled] {
    background-color: #fff;
    color: $color-disabled;
  }
}

.l-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: $border-radius-small;
  line-height: 1.5715;
  font-size: 14px;
  color: $color-text;
  font-weight: 400;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  &[disabled] {
    cursor: not-allowed;
  }
}

.l-button-medium {
  @include button-size(32px, (5px 16px), 8px);
}
.l-button-large {
  @include button-size(36px, (7px 20px), 10px);
}
.l-button-small {
  @include button-size(28px, (3px 16px), 6px);
}
.l-button-mini {
  @include button-size(24px, (2px 12px), 5px, true);
}

.l-button-icon-left {
  > .l-button-name {
    margin-left: $icon-margin;
  }
}
.l-button-icon-right {
  > .l-button-name {
    order: -1;
    margin-right: $icon-margin;
  }
}

.l-button-loading {
  position: relative;
  pointer-events: none;
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: 1;
    background-color: #fff;
    border-radius: inherit;
    opacity: .4;
    cursor: default;
  }
}

.l-button-long {
  display: flex;
  width: 100%;
}

.l-button-secondary {
  @include button-secondary($color-fill, $color-text, $color-fill-dark, $color-fill-darker, $color-fill-darker, $color-fill-light, $color-text-gray);
  &.l-button-success {
    @include button-secondary($color-success-1, $color-success-6, $color-success-2, $color-success-3, $color-success-7, $color-success-1, $color-success-3);
  }
  &.l-button-warning {
    @include button-secondary($color-warning-1, $color-warning-6, $color-warning-2, $color-warning-3, $color-warning-7, $color-warning-1, $color-warning-3);
  }
  &.l-button-danger {
    @include button-secondary($color-danger-1, $color-danger-6, $color-danger-2, $color-danger-3, $color-danger-7, $color-danger-1, $color-danger-3);
  }
}

.l-button-primary {
  @include button-primary($color-primary-6, $color-primary-5, $color-primary-7, $color-primary-7, $color-primary-3);
  &.l-button-success {
    @include button-primary($color-success-6, $color-success-5, $color-success-7, $color-success-7, $color-success-3);
  }
  &.l-button-warning {
    @include button-primary($color-warning-6, $color-warning-5, $color-warning-7, $color-warning-7, $color-warning-3);
  }
  &.l-button-danger {
    @include button-primary($color-danger-6, $color-danger-5, $color-danger-7, $color-danger-7, $color-danger-3);
  }
}

.l-button-dashed {
  @include button-dashed($color-fill, $color-fill-dark, $color-text, $color-fill-dark, $color-fill-darker, $color-fill-darker, $color-text-light, $color-fill-darker, $color-text-gray);
  &.l-button-success {
    @include button-dashed($color-success-1, $color-success-2, $color-success-6, $color-success-2, $color-success-3, $color-success-3, $color-success-5, $color-success-7, $color-success-3);
  }
  &.l-button-warning {
    @include button-dashed($color-warning-1, $color-warning-2, $color-warning-6, $color-warning-2, $color-warning-3, $color-warning-3, $color-warning-5, $color-warning-7, $color-warning-3);
  }

  &.l-button-danger {
    @include button-dashed($color-danger-1, $color-danger-2, $color-danger-6, $color-danger-2, $color-danger-3, $color-danger-3, $color-danger-5, $color-danger-7, $color-danger-3);
  }
}

.l-button-outline {
  @include button-outline($color-primary-6, $color-primary-5, $color-primary-7, $color-primary-7, $color-primary-3);
  &.l-button-success {
    @include button-outline($color-success-6, $color-success-5, $color-success-7, $color-success-7, $color-success-3);
  }
  &.l-button-warning {
    @include button-outline($color-warning-6, $color-warning-5, $color-warning-7, $color-warning-7, $color-warning-3);
  }
  &.l-button-danger {
    @include button-outline($color-danger-6, $color-danger-5, $color-danger-7, $color-danger-7, $color-danger-3);
  }
}

.l-button-text {
  @include button-text($color-primary-6, $color-primary-3);
  &.l-button-success {
    @include button-text($color-success-6, $color-success-3);
  }
  &.l-button-warning {
    @include button-text($color-warning-6, $color-warning-3);
  }
  &.l-button-danger {
    @include button-text($color-danger-6, $color-danger-3);
  }
}
</style>
