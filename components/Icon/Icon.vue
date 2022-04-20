<template>
  <svg v-if="name" :style="style" :class="classList" class="l-icon" aria-hidden="true" @click="onClick">
    <use :xlink:href="icon" />
  </svg>
</template>

<script>
import { createClass } from '@/utils/index.js'
const classPrefix = 'l-icon-'

export default {
  name: 'LIcon',
  props: {
    name: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: [Number, String]
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon () {
      const { name } = this
      return `#icon-${name}`
    },
    style () {
      const { color, size } = this
      const fontSize = typeof size === 'number' ? `${size}px` : size
      return {
        fill: color,
        fontSize
      }
    },
    classList () {
      const { spin } = this
      return [
        spin && createClass(classPrefix, 'spin')
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
@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.l-icon {
  width: 1em;
  height: 1em;
  vertical-align: -2px;
  fill: currentColor;
  overflow: hidden;

  &.l-icon-spin {
    animation: spin 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
</style>
