<template>
  <div>
    <div class="row">
      <div v-for="(item,index) in keys" :key="index">
        {{item}}
      </div>
    </div>
    <router-link to="/history">查看历史</router-link>
  </div>
</template>

<script>

  export default {
      name: 'index',
      components: {

      },
      data() {
          return{
            keys:[]
          }
      },
      created() {
        let old = window.localStorage.getItem("key");
        if(old){
          this.keys = old.split(",");
        }else {
          let a = [];
          for(let i=0;i<7;i++){
            a.push(Math.floor( Math.random()*10 ))
          }
          //
          window.localStorage.setItem("key",a.join(","));
          this.keys= window.localStorage.getItem("key").split(",");
        }
      }
  }
</script>

<style>
  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 100px 50px 100px 50px
  }
  .row div{
    width:30px;height:30px;border-radius:15px;border:solid rgb(100,100,100) 1px;;
  }
</style>
