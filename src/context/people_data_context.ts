//json 데이터 클래스 데이터로 넣어주기 - 아직 진행중

import { Load_Data } from "../scripts/load_Data";

export class People_data_context 
{
    //파라미터
    //데이터 반영함수
    admins:Array<Map<string,string>>;
    users:Array<Map<string,string>>;

    admincount:number;
    usercount:number;

    constructor(count:number, count2:number)
    {
        this.admins=[];
        this.users=[];
        this.admincount = count;
        this.usercount = count2;

        for(let i=0;i<count;i++)
        {
            let admin:Map<string,string>=new Map();
            this.admins.push(admin);
        }

        
        for(let i=0;i<count2;i++)
        {
            let user:Map<string,string>=new Map();
            user.set("id","");
            user.set("pw","");
            user.set("comcode","");
            user.set("usertype","");
            user.set("writeid","");
            user.set("readid","");
            user.set("lastlogin","");
            this.users.push(user);
        }
        
        //this.people.push();
    }


    load_to_context()
    {
        
        let loadjson = new Load_Data;
        const d = loadjson.loadjson('people');
        console.log(d);

        /*
        for(let i:number=0;i<this.admincount;i++)
        {
            this.admins[i].set("id",d.admin[i]['id']);
            this.admins[i].set("pw",d.admin[i]['pw']);
            this.admins[i].set("comcode",d.admin[i]['comcode']);
            this.admins[i].set("usertype",d.admin[i]['usertype']);
            this.admins[i].set("writeid",d.admin[i]['writeid']);
            this.admins[i].set("readid",d.admin[i]['readid']);
            this.admins[i].set("lastlogin",d.admin[i]['lastlogin']);

            
            this.admins[i].set()=d.admin[i]['id'];
            this.admins[i]["pw"]=d.admin[i]['pw'];
            this.admins[i]["comcode"]=d.admin[i]['comcode'];
            this.admins[i]["usertype"]=d.admin[i]['usertyped'];
            this.admins[i]["writeid"]=d.admin[i]['writeid'];
            this.admins[i]["readid"]=d.admin[i]['readid'];
            this.admins[i]["lastlogin"]=d.admin[i]['lastlogin'];
            this.admins[i]["sleep"]=d.admin[i]['sleep'];
            
        }
        */
        /*
        for(let i=0;i<this.usercount;i++)
        {
            this.users[i]["id"]=d.users[i]['id'];
            this.users[i]["pw"]=d.users[i]['pw'];
            this.users[i]["comcode"]=d.users[i]['comcode'];
            this.users[i]["usertype"]=d.users[i]['usertyped'];
            this.users[i]["writeid"]=d.users[i]['writeid'];
            this.users[i]["readid"]=d.users[i]['readid'];
            this.users[i]["lastlogin"]=d.users[i]['lastlogin'];
            this.users[i]["sleep"]=d.users[i]['sleep'];
        }
        */
        console.log("hello");
    }
}

/*
var d:Array<Map<string,string>>=[];

let m:Map<string,string>=new Map();
m.set("a","1");
m.set("b","2");

let m2:Map<string,string>=new Map();
m2.set("c","0");
m2.set("d","5");
d.push(m);d.push(m2);

console.log(d);
console.log(d[0].get('a'));

*/
let a = new People_data_context(2,4);
a.load_to_context();
