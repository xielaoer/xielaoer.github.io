
/**
 * index.js
 */
import moment from "moment";
import axios from "axios";

/**
 * Ticket
 */
class Ticket {
    constructor(num,week,key,ticket,randomFun,checkFun){
        this.num = num;
        this.week = week;
        this.key = key;
        this.ticket = ticket;
        this.randomFun = randomFun;
        this.checkFun = checkFun;
        this.time = moment().format("YYYY-MM-DD");
    }
    luckNumFun(){
        let luckNum = this.loadLocal();
        if(luckNum){
            return {
                finish:()=>{return true},
                exist:()=>{return luckNum},
            }
        }
        let randomFun = this.randomFun();
        return {
            next:randomFun.next,
            finish:()=>{
               let finish = randomFun.finish();
               if(finish){
                  this.putLocal(randomFun.exist());
               }
               return finish;
            },
            exist:randomFun.exist,
        }
    }
    loadLocal(){
        let local= Ticket.getLocal(this.key,this.time);
        return local?local.luckNum.split(","):null;
    }
    putLocal(data){
        Ticket.setLocal({key:this.key,time:this.time,luckNum:data.join(","),result:'未知'});
    }
    static getLocals(){
        let strTickets = window.localStorage.getItem("tickets");
        let tickets =  strTickets?JSON.parse(strTickets):[];
        /*********开始*********/
        if(tickets.length===0){
            // eslint-disable-next-line no-cond-assign
            for (let i = 0,sKey; sKey = window.localStorage.key(i); i++) {
                let _key = sKey.split(":");
                if(_key[0]==="SSQ"||_key[0]==="DLT"||_key[0]==="QXC"){
                    tickets.push({key:_key[0],time:_key[1],luckNum:window.localStorage.getItem(sKey),result:'未知'});
                    window.localStorage.removeItem(sKey);
                }
            }
            Ticket.setLocals(tickets);
        }
        /**********end***********/
        return tickets;
    }
    static setLocals(tickets){
        window.localStorage.setItem("tickets",JSON.stringify(tickets));
    }
    static setLocal(ticket){
        let tickets = Ticket.getLocals();
        for(let i =0;i<tickets.length;i++){
            if(tickets[i].key===ticket.key&&tickets[i].time===ticket.time){
                tickets[i] = ticket;
                break;
            }else if(i===tickets.length-1){
                tickets.push(ticket);
            }
        }
        Ticket.setLocals(tickets);
    }
    static getLocal(key,time){
        let items = Ticket.getLocals().filter(e=>e.key===key&&e.time===time);
        return items.length>0?items[0]:null;
    }
}

/**
 *SSQRandom
 */
const SSQRandom = ()=>{
    //blue
    let blue = new Array(6);
    const addOneBlue = (index)=>{
        let ranDom = () =>{ return Math.floor(Math.random()*33 )+1; };
        let now = ranDom();
        if(blue.find(v=>v===now)){
            return addOneBlue(index);
        }
        blue[index] = now;
    };
    //red
    let red = new Array(1);
    const addOneRead = (index)=>{
        red[index] = (Math.floor(Math.random()*16 )+1)
    };
    //exist
    const exist = ()=>{ return blue.concat(red) };

    let var1 = false;
    const finish = ()=>{return var1};
    //next
    const next = ()=>{
        let index= blue.findIndex(v=>!v);
        if(index!==-1){
            addOneBlue(index);
        }else if(!red[0]){
            addOneRead(0);
        }else {
            var1 = true;
        }
        return exist();
    };

    return {
        next:next,
        finish:finish,
        exist:exist,
    }

};

/**
 *DLTRandom
 */
const DLTRandom = ()=>{
    //blue
    let blue = new Array(5);
    const addOneBlue = (index)=>{
        let ranDom = () =>{ return Math.floor(Math.random()*35 )+1; };
        let now = ranDom();
        if(blue.find(v=>v===now)){
            return addOneBlue(index);
        }
        blue[index] = now;
    };
    //red
    let red = new Array(2);
    const addOneRead = (index)=>{
        let ranDom = () =>{ return Math.floor(Math.random()*12 )+1 };
        let now = ranDom();
        if(red.find(v=>v===now)){
            return addOneRead(index);
        }
        red[index] = now;
    };
    //exist
    const exist = ()=>{ return blue.concat(red) };

    let var1 = false;
    const finish = ()=>{return var1};
    //next
    const next = ()=>{
        let indexBlue= blue.findIndex(v=>!v);
        let indexRed = red.findIndex(v=>!v);
        if(indexBlue!==-1){
            addOneBlue(indexBlue);
        }else if(indexRed!==-1){
            addOneRead(indexRed);
        }else {
            var1 = true;
        }
        return exist();
    };

    return {
        next:next,
        finish:finish,
        exist:exist,
    }
};

/**
 *QXCRandom
 */
const QXCRandom = ()=>{
    //blue
    let blue = new Array(6);
    const addOneBlue = (index)=>{
        blue[index] = Math.floor(Math.random()*10 );
    };
    //red
    let red = new Array(1);
    const addOneRead = (index)=>{
        red[index] = Math.floor(Math.random()*15 )
    };
    //exist
    const exist = ()=>{ return blue.concat(red) };

    let var1 = false;
    const finish = ()=>{return var1};
    //next
    const next = ()=>{
        let index= blue.findIndex(v=>!v);
        if(index!==-1){
            addOneBlue(index);
        }else if(!red[0]){
            addOneRead(0);
        }else {
            var1 = true;
        }
        return exist();
    };

    return {
        next:next,
        finish:finish,
        exist:exist,
    }
};

/**
 *SSQCheck
 */
let SSQList100 = [];
const getSSQList100 = async ()=>{
    if(SSQList100.length>0){
        return SSQList100;
    }
    return SSQList100;
};
const SSQRules = [
    {blue:6,red:1,result:"一等"},
    {blue:6,red:0,result:"二等"},
    {blue:5,red:1,result:"三等"},
    {blue:5,red:0,result:"四等"},
    {blue:4,red:1,result:"四等"},
    {blue:4,red:0,result:"五等"},
    {blue:3,red:1,result:"五等"},
    {blue:0,red:1,result:"六等"},
    {blue:2,red:1,result:"六等"},
    {blue:1,red:1,result:"六等"},
];
const SSQCheck = async (time,luckNum) =>{
    let list = await getSSQList100();
    list = list.filter(v=>{
        return moment(time).isSame(moment(moment(v.date).format("YYYY-MM-DD")));
    });
    if(list<=0){
        return "未知";
    }
    luckNum = luckNum.split(",").map(e=>{
        if(e<10) e = "0"+e;
        return e;
    });
    let blue = luckNum.slice(0,6).concat(list[0].blue.split(","));
    let countBlue = Math.abs(new Set(blue).size-blue.length);
    let countRed = luckNum[6]===list[0].red?1:0;
    let rule = SSQRules.filter(v=>v.blue===countBlue&&v.red===countRed);
    return rule.length>0?rule[0].result:"未中";
};

/**
 *DLTCheck
 */
let DLTList100 = [];
const getDLTList100 = async ()=>{
    if(DLTList100.length>0){
        return [...DLTList100];
    }
    const {data:data} = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=100&isVerify=1&pageNo=1');
    DLTList100 = data.value.list;
    return DLTList100;
};
const DLTRules = [
    {blue:5,red:2,result:"一等"},
    {blue:5,red:1,result:"二等"},
    {blue:5,red:0,result:"三等"},
    {blue:4,red:2,result:"四等"},
    {blue:4,red:0,result:"五等"},
    {blue:3,red:2,result:"六等"},
    {blue:3,red:2,result:"六等"},
    {blue:4,red:0,result:"七等"},
    {blue:3,red:1,result:"八等"},
    {blue:2,red:2,result:"八等"},
    {blue:3,red:0,result:"九等"},
    {blue:2,red:1,result:"九等"},
    {blue:1,red:2,result:"九等"},
    {blue:0,red:2,result:"九等"},
];
const DLTCheck = async (time,luckNum) =>{
    let list = await getDLTList100();
    list = list.filter(v=>{
        return moment(time).isSame(moment(moment(v.lotterySaleEndtime).format("YYYY-MM-DD")));
    });
    if(list<=0){
       return "未知";
    }
    luckNum = luckNum.split(",").map(e=>{
        if(e<10) e = "0"+e;
        return e;
    });
    let resultNum = list[0]['lotteryDrawResult'].split(" ");
    let blue = luckNum.slice(0,5).concat(resultNum.slice(0,5));
    let red = luckNum.slice(5,7).concat(resultNum.slice(5,7));
    let countBlue = Math.abs(new Set(blue).size-blue.length);
    let countRed =  Math.abs(new Set(red).size-red.length);
    let rule = DLTRules.filter(v=>v.blue===countBlue&&v.red===countRed);
    return rule.length>0?rule[0].result:"未中";
};

/**
 *QXCCheck
 */
let QXCList100 = [];
const getQXCList100 = async ()=>{
    if(QXCList100.length>0){
        return [...QXCList100];
    }
    const {data:data} = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=04&provinceId=0&pageSize=100&isVerify=1&pageNo=1');
    QXCList100 = data.value.list ;
    return QXCList100;
};
const QXCRules = [
    {blue:6,red:1,result:"一等"},
    {blue:6,red:0,result:"二等"},
    {blue:5,red:1,result:"三等"},
    {blue:5,red:0,result:"四等"},
    {blue:4,red:1,result:"四等"},
    {blue:4,red:0,result:"五等"},
    {blue:3,red:1,result:"五等"},
    {blue:3,red:0,result:"六等"},
    {blue:0,red:1,result:"六等"},
    {blue:2,red:1,result:"六等"},
    {blue:2,red:1,result:"六等"},
    {blue:1,red:1,result:"六等"},
];
const QXCCheck = async (time,luckNum) =>{
    let list = await getQXCList100();
    list = list.filter(v=>{
        return moment(time).isSame(moment(moment(v.lotterySaleEndtime).format("YYYY-MM-DD")));
    });
    if(list<=0){
        return "未知";
    }
    let resultNum = list[0]['lotteryDrawResult'].split(" ");
    luckNum = luckNum.split(",");
    let countBlue = 0;
    let countRed = resultNum[6]===luckNum[6]?1:0;
    for(let i=0;i<6;i++){
        if(resultNum[i]===luckNum[i]){
            countBlue++;
        }
    }
    let rule = QXCRules.filter(v=>v.blue===countBlue&&v.red===countRed);
    return rule.length>0?rule[0].result:"未中";
};

/**
 *all ticketTypes
 */
const ticketTypes = [
    new Ticket(0,"星期日","SSQ","SSQ",SSQRandom,SSQCheck),
    new Ticket(1,"星期一","DLT","DLT",DLTRandom,DLTCheck),
    new Ticket(2,"星期二","SSQ","SSQ",SSQRandom,SSQCheck),
    new Ticket(3,"星期三","DLT","DLT",DLTRandom,DLTCheck),
    new Ticket(4,"星期四","SSQ","SSQ",SSQRandom,SSQCheck),
    new Ticket(5,"星期五","QXC","QXC",QXCRandom,QXCCheck),
    new Ticket(6,"星期六","DLT","DLT",DLTRandom,DLTCheck),
];

let num = new Date().getDay();

export const toDay = ticketTypes.filter(v=>v.num===num)[0];

import Vue from 'vue';
import { Notify } from 'vant';
// 全局注册
Vue.use(Notify);

export const loadTickets = async ()=>{
    let tickets = Ticket.getLocals().sort((a, b) => moment(a)>moment(b)?1:-1);
    for (const e of tickets) {
       if(e.result==='未知'&&moment(e.time).isBefore(moment(moment().format("YYYY-MM-DD")))){
           try {
               e.result = await ticketTypes.filter(v =>v.key===e.key)[0].checkFun(e.time,e.luckNum);
           }catch (ex) {
               e.result = '未知';
               alert(JSON.stringify(ex));
               //Notify({ type: 'danger', message: JSON.stringify(ex),duration: 0, });
               console.error(ex);
           }
           if(e.result!=='未知'){
               Ticket.setLocal(e);
           }
       }
    }
    return tickets;
};

/**
 *initData
 */
// eslint-disable-next-line no-unused-vars
const initData = [
    {
        "key": "QXC",
        "time": "2021-09-17",
        "luckNum": "2,2,3,4,5,2,5",
        "result": "未知"
    },
  {
    "key": "SSQ",
    "time": "2021-09-19",
    "luckNum": "26,19,10,20,18,2,5",
    "result": "未知"
  },
  {
    "key": "DLT",
    "time": "2021-09-20",
    "luckNum": "14,24,12,9,32,2,12",
    "result": "未知"
  },
 {
    "key": "DLT",
    "time": "2021-09-22",
    "luckNum": "11,14,29,31,32,11,12",
    "result": "未知"
 },
  {
    "key": "SSQ",
    "time": "2021-09-23",
    "luckNum": "3,13,5,1,7,9,9",
    "result": "未知"
  },
    {
        "key": "SSQ",
        "time": "2021-09-24",
        "luckNum": "3,13,5,1,7,9,9",
        "result": "未知"
    }
];

//qu掉
//window.localStorage.setItem("tickets",initData);
