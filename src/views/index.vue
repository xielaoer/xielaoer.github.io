<template>
  <div class="container">
    <div class="header">
      <van-tag plain type="primary" size="large">  {{toDay.week}}</van-tag>
      &nbsp;
      <van-tag plain type="primary" size="large">  {{toDay.ticket}}</van-tag>
    </div>
    <div class="row">
      <div class="col" v-for="(item,index) in luckNum" :key="index">
          <!--SSQ&&QXC-->
          <div v-if="item&&(toDay.key.indexOf('SSQ')!==-1||toDay.key.indexOf('QXC')!==-1)&&index<6" :class="finish?'blue':'fade-in blue'">
            {{item}}
          </div>
          <div v-if="item&&(toDay.key.indexOf('SSQ')!==-1||toDay.key.indexOf('QXC')!==-1)&&index>=6" :class="finish?'red':'fade-in red'">
            {{item}}
          </div>
         <!--DLT-->
          <div v-if="item&&toDay.key.indexOf('DLT')!==-1&&index<5" :class="finish?'blue':'fade-in blue'">
            {{item}}
          </div>
          <div v-if="item&&toDay.key.indexOf('DLT')!==-1&&index>=5" :class="finish?'red':'fade-in red'">
            {{item}}
          </div>
      </div>
    </div>
    <div class="footer">
      <van-button round  size="small" type="primary" v-if="openBtn" @click="openLuck()">开启今日</van-button>
      &nbsp;
      <van-button round  size="small" to="/history" type="info">查看历史</van-button>
    </div>
  </div>
</template>

<script>

  import {toDay} from "../store"

  export default {
      name: 'index',
      components: {
      },
      data() {
          return{
            toDay:toDay,
            luckNum:[],
            finish:false,
            openBtn:false,
            luckNumFun:{}
          }
      },
      mounted() {
        this.luckNumFun = toDay.luckNumFun();
        this.finish = this.luckNumFun.finish();
        this.openBtn = !this.finish;
        this.luckNum = this.luckNumFun.exist();
      },
    methods:{
      openLuck(){
        this.openBtn = false;
          const doOpen= ()=> {
            setTimeout(()=>{
              this.luckNum = this.luckNumFun.next();
              if(!this.luckNumFun.finish()){
                doOpen()
              }
            },300)
         };
        doOpen();
       }
    }
  }
</script>

<style>
  .container{
    margin: 100px 50px 100px 50px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .col{
    width:30px;height:30px;border-radius:15px;border:solid #dcdee0  1px;
    background: #dcdee026;
    text-align: center;
    line-height: 29px;
  }
  @keyframes fade-in {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 1;}/*结束状态 透明度为1*/
  }
  @-webkit-keyframes fade-in {/*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 1;}
  }
  .fade-in {
    animation: fade-in;/*动画名称*/
    animation-duration: 1.5s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
  }
  .blue{
    color: blue;
  }
  .red{
    color: red;
  }
  .header , .footer{
    text-align: center;
    margin: 20px 0;
  }

</style>
