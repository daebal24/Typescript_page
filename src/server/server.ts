import express from 'express'; //npm install @types/express --save-dev
import { router as loginrouter } from './router/login';
import { router as mainrouter } from './router/main';
import { router as listrouter } from './router/list';
import { router as registerrouter } from './router/register';

const app = express() //소켓서버
app.use(express.static('scripts'));
const port = 3000

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',loginrouter);
app.use('/main',mainrouter);
app.use('/list',listrouter);
app.use('/register',registerrouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})