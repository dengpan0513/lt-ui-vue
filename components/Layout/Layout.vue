<template>
  <section :class="classObject" class="l-layout">
    <slot />
  </section>
</template>

<script>
const classHasSider = 'l-layout-has-sider'

export default {
  name: 'LLayout',
  data () {
    return {
      classObject: {
        [classHasSider]: false
      }
    }
  },
  mounted () {
    this.checkHasSider()
  },
  methods: {
    checkHasSider () {
      this.$children.forEach(instance => {
        if (instance.$options.name === 'LSider') {
          this.classObject[classHasSider] = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.l-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.l-layout-has-sider {
    flex-direction: row;
  }
}
</style>
