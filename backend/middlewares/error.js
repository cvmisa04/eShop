const ErrorHandler = require('../utils/errorHendler')

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
  
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        err.message =err.message
        //Wrong mongoose ID

        if(err.name == 'CastError'){
            const message = `Resurs nije pronadjen. Invalid ${err.path}`
        error= new ErrorHandler(message,200)
        }

        //Handlings Mongoose Validation Error

        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(value =>value.message)
            error = new ErrorHandler(message,400)

        }

        //Handling Mongoose key error
        if(err.code === 11000){
            const message=`Duplicate ${Object.keys(err.keyValue)} entered.`
            error = new ErrorHandler(message, 400)
        }

        //Handlings  wrong  JWT error

        if(err.name === 'JsonWebTokenError'){
            const message = 'Json web token je pogresan!Pokusajte ponovo'
            error = new ErrorHandler(message, 400)
        }

        //Handlings expire jwtWebTOken

        if(err.name==='TokenExpiredError'){
            const message = 'Json web Token je istekao.Pokusajte ponovo'
            error = new ErrorHandler(message,400 )
        }

        res.status(err.statusCode).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })
    }
}