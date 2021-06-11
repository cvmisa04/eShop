const app = require('./App');
const connectionDataBase = require('./config/database')

//const dotenv = require('dotenv');
const cloudinary = require ('cloudinary')

//Handle Unhadled  Promise Exceptions

process.on('uncaughtException',err=>{
    console.log(`GRESKA: ${err.message}`)
    process.exit(1)
})
//setup env file

if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').dotenv.config({path:"backend/config/config.env"})
}


//conections database
connectionDataBase()

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server se startovao na portu:${process.env.PORT} u ${process.env.NODE_ENV} modu`)
})

//Handle Unhadled  Promise rejection

process.on('unhandledRejection',err=>{
    console.log(`ERROR:${err.message}`);
    console.log("Ugasite server")
    server.close(()=>{
        process.exit(1)
    })
})