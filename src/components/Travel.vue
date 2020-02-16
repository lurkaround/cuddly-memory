<template>
  <div class="hello">
    <h1>From {{fromPlace}} to {{toPlace}}</h1>
  <h2>Cheapest: ${{priceArray[0]}} -- {{cheapest}} -- {{duration}}</h2>
   <h1>Date & time of dep.:{{dateOfDeparture}} {{timeOfDeparture}}</h1>
   <h1>Date & time of arr.:{{dateOfArrival}} {{timeOfArrival}}</h1>

   <h3>All cheapest options:</h3>
   <ul>
     <li v-for="(item,i) in methodPriceArray">{{item}}</li>
   </ul>

   <h4>Durations and places</h4>
   <ul>
     <li v-for="(item2,i) in superArray">{{item2}}</li>
   </ul>


  </div>
</template>

<script>
export default {
  name: 'Travel',
  data(){
    return{
      priceArray: [],
      methodPriceArray: [],
      cheapest: '',
      dateOfDeparture: '',
      timeOfDeparture: '',
      dateOfArrival: '',
      timeOfArrival: '',
      fromPlace: '',
      toPlace: '',
      duration: '',
      superArray: [],
      helper: [],
    }
  },
  computed: {
    storeData(){
      return this.$store.state.apiresult;
    },
    allData(){
      return this.$store.state.apiAll;
    }
  },
  mounted(){

  },
  watch:{
    storeData(){
      for (let y in this.storeData){
        // this.methodPriceArray.push(y + '---' + this.storeData[y].price)
        this.methodPriceArray.push(`${y}---${this.storeData[y].price}`)
      }


      for (let x in this.storeData){
        this.priceArray.push(Number(this.storeData[x].price.split(' ')[0]))
      }
      this.priceArray.sort()

      for (let x in this.storeData){

        if (Number(this.storeData[x].price.split(' ')[0]==this.priceArray[0])){
          this.cheapest = x;
        }
      }
    },
    allData(){
      console.log(this.allData)
      this.dateOfDeparture = this.allData.result[0].segments[0].fromTimeISO8601.toString().split('+')[0].split('T')[0]
      this.timeOfDeparture = this.allData.result[0].segments[0].fromTimeISO8601.toString().split('+')[0].split('T')[1]
      this.dateOfArrival = this.allData.result[0].segments[0].toTimeISO8601.toString().split('+')[0].split('T')[0]
      this.timeOfArrival = this.allData.result[0].segments[0].toTimeISO8601.toString().split('+')[0].split('T')[1]

      this.fromPlace = this.allData.result[0].segments[0].departure
      this.toPlace = this.allData.result[0].segments[0].arrival

      for(let k of this.allData.result){
        if (!this.helper.includes(k.transport)&&k.price!=null) {
          this.helper.push(k.transport)
          this.superArray.push(`${k.transport} -- ${k.duration} -- dep: ${k.segments[0].departure} -- arr: ${k.segments[0].arrival}`)
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
  h1{
    font-size: 25px;
  }
</style>
