<template>
  <footer class="l-layout-footer">
    <slot />
  </footer>
</template>

<script>
export default {
  name: 'LFooter'
}
</script>

<style lang="scss" scoped>
@use "../styles/variable.scss" as *;

.l-layout-footer {
  flex-shrink: 0;
  padding: 16px 50px;
  font-size: $font-size-small;
}
</style>
