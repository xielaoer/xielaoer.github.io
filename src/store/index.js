
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
        let items = Ticket.getLocals().filter(e=>e.key===key&&time===time);
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
const SSQCheck = (time,luckNum) =>{
    console.log(time,luckNum);
    throw new Error("未实现！");
};

/**
 *DLTCheck
 */
let DLTList100 = [];
const getDLTList100 = async ()=>{
    if(DLTList100.length>0){
        return DLTList100;
    }
    const {data:data} = await axios.get('https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=100&isVerify=1&pageNo=1');
    return data.value.list;
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
        return moment(time)._i === moment(moment(v.lotterySaleEndtime).format("YYYY-MM-DD"))._i;
    });
    if(list<0){
        throw new Error("获取DLTList100匹配异常！");
    }
    luckNum = luckNum.split(",").map(e=>{
        if(e<10) e = "0"+e;
        return e;
    });
    let resultNum = list[0].lotteryDrawResult.split(" ");
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
const QXCCheck = (time,luckNum) =>{
    console.log(time,luckNum);
    throw new Error("未实现！");
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

export const loadTickets = async ()=>{
    let tickets = Ticket.getLocals();
    for (const e of tickets) {
       if(e.result==='未知'&&moment(e.time)<moment(moment().format("YYYY-MM-DD"))){
           try {
               e.result = await ticketTypes.filter(v =>v.key===e.key)[0].checkFun(e.time,e.luckNum);
           }catch (e) {
               console.error(e);
           }
           if(e.result){
               Ticket.setLocal(e);
           }
       }
    }
    return tickets;
};
