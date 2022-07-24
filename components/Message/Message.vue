<template>
  <transition name="l-message-slide" @after-leave="handleDeleteMessage">
    <div v-show="visible" :class="classesWrapper" :style="styleWrapper" class="l-message-wrapper">
      <div :class="classesMessage" class="l-message">
        <l-icon :name="iconName" :spin="spin" class="l-message-icon" />
        <span v-if="dangerouslyUseHTML" v-html="content" class="l-message-content" />
        <span v-else class="l-message-content">{{ content }}</span>
        <span v-if="closeable" class="l-message-close" @click="close">
          <l-icon name="close" class="l-message-icon-close" />
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import LIcon from '../Icon/Icon.vue'
import { oneOf, createClass } from '@/utils/index.js'
const classPrefix = 'l-message-'

export default {
  name: 'LMessage',
  components: { LIcon },
  props: {
    content: {
      type: String
    },
    dangerouslyUseHTML: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3
    },
    type: {
      type: String,
      default: 'normal',
      validator (value) {
        const typeList = ['normal', 'info', 'success', 'warning', 'error', 'loading']
        return oneOf(value, typeList)
      }
    },
    top: {
      type: Number,
      default: 40
    },
    icon: {
      type: String
    },
    closeable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      timeoutId: 0,
      visible: false
    }
  },
  computed: {
    classesWrapper () {
      const { type } = this
      return [
        createClass(classPrefix, 'wrapper-', type)
      ]
    },
    styleWrapper () {
      const { top } = this
      return {
        top: `${top}px`
      }
    },
    classesMessage () {
      const { type } = this
      return [
        createClass(classPrefix, type)
      ]
    },
    iconName () {
      const { icon, type } = this
      const iconTypeMap = {
        info: 'info-fill',
        success: 'check-circle-fill',
        warning: 'warning-fill',
        error: 'close-circle-fill',
        loading: 'loading'
      }
      return icon || iconTypeMap[type]
    },
    spin () {
      const { type } = this
      return type === 'loading'
    }
  },
  mounted () {
    this.toggleVisible(true)
    this.handleAutoClose()
  },
  methods: {
    handleAutoClose () {
      const { duration } = this
      if (duration > 0) {
        this.timeoutId = setTimeout(() => {
          this.close()
        }, duration * 1000)
      }
    },
    close () {
      this.clearTimeoutId()
      this.executeCallback()
      this.$emit('close', this)
      this.toggleVisible(false)
    },
    toggleVisible (visible) {
      this.visible = visible
    },
    clearTimeoutId () {
      const { timeoutId } = this
      timeoutId && clearTimeout(timeoutId)
    },
    executeCallback () {
      const { onClose } = this
      if (typeof onClose === 'function') {
        this.onClose()
      }
    },
    handleDeleteMessage () {
      this.$el.remove()
      this.$destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;

.l-message-slide-enter, .l-message-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.l-message-slide-enter-active {
  transition: all .3s;
}
.l-message-slide-leave-active {
  transition: all .2s;
}
.l-message-wrapper {
  position: fixed;
  z-index: $z-index-message;
  width: 100%;
  text-align: center;
  pointer-events: none;
  transition: all .3s;
}
.l-message {
  @include flex-center-vertical(inline-flex);
  padding: 10px 16px;
  border-radius: $border-radius-small;
  box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
  background-color: #fff;
  pointer-events: auto;
  .l-message-icon {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 20px;
  }
  .l-message-content {
    color: $color-text-dark;
    font-size: $font-size;
    font-weight: 400;
    line-height: 1;
  }
  .l-message-close {
    flex-shrink: 0;
    position: relative;
    margin-left: 16px;
    font-size: 0;
    cursor: pointer;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    &:hover::before {
      background-color: $color-fill;
    }
    .l-message-icon-close {
      position: relative;
      font-size: 16px;
      color: $color-text-dark;
    }
  }
}
.l-message-info > .l-message-icon {
  color: $color-primary-6;
}
.l-message-success > .l-message-icon {
  color: $color-success-6;
}
.l-message-warning > .l-message-icon {
  color: $color-warning-6;
}
.l-message-error > .l-message-icon {
  color: $color-danger-6;
}
.l-message-loading > .l-message-icon {
  color: $color-primary-6;
}
</style>
