<template>
  <div class="hello">
   {{priceArray}}
   <h2>Cheapest: {{priceArray[0]}}</h2>
   <h3>{{cheapest}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Travel',
  data(){
    return{
      priceArray: [],
      cheapest: '',
    }
  },
  computed: {
    storeData(){
      return this.$store.state.apiresult;
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   console.log(this.storeData.train.price)
    //   for (let x in this.storeData){
    //     this.priceArray.push(Number(this.storeData[x].price.split(' ')[0]))
    //   }
    //   this.priceArray.sort()
    //
    //   for (let x in this.storeData){
    //     console.log(this.storeData[x])
    //     if (Number(this.storeData[x].price.split(' ')[0]==this.priceArray[0])){
    //       this.cheapest = x;
    //     }
    //   }
    // }, 2000)

  },
  watch:{
    storeData(){
      for (let x in this.storeData){
        this.priceArray.push(Number(this.storeData[x].price.split(' ')[0]))
      }
      this.priceArray.sort()

      for (let x in this.storeData){
        console.log(this.storeData[x])
        if (Number(this.storeData[x].price.split(' ')[0]==this.priceArray[0])){
          this.cheapest = x;
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .red {
    color: red;
  }
</style>
