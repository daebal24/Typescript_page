/*

회사 유효기간
logincontext 입력받고 회사 유효기간 체크

*/

import { ILoginPolicyResult, Policy } from "../Policy";
import { LoginContext } from "../../context/login_context";
import { Load_Data } from "../../util/load_Data";

export class Contract_period extends Policy
{
    
    public override apply(context: LoginContext): ILoginPolicyResult 
    {
        let status: number=0;
        let message: string="";

        let loadjson = new Load_Data;
        const new_companydata = loadjson.loadjson("company"); //'../data/company.json'
        let user_companycode:string = context.comcode;

        let today = (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
        let end= (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString();
        switch(user_companycode)
        {
            case "70000":
                end = new_companydata.com7["enddate"];
                break;
            case "80000":
                end = new_companydata.com8["enddate"];
                break;
            case "90000":
                end = new_companydata.com9["enddate"];
                break;
            default:
                break;
        }
        let timepast = (Date.parse(end)-Date.parse(today)); // / (1000*60*60*24);
        if(timepast > 0)
        {
            status = 200;
            message = "";
        }
        else
        {
            status = 400;
            message = "계약기간이 끝난 회사입니다.";
        }

        
        return {status, message};
    }
}

