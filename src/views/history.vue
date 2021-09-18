<template>
  <div >
    <div v-for="(item,index) in allData" :key="index">
     {{item.name}} || {{item.value}}
    </div>
  </div>
</template>

<script>
  import {loadAllData} from "../store"
  export default {
      name: 'history',
      components: {

      },
      data() {
          return{
            allData:[]
          }
      },
      created(){
        let data = loadAllData();
        for(let key in data){
          this.allData.push({name:key,value:data[key]});
        }
      },
  }
</script>
