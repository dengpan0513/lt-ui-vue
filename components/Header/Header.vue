<template>
  <header class="l-layout-header">
    <slot />
  </header>
</template>

<script>
export default {
  name: 'LHeader'
}
</script>

<style lang="scss" scoped>
.l-layout-header {
  flex-shrink: 0;
  height: 64px;
}
</style>
