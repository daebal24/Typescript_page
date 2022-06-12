import express from 'express'; 

import { Policy, ILoginPolicyResult } from '../../policies/Policy';
import { Identifier } from "../../policies/login/identifier";
import { Contract_period } from "../../policies/login/contract_period";
import { Accountstatus } from "../../policies/login/account_status";
import { LoginContext } from '../../context/login_context';

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended : true}));

router.get('/', async(req, res) => {
    
    let a:string = "";
    res.render('login', {result:a});
})

router.post('/', async(req, res) => {
    
    let a:number = 6;
    const request_id = req.body.user_id;
    const request_password = req.body.user_pw;
    console.log(request_id + " " + request_password);

    let logincontext = new LoginContext(request_id, request_password);
    logincontext.return_index_identify();

    let identifier = new Identifier();
    let companycontract = new Contract_period();
    let sleepornot = new Accountstatus();

    //정책적용
    let c1: ILoginPolicyResult = identifier.apply(logincontext);       
    let c2: ILoginPolicyResult = companycontract.apply(logincontext);     
    let c3: ILoginPolicyResult = sleepornot.apply(logincontext);

    let alist:Array<ILoginPolicyResult> = [];
    alist.push(c1);alist.push(c2);alist.push(c3);

    let error:boolean = false;
    let message:string = "";
    for(let i=0;i<alist.length;i++)
    {
        let element:ILoginPolicyResult=alist[i];
        if(element.status == 400)
        {
            console.log("로그인 결과 : 실패--", element.message);
            message=element.message;
            error = true;
            break;
        }
    }
    if(!error)
    {
        console.log("로그인 결과 : 성공");
        const data="";
        res.render('main',{data:data});
    }
    else
    {
        res.render('login',{result:message});
    }
    

})

export {router}