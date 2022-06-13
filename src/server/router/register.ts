
import express from 'express'; 
import { Load_Data } from '../../util/load_Data';

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended : true}));

router.get('/', async(req, res) => {
    let close:boolean = false;
    res.render('register',{close});
})

router.post('/', async(req, res) => 
{
    
    const id = req.body.id;
    const password = req.body.pw;
    const comcode = req.body.comcode;

    const usertype = req.body.user;
    const write = (req.body.perm_write!=undefined)?true:false;
    const read = (req.body.perm_read!=undefined)?true:false;
    
    let isadmin:boolean = false;
    if(usertype=="admin")
        isadmin = true;

    let a = new Register();
    let close:boolean = a.register(id, password, comcode, isadmin, read, write);
    res.render('register',{close});
})

export {router};



class Register
{
    register(request_id:string, request_password:string, request_company:string, request_isAdmin:boolean, read:boolean, write:boolean)
    {
        /*
            이전 데이터 로딩
            새 리스트 추가
            새 데이터 저장
            알람
            리스트 보여주기
        */

        //새 데이터 형태 생성
        let neweachman:object = this.new_member(request_id, request_password, request_company, request_isAdmin, read, write);
        ///이전 데이터 로딩하고 새 데이터 추가///
        let people:object = this.add_new_member(neweachman, request_isAdmin);

        const fs = require('fs');
        fs.writeFileSync('./data/data.json', JSON.stringify(people))
        console.log("저장완료");
        return true;
    }
    
    //보조함수
    new_member(newid:string, newpw:string, newcomcode:string, request_isAdmin:boolean, read:boolean, write:boolean)
    {

        let writeid:boolean=write;
        let readid:boolean=read;
        let usertype:string="admin";
        let comcode:string=newcomcode+"0000";

        if(!request_isAdmin)
        {
            usertype="user";
        }
        
        let eachman = 
        {
            "id" : newid,
            "pw" : newpw,
            "comcode" : comcode,
            "usertype" : usertype,
            "writeid" : writeid,                     
            "readid" : readid,
            "lastlogin" : (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())).toString(),
            "sleep" : false
        };

        return eachman;
    }

    //보조함수
    add_new_member(neweachman:object, request_isAdmin:boolean)
    {
        let load_data = new Load_Data();
        let returnarray:Array<Array<object>>=[];
        returnarray = load_data.people_data_loading("", "", -1); //이전 데이터로딩

        let admin:Array<object>=returnarray[0];
        let user:Array<object>=returnarray[1];

        //neweachman
        if(!request_isAdmin)
        {         
            //일반 유저      
            user.push(neweachman);     
        }
        else
        {
            //관리자 유저
            admin.push(neweachman);
        }

        let people = 
        {
            "admin":admin,
            "user":user
        };
        return people;
    }
    
    
}