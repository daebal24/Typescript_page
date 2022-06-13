import { fstat, readFile } from "fs";
import { BooleanLiteral, isIdentifier, updateStatement } from "typescript";
import { Load_Data } from "../util/load_Data";

export class LoginContext 
{
    id:string;
    pw:string;
    usertype:string;
    index:number;
    comcode:string;
    lastlogin:string;
    writeid:boolean;
    readid:boolean;
    sleep:boolean;

    constructor(request_id:string, request_password:string)
    {
        this.id = request_id;
        this.pw = request_password;
        this.usertype="";
        this.index=-2;
        this.comcode="";
        this.lastlogin = "";
        this.writeid=true;
        this.readid=true;
        this.sleep = false;
    }

    return_index_identify()
    {
        
        let loadjson = new Load_Data;//
        const d = loadjson.loadjson("people"); 
        
        for (let i = 0; i < d.admin.length; i++) 
        {
            if (d.admin[i]['id'] == this.id) 
            {
                if (d.admin[i]['pw'] == this.pw) 
                {
                    //비번일치
                    this.index=i;
                    this.usertype = "admin";
                    this.comcode = d.admin[i]['comcode'];
                    this.lastlogin = d.admin[i]['lastlogin'];

                }
                else
                {
                    //비번틀림
                    this.index=-1;
                }
                return;                    
            }
        }
        //일치하는 어드민 없음

        for (let i = 0; i < d.user.length; i++) 
        {
            if (d.user[i]['id'] == this.id) 
            {
                if (d.user[i]['pw'] == this.pw) 
                {
                    //비번일치
                    this.index=i;
                    this.usertype = "user";
                    this.comcode = d.user[i]['comcode'];
                    this.lastlogin = d.user[i]['lastlogin'];
                    this.writeid = d.user[i]['writeid'];
                    this.readid = d.user[i]['readid'];
                }
                else
                {
                    //비번틀림
                    this.index=-1;
                }
                return;
            }
        }
        //일치하는 유저 없음
        return;

    }


}
