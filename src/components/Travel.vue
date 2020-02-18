<template>
  <!-- <div class="hello">
    <h1>From {{fromPlace}} to {{toPlace}}</h1>
  <h2>Cheapest Option: ${{priceArray[0]}} -- {{cheapest}} -- {{duration}}</h2>
   <h1>Date & time of departure :{{dateOfDeparture}} {{timeOfDeparture}}</h1>
   <h1>Date & time of arrival :{{dateOfArrival}} {{timeOfArrival}}</h1>

   
  </div> -->


    <div class="container" id="app">

      <h3 class="text-center">Cheapest Option</h3>
              <div class="columns medium-4" >
      <div class="card">
        <div class="card-section">
          <p> Transport Type </p>
        </div>
        <div class="card-divider">
          {{cheapest}} 
        </div>
      </div>

      <div class="card">
        <div class="card-section">
          <p> Price </p>
        </div>
        <div class="card-divider">
        ${{priceArray[0]}} 
        </div>
      </div>


    </div>
         <div class="columns medium-4" >
      <div class="card">
        <div class="card-section">
          <p> Departure Station </p>
        </div>
        <div class="card-divider">
          {{fromPlace}}
        </div>
      </div>
    </div>

       <div class="columns medium-4" >
      <div class="card">
        <div class="card-section">
          <p> Arrival Station </p>
        </div>
        <div class="card-divider">
          {{toPlace}}
        </div>
      </div>
    </div>

        <div class="columns medium-4" >
      <div class="card">
        <div class="card-section">
          <p> Date & time of departure </p>
        </div>
        <div class="card-divider">
          {{dateOfDeparture}} {{timeOfDeparture}} 
        </div>
      </div>
    </div>

          <div class="columns medium-4" >
      <div class="card">
        <div class="card-section">
          <p> Date & time of Arrival </p>
        </div>
        <div class="card-divider">
          {{dateOfArrival}} {{timeOfArrival}} 
        </div>
      </div>
    </div>

    <h3>Cheapest Options by Transport Type</h3>
   <ul>
     <li v-for="(item,i) in methodPriceArray" :key="i">{{item}}</li>
   </ul>

    <!-- <ul>
     <li v-for="(item,i) in superArray" :key="i">{{item}}</li>
   </ul>

   <ul>
     <li v-for="(item,i) in helper" :key="i">{{item}}</li>
   </ul> -->


    </div>

</template>

<script>
export default {
  name: 'Travel',
  data(){
    return{
      transportationmethods: [
      { 
        car: { 
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
          },
        },
      {
        bus:{
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
          },
        },
        {
          train:{
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
          },
        },
        {
          plane:{
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
          },
        },
        ],
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
      // console.log(this.storeData)
      for (let y in this.storeData){
        // this.methodPriceArray.push(y + '---' + this.storeData[y].price)
        this.methodPriceArray.push(`${y}: ${this.storeData[y].price}`)
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
      // console.log(this.allData)
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
