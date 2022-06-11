<template>
  <main class="l-layout-content">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'LContent'
}
</script>

<style lang="scss" scoped>
.l-layout-content {
  flex-grow: 1;
}
</style>
