const mongoose = require('mongoose')

const connectDatabase= ()=>{

    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB baza podataka je konektovana sa hostom: ${con.connection.host}`)
    })

}

module.exports =connectDatabase