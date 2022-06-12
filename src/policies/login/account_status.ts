/*

휴면
logincontext 입력받고 휴면인지 아닌지 체크

*/

import { ILoginPolicyResult, Policy } from "../Policy";
import { LoginContext } from "../../context/login_context";
import { Load_Data } from "../../scripts/load_Data";

export class Accountstatus extends Policy
{

    public override apply(context: LoginContext): ILoginPolicyResult 
    {
        let status: number=0;
        let message: string="";

        //휴면 전환기준 : 30
        let sleep_standard = 30;
        let lastlogin:string = context.lastlogin;

        let today:string = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
        let timepast:number = (Date.parse(today)-Date.parse(lastlogin))/(1000*60*60*24);
        if(timepast >= sleep_standard)
        {
            status = 400;
            message = "휴면계정입니다";
        }        
        else
        {
            status = 200;
            message = "";

            let load_data = new Load_Data();
            let returnarray:Array<Array<object>>=[];
            returnarray = load_data.people_data_loading(today, context.usertype, context.index);

            let admin:Array<object>=returnarray[0];
            let user:Array<object>=returnarray[1];

            let people = 
            {
                "admin":admin,
                "user":user
            };
            const fs = require('fs');
            fs.writeFileSync('./data/data.json', JSON.stringify(people))

        }
        return {status, message};
    }
}