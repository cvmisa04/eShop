const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userShema = mongoose.Schema({

    name:{
        type:String,
        required:[true,'Unesite vase ime'],
        maxLength:[30,'Vase ime ne moze biti vece od 30 karaktera']
    },
    email:{
        type:String,
        required:[true,'Unesite vasu email adresu'],
        unique:true,
        validate:[validator.isEmail,'Unesite valdnu email adresu']
    },
    password:{
        type:String,
        required:[true,'Unesite password'],
        minlength:[6,'Lozinka mora sadrzati minimalno 6 karktera'],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createAt:{
        type:Date,
        default: Date.now
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//encypting password before save

userShema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//Compare password
userShema.methods.comparePassword = async function(enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password)
}


//Return JWT token

userShema.methods.getJwtToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Generate password reset token

userShema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hash and set  to resetPasswordToken

    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')

    //Set token expire time

    this.resetPasswordExpire = Date.now() + 30 * 60 *1000

    return resetToken
}


module.exports= mongoose.model('User', userShema)