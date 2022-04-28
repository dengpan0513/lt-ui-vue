<template>
  <button
    :class="classList"
    :type="htmlType"
    class="l-button"
  >
    <l-icon v-if="loading" name="loading" spin class="l-button-icon" />
    <l-icon v-else :name="icon" class="l-button-icon" />
    <span>
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
    }
  },
  computed: {
    classList () {
      const { type, size, icon, iconPosition, loading } = this
      return [
        type && createClass(classPrefix, type),
        size && createClass(classPrefix, size),
        (icon || loading) && iconPosition && createClass(classPrefix, 'icon-', iconPosition),
        loading && createClass(classPrefix, 'loading')
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
}

.l-button-medium {
  height: 32px;
  padding: 5px 16px;
}
.l-button-large {
  height: 36px;
  padding: 7px 20px;
}
.l-button-small {
  height: 28px;
  padding: 3px 16px;
}
.l-button-mini {
  height: 24px;
  padding: 2px 12px;
  font-size: $font-size-small;
  line-height: 20px;
}

.l-button-icon-left {
  > .l-button-icon {
    margin-right: $icon-margin;
  }
}
.l-button-icon-right {
  > .l-button-icon {
    order: 1;
    margin-left: $icon-margin;
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
}

.l-button-primary {
  background-color: $color-primary;
  color: #fff;

  &:hover {
    background-color: $color-primary-hover;
  }
  &:active {
    background-color: $color-primary-active;
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
}

.l-button-outline {
  background-color: #fff;
  border: 1px solid $color-primary;
  color: $color-primary;

  &:hover {
    border-color: $color-primary-hover;
    color: $color-primary-hover;
  }
  &:active {
    border-color: $color-primary-active;
    color: $color-primary-active;
  }
}

.l-button-text {
  background-color: #fff;
  color: $color-primary;

  &:hover {
    background-color: $color-fill;
  }
  &:active {
    background-color: $color-fill-dark;
  }
}
</style>
