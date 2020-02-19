<template>
  <!-- <div class="hello">
    <h1>Find your way from {{cheapestDeparture}} to {{cheapestArrival}}!</h1>
    <h3>Cheapest option: {{cheapest}}</h3>

   <h3>All cheapest options:</h3>

     <div class="methods" v-for="(item,i) in methodPriceArray" :key="i">
        <span class="bold">Method of transportation: </span>{{item.split(',')[0]}}
        <span class="bold">Price: </span>{{item.split(',')[1]}}
        <span class="bold">Departure:</span>{{item.split(',')[2]}}
        <span class="bold">Arrival: </span>{{item.split(',')[3]}}
        <span class="bold">Duration: </span>{{item.split(',')[4]}}
     </div>


  </div> -->

  <div class="container" id="app">

  <h3 class="text-center">Cheapest Option</h3>
  <div class="columns medium-4" >
    <div class="card">
      <div class="card-section">
        <p> Transport Type </p>
      </div>
      <div class="card-divider">
        {{cheapest.split(',')[0]}}
      </div>
    </div>
  </div>

<div class="columns medium-4" >
  <div class="card">
    <div class="card-section">
      <p> Price </p>
    </div>
    <div class="card-divider">
    {{cheapest.split(',')[1]}}
    </div>
  </div>
</div>

  <div class="columns medium-4" >
    <div class="card">
      <div class="card-section">
        <p> Departure Station </p>
      </div>
      <div class="card-divider">
        {{cheapestDeparture}}
      </div>
    </div>
  </div>

  <div class="columns medium-4" >
    <div class="card">
      <div class="card-section">
        <p> Arrival Station </p>
      </div>
      <div class="card-divider">
        {{cheapestArrival}}
      </div>
    </div>
  </div>

    <div class="columns medium-4" >
  <div class="card">
    <div class="card-section">
      <p> Date & time of departure </p>
    </div>
    <div class="card-divider">
      {{(this.methodPriceArray.filter(v=>v.split(',')[0]==cheapest.split(',')[0])[0]).split(',')[5]}}
    </div>
  </div>
</div>

<div class="columns medium-4" >
  <div class="card">
    <div class="card-section">
      <p> Date & time of Arrival </p>
    </div>
    <div class="card-divider">
      {{(this.methodPriceArray.filter(v=>v.split(',')[0]==cheapest.split(',')[0])[0]).split(',')[6]}}
    </div>
  </div>
</div>

<h3>Cheapest Options by Transport Type</h3>
<ul>
 <li v-for="(item,i) in methodPriceArray" :key="i">{{item}}</li>
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
    }
  },
  computed: {
    cheapestData(){
      //this contains the cheapest travel modes
      return this.$store.state.apiresult;
    },
    allData(){
      //this contains all the big messy stuff
      return this.$store.state.apiAll;
    },
    cheapestDeparture(){
      for (let x of this.methodPriceArray){
        console.log(this.methodPriceArray)
        if (x.split(',')[0]==this.cheapest.split(',')[0]) {
          return x.split(',')[2]
        }
      }
      return ''
    },
    cheapestArrival(){
      for (let x of this.methodPriceArray){
        console.log(this.methodPriceArray)
        if (x.split(',')[0]==this.cheapest.split(',')[0]) {
          return x.split(',')[3]
        }
      }
      return ''
    }
  },
  mounted(){

  },
  watch:{
    cheapestData(){
      for (let y in this.cheapestData){
        this.methodPriceArray.push(`${y},${this.cheapestData[y].price}`)
        //['train,13 $', 'bus, 35 $']
      }
      console.log(this.methodPriceArray)


      for (let x in this.cheapestData){
        this.priceArray.push(Number(this.cheapestData[x].price.split(' ')[0]))
      }
      this.priceArray.sort() // get the cheapest method sorted by price
      console.log(this.priceArray)

      //get the travel mode + price in a comma separated string
      for (let x in this.cheapestData){
        if (Number(this.cheapestData[x].price.split(' ')[0]==this.priceArray[0])){
          this.cheapest = x + ',' +this.cheapestData[x].price;
          //"car,1.11 $"
        }
      }
    },
    allData(){
      console.log(this.allData)
      //loop through all cheapest methods
      for (var i = 0; i < this.methodPriceArray.length; i++) {
        let travelmethod = this.methodPriceArray[i].split(',')[0]
        let price = this.methodPriceArray[i].split(',')[1]

        //find duration, dep, arr in the result array
        for (let k=0; k< this.allData.result.length;k++){
          if (this.allData.result[k].transport===travelmethod&&this.allData.result[k].price===price) {
            this.methodPriceArray[i] += `,${this.allData.result[k].segments[0].departure}, ${this.allData.result[k].segments[0].arrival}, ${this.allData.result[k].duration}, ${this.allData.result[k].segments[0].fromTimeISO8601},${this.allData.result[k].segments[0].toTimeISO8601}`;
            break;
          }
        }
      }
      console.log(this.methodPriceArray)
      //car,31.71 $,Milan, Rome, 6h 30min, 2020-02-22T08:00:00+01:00,2020-02-22T14:30:00+01:00"
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
  .bold{
    font-weight: bold;
  }
  .methods{
    border: 1px solid grey;
    margin-bottom: 20px;

    span{
      display: block;
    }
  }
</style>
