
/**
 * index.js
 */
import moment from "moment";

/**
 * Ticket
 */
class Ticket {
    constructor(num,week,key,ticket,randomFun){
        this.num = num;
        this.week = week;
        this.key = key + ":" +moment().format("YYYY-MM-DD");
        this.ticket = ticket;
        this.randomFun = randomFun;
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
        let data = window.localStorage.getItem(this.key);
        return data?data.split(","):null;
    }
    putLocal(data){
        window.localStorage.setItem(this.key,data.join(","));
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
 *all tickets
 */
const tickets = [
    new Ticket(0,"星期日","SSQ","SSQ",SSQRandom),
    new Ticket(1,"星期一","DLT","DLT",DLTRandom),
    new Ticket(2,"星期二","SSQ","SSQ",SSQRandom),
    new Ticket(3,"星期三","DLT","DLT",DLTRandom),
    new Ticket(4,"星期四","SSQ","SSQ",SSQRandom),
    new Ticket(5,"星期五","QXC","QXC",QXCRandom),
    new Ticket(6,"星期六","DLT","DLT",DLTRandom),
];

let num = new Date().getDay();

export const toDay = tickets.filter(v=>v.num===num)[0];

export const loadAllData = ()=>{
    let i = 0,oJson = {},sKey;
    // eslint-disable-next-line no-cond-assign
    for (; sKey = window.localStorage.key(i); i++) {
        if((sKey.indexOf("SSQ")!=-1||sKey.indexOf("DLT")!=-1||sKey.indexOf("QXC")!=-1))
        oJson[sKey] = window.localStorage.getItem(sKey);
    }
    return oJson;
}

