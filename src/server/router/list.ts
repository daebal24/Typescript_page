
import express from 'express'; 
import { Load_Data } from '../../util/load_Data';


const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended : true}));

router.get('/', async(req, res) => {

    const a = new Load_Data;
    const js = a.loadjson("people");
    res.render('list',{data:js});
})

export {router};