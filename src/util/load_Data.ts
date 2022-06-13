export class Load_Data
{
    loadjson(input:string)
    {
        let src:string = "";

        if(input == "people")
        src='./data/data.json';
        if(input == "company")
        src='./data/company.json';
        
        const fs = require('fs');
        let d:string = fs.readFileSync(src, 'utf8') ;
        let js:Object = {}; js = JSON.parse(d);
        let jdata = JSON.stringify(js);
        const data = JSON.parse(jdata);
        
        return data;

    }
    people_data_loading(newlogintime:string, usertype:string, index:number)
    {
        
        let loadjson = new Load_Data;
        const data = loadjson.loadjson("people");//'../data/data.json'

        let admin:Array<object>=[];
        let user:Array<object>=[];
        
        for (let i:number = 0; i < data.admin.length; i++) 
        {
            let eachman = new Object;

            let id:string = data.admin[i]['id'];
            let pw:string = data.admin[i]['pw'];
            let comcode:string = data.admin[i]['comcode'];
            let usertype:string = data.admin[i]['usertype'];
            let writeid:boolean = data.admin[i]['writeid'];
            let readid:boolean = data.admin[i]['readid'];            
            let sleep:boolean=data.admin[i]['sleep'];

            let inputlastlogin:string;
            if(usertype=="admin" && i==index)
            {
                inputlastlogin=newlogintime;
            }
            else
            {
                inputlastlogin=data.admin[i]['lastlogin'];
            }
            let lastlogin:string = inputlastlogin;

            eachman = this.user_currentDataList(id, pw, comcode, usertype, writeid, readid, lastlogin, sleep);
            admin.push(eachman);
        }

        for (let i = 0; i < data.user.length; i++) 
        {
            let eachman = new Object;

            let id:string = data.user[i]['id'];
            let pw:string = data.user[i]['pw'];
            let comcode:string = data.user[i]['comcode'];
            let usertype:string = data.user[i]['usertype'];
            let writeid:boolean = data.user[i]['writeid'];
            let readid:boolean = data.user[i]['readid'];            
            let sleep:boolean=data.user[i]['sleep'];

            let inputlastlogin:string;
            if(usertype=="user" && i==index)
            {
                inputlastlogin=newlogintime;
            }
            else
            {
                inputlastlogin=data.user[i]['lastlogin'];
            }
            let lastlogin:string = inputlastlogin;

            eachman = this.user_currentDataList(id, pw, comcode, usertype, writeid, readid, lastlogin, sleep);
            user.push(eachman);
        }
        let returnarray:Array<Array<object>>=[];
        returnarray.push(admin, user);
        return returnarray;

    }

    user_currentDataList(id:string, pw:string, comcode:string, usertype:string, writeid:boolean, readid:boolean, lastlogin:string, sleep:boolean)
    {
        let eachman = {
            "id" : id,
            "pw" : pw,
            "comcode" : comcode,
            "usertype" : usertype,
            "writeid" : writeid,                     
            "readid" : readid,
            "lastlogin" : lastlogin,
            "sleep" : sleep
        };
        return eachman;
    }
}