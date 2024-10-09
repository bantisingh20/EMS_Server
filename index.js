const express =require('express');
const cors = require('cors');
const AuthRouter = require('./Routers/AuthRoute');
const ApiRouter = require('./Routers/CommonRoutes');

require('dotenv').config();
require('./Connection/db')

const app = express();
app.use(cors());
app.use(express.json()); 
const Port = process.env.PORT;

app.listen(Port, () =>{
    console.log(`Sever is running on port no ${Port}`);
})

app.get('/ping', (req,res) => {
    res.send('PONG');
})

//client side request
app.use('/auth',AuthRouter);
app.use('/api',ApiRouter);
