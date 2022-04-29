<template>
  <button
    :class="classList"
    :type="htmlType"
    :disabled="disabled"
    class="l-button"
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
  component: { LIcon },
  props: {
    type: {
      type: String,
      default: 'secondary',
      validator (value) {
        const buttonTypeList = ['secondary', 'primary', 'dashed', 'outline', 'text']
        return oneOf(value, buttonTypeList)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator (value) {
        const buttonSizeType = ['large', 'medium', 'small', 'mini']
        return oneOf(value, buttonSizeType)
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
        const buttonStatusList = ['success', 'warning', 'danger']
        return oneOf(value, buttonStatusList)
      }
    }
  },
  computed: {
    classList () {
      const { type, size, icon, iconPosition, loading, status } = this
      const { default: defaultSlot } = this.$slots
      return [
        type && createClass(classPrefix, type),
        size && createClass(classPrefix, size),
        (icon || loading) && iconPosition && createClass(classPrefix, 'icon-', iconPosition),
        !defaultSlot && createClass(classPrefix, 'icon-only'),
        loading && createClass(classPrefix, 'loading'),
        status && createClass(classPrefix, status)
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
$border-radius: 2px;
$icon-margin: 8px;

.l-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: $border-radius;
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
  height: 32px;
  padding: 5px 16px;
  &.l-button-icon-only {
    padding-right: 8px;
    padding-left: 8px;
  }
}
.l-button-large {
  height: 36px;
  padding: 7px 20px;
  &.l-button-icon-only {
    padding-right: 10px;
    padding-left: 10px;
  }
}
.l-button-small {
  height: 28px;
  padding: 3px 16px;
  &.l-button-icon-only {
    padding-right: 6px;
    padding-left: 6px;
  }
}
.l-button-mini {
  height: 24px;
  padding: 2px 12px;
  font-size: $font-size-small;
  line-height: 20px;
  &.l-button-icon-only {
    padding-right: 5px;
    padding-left: 5px;
  }
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

.l-button-secondary {
  background-color: $color-fill;
  &:hover {
    background-color: $color-fill-dark;
  }
  &:active {
    background-color: $color-fill-darker;
  }
  &[disabled] {
    background-color: $color-fill-light;
    color: $color-text-gray;
  }

  &.l-button-success {
    background-color: $color-success-1;
    color: $color-success-6;
    &:hover {
      background-color: $color-success-2;
    }
    &:active {
      background-color: $color-success-3;
    }
    &[disabled] {
      background-color: $color-success-1;
      color: $color-success-3;
    }
  }

  &.l-button-warning {
    background-color: $color-warning-1;
    color: $color-warning-6;
    &:hover {
      background-color: $color-warning-2;
    }
    &:active {
      background-color: $color-warning-3;
    }
    &[disabled] {
      background-color: $color-warning-1;
      color: $color-warning-3;
    }
  }

  &.l-button-danger {
    background-color: $color-danger-1;
    color: $color-danger-6;
    &:hover {
      background-color: $color-danger-2;
    }
    &:active {
      background-color: $color-danger-3;
    }
    &[disabled] {
      background-color: $color-danger-1;
      color: $color-danger-3;
    }
  }
}

.l-button-primary {
  background-color: $color-primary-6;
  color: #fff;
  &:hover {
    background-color: $color-primary-5;
  }
  &:active {
    background-color: $color-primary-7;
  }
  &[disabled] {
    background-color: $color-primary-3;
  }

  &.l-button-success {
    background-color: $color-success-6;
    &:hover {
      background-color: $color-success-5;
    }
    &:active {
      background-color: $color-success-7;
    }
    &[disabled] {
      background-color: $color-success-3;
    }
  }

  &.l-button-warning {
    background-color: $color-warning-6;
    &:hover {
      background-color: $color-warning-5;
    }
    &:active {
      background-color: $color-warning-7;
    }
    &[disabled] {
      background-color: $color-warning-3;
    }
  }

  &.l-button-danger {
    background-color: $color-danger-6;
    &:hover {
      background-color: $color-danger-5;
    }
    &:active {
      background-color: $color-danger-7;
    }
    &[disabled] {
      background-color: $color-danger-3;
    }
  }
}

.l-button-dashed {
  background-color: $color-fill;
  border: 1px dashed $color-fill-dark;
  &:hover {
    background-color: $color-fill-dark;
    border-color: $color-fill-darker;
  }
  &:active {
    background-color: $color-fill-darker;
    border-color: $color-text-light;
  }
  &[disabled] {
    background-color: $color-fill;
    border-color: $color-fill-dark;
    color: $color-text-gray;
  }

  &.l-button-success {
    background-color: $color-success-1;
    border-color: $color-success-2;
    color: $color-success-6;
    &:hover {
      background-color: $color-success-2;
      border-color: $color-success-3
    }
    &:active {
      background-color: $color-success-3;
      border-color: $color-success-5;
    }
    &[disabled] {
      background-color: $color-success-1;
      border-color: $color-success-2;
      color: $color-success-3;
    }
  }

  &.l-button-warning {
    background-color: $color-warning-1;
    border-color: $color-warning-2;
    color: $color-warning-6;
    &:hover {
      background-color: $color-warning-2;
      border-color: $color-warning-3
    }
    &:active {
      background-color: $color-warning-3;
      border-color: $color-warning-5;
    }
    &[disabled] {
      background-color: $color-warning-1;
      border-color: $color-warning-2;
      color: $color-warning-3;
    }
  }
}

.l-button-outline {
  background-color: #fff;
  border: 1px solid $color-primary-6;
  color: $color-primary-6;
  &:hover {
    border-color: $color-primary-5;
    color: $color-primary-5;
  }
  &:active {
    border-color: $color-primary-7;
    color: $color-primary-7;
  }
  &[disabled] {
    border: 1px solid $color-primary-3;
    color: $color-primary-3;
  }

  &.l-button-success {
    border: 1px solid $color-success-6;
    color: $color-success-6;
    &:hover {
      border-color: $color-success-5;
      color: $color-success-5;
    }
    &:active {
      border-color: $color-success-7;
      color: $color-success-7;
    }
    &[disabled] {
      border: 1px solid $color-success-3;
      color: $color-success-3;
    }
  }

  &.l-button-warning {
    border: 1px solid $color-warning-6;
    color: $color-warning-6;
    &:hover {
      border-color: $color-warning-5;
      color: $color-warning-5;
    }
    &:active {
      border-color: $color-warning-7;
      color: $color-warning-7;
    }
    &[disabled] {
      border: 1px solid $color-warning-3;
      color: $color-warning-3;
    }
  }

  &.l-button-danger {
    border: 1px solid $color-danger-6;
    color: $color-danger-6;
    &:hover {
      border-color: $color-danger-5;
      color: $color-danger-5;
    }
    &:active {
      border-color: $color-danger-7;
      color: $color-danger-7;
    }
    &[disabled] {
      border: 1px solid $color-danger-3;
      color: $color-danger-3;
    }
  }
}

.l-button-text {
  background-color: #fff;
  color: $color-primary-6;
  &:hover {
    background-color: $color-fill;
  }
  &:active {
    background-color: $color-fill-dark;
  }
  &[disabled] {
    background-color: #fff;
    color: $color-primary-3;
  }

  &.l-button-success {
    color: $color-success-6;
    &:hover {
      background-color: $color-fill;
    }
    &:active {
      background-color: $color-fill-dark;
    }
    &[disabled] {
      background-color: #fff;
      color: $color-success-3;
    }
  }

  &.l-button-warning {
    color: $color-warning-6;
    &:hover {
      background-color: $color-fill;
    }
    &:active {
      background-color: $color-fill-dark;
    }
    &[disabled] {
      background-color: #fff;
      color: $color-warning-3;
    }
  }

  &.l-button-danger {
    color: $color-danger-6;
    &:hover {
      background-color: $color-fill;
    }
    &:active {
      background-color: $color-fill-dark;
    }
    &[disabled] {
      background-color: #fff;
      color: $color-danger-3;
    }
  }
}
</style>
