<template>
  <div class="l-button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LButtonGroup',
  mounted () {
    for (const element of this.$el.children) {
      const tagName = element.tagName.toLowerCase()
      const isCorrectClass = element.classList.contains('l-button')
      if (tagName !== 'button' && !isCorrectClass) {
        console.warn(`LButtonGroup 组件的直接子组件应该是 LButton，但当前是 ${tagName}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;
$border-radius: 2px;
@mixin border-color ($bdc) {
  border-left-color: $bdc;
}
@mixin set-bdc($color-secondary, $color-success, $color-warning, $color-danger) {
  &:not(:first-child) {
    @include border-color($color-secondary);
    &.l-button-success {
      @include border-color($color-success);
    }
    &.l-button-warning {
      @include border-color($color-warning);
    }
    &.l-button-danger {
      @include border-color($color-danger);
    }
  }
}

.l-button-group {
  display: inline-flex;
  vertical-align: middle;

  .l-button {
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:hover, &:active, &:focus-visible {
      z-index: 1;
    }
    &:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .l-button-secondary:not(:active, :focus-visible) {
    @include set-bdc($color-fill-dark, $color-success-2, $color-warning-2, $color-danger-2);
  }
  .l-button-primary:not(:active, :focus-visible) {
    @include set-bdc($color-primary-5, $color-success-5, $color-warning-5, $color-danger-5);
  }
}
</style>
