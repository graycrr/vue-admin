<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/reset.css";
  @import "./style/mixin.scss";
  @import "./style/style.scss";
</style>
