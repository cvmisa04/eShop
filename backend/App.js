const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


const app = express();
const dotenv = require('dotenv');
//setup env file
dotenv.config({path:"backend/config/config.env"})
const errorMiddleware = require('./middlewares/error')
const path = require('path')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true,limit:5000}));
app.use(cookieParser())
app.use(fileUpload());


//import all routes
 
const products = require('./routes/product')
const user = require('./routes/authUser')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1',products)
app.use('/api/v1', user)
app.use('/api/v1',order)
app.use('/api/v1',payment)

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*',(req,res)=>{

        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))

    })
}

//Middleware to handle error
app.use(errorMiddleware)






module.exports=app
