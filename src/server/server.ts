import express from 'express'; //npm install @types/express --save-dev
import { router as loginrouter } from './router/login';
import { router as mainrouter } from './router/main';
import { router as listrouter } from './router/list';
import { router as registerrouter } from './router/register';

const app = express(); //μμΌμλ²
const port = 3000;

app.set('view engine','ejs');
app.set('views','./views');

app.use('/scripts', express.static('./src/scripts'));
app.use(express.static('public'));   

app.use('/',loginrouter);
app.use('/main',mainrouter);
app.use('/list',listrouter);
app.use('/register',registerrouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})