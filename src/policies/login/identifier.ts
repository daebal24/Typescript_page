/*

아이디 비밀번호 일치

logincontext 입력받고 아이디 비번 맞는지 체크
*/

import { ILoginPolicyResult, Policy } from "../Policy";
import { LoginContext } from "../../context/login_context";

export class Identifier extends Policy
{

    
    public override apply(context: LoginContext): ILoginPolicyResult 
    {
        let status: number=0;
        let message: string="";

        if(context.index == -2)
        {//틀린 아이디
            status = 400;
            message = "해당하는 아이디가 없습니다.";
        }
        else if(context.index == -1)
        {//틀린 비밀번호
            status = 400;
            message = "비밀번호가 틀렸습니다.";
        }
        else
        {
            status = 200;
            message = "";
            
        }
        return {status, message};
    }

}
