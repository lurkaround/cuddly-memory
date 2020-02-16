<template>
  <div id="app">
    <Travel />
  </div>
</template>

<script>
import Travel from './components/Travel.vue'

export default {
  created(){
    this.$store.dispatch('loadAPI')
  },
  name: 'App',
  components: {
    Travel
  }
}
</script>

<style lang="scss">
#app {
  
}
</style>
