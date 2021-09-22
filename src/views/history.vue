<template>
  <div style="padding: 5px">
    <div v-for="(item,index) in tickets" :key="index" >
        {{tickets.length-index}}:{{item.key}}》{{item.time}}》{{item.luckNum}}》
        <label v-if="item.result==='未知'||item.result==='未中'">{{item.result}}</label>
        <label v-else style="color: red">{{item.result}}</label>
    </div>
  </div>
</template>

<script>
  import {loadTickets} from "../store"
  export default {
      name: 'history',
      components: {

      },
      data() {
          return{
              tickets:[]
          }
      },
      async created() {
          this.tickets = await loadTickets();
      },
  }
</script>
