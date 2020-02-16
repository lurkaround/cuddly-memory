<template>
  <div class="hello">
   {{priceArray}}
  </div>
</template>

<script>
export default {
  name: 'Travel',
  props: {
    msg: String
  },
  computed: {
    storeData(){
      return this.$store.state.apiresult;
    }
  },
  mounted(){
    console.log(2)
      //  let travelPrices = [];
       Object.keys(this.storeData).forEach(function (item) {
        console.log(item); // key
        console.log(this.storeData[item]); // value
        Object.keys(this.storeData[item]).forEach(function (item2){
          console.log(item2.price)
        })
       })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .red {
    color: red;
  }
</style>
