<template>
  <div id="app">
    <keep-alive :include="includeAlives">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      includeAlives: []
    }
  },
  watch: {
    $route: {
      handler (cur) {
        this.aliveHandle()
      },
      immediate: true
    }
  },
  methods: {
    aliveHandle () {
      if (this.$route.meta.keepAlive) {
        for (const matchRoute of this.$route.matched) {
          const componentName = matchRoute.components.default.name
          if (matchRoute.meta.keepAlive) {
            // 缓存
            if (this.includeAlives.indexOf(componentName) === -1) {
              this.includeAlives.push(componentName)
            }
          } else {
            // 清除缓存
            const index = this.includeAlives.indexOf(componentName)
            if (index > -1) {
              this.includeAlives.splice(index, 1)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/style/common.scss";
</style>
