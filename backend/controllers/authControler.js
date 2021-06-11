const UserModel = require('../models/user')
const ErrorHandler = require('../utils/errorHendler')
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const cloudinary = require ('cloudinary')


//Resiter user

exports.newUser = catchAsyncError(async (req, res, next) => {

const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'avatars',
    width:150,
    crop:'scale'
})

    const { name, email, password } = req.body;

    const user = await UserModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.url
        }

    })
    

    const token = user.getJwtToken();

    sendToken(user, 200, res)


})

//Login user => /apiv1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    //Check email and password 

    if (!email || !password) {

        return next(new ErrorHandler('Unesite email ili lozinku', 400))
    }

    //Find user in database

    const user = await UserModel.findOne({ email }).select("+password")

    if (!user) {
        return next("Pogresan email ili password", 401);

    }

    //Chek password

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Pogresan email ili password', 401))
    }

    const token = user.getJwtToken();

    sendToken(user, 200, res)
})

//Forgot password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("Nismo pronasli korisnika sa ovim emailom", 404))
    }

    //get reset token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    //Create reset password url

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    const message = `Vas reset password je: \n\n ${resetUrl}\n\n Ako niste poslali zahtev za ovaj email, onda ignorisite.`


    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIT password recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Link za resetovanje lozinke je poslat na email: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPassword = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }


})


//Reset password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //Hash url token

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Link je istekao!', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {

        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new password

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPassword = undefined;

    await user.save()

    sendToken(user, 200, res)



})

//Get user profile details /api/v1/me

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//Update Pasword => api/v1/password/update

exports.updatePassword = catchAsyncError(async(req, res, next) => {
  
    const user= await UserModel.findById(req.user.id).select('+password');
    
    //Check previous password

   const isMatched = await user.comparePassword(req.body.oldPassword)


   if (!isMatched) {
       return next(new ErrorHandler('Stara lozinka je pogresna!',400))
   }

    user.password = req.body.password;
   await user.save()
    
    sendToken(user, 200, res)


})

//Update Profile

exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        avatar:req.body.avatar
    }

    //Update avatar

    if(req.body.avatar !== '') {
        let user = await UserModel.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
       
    }
    
  
    const user = await UserModel.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})


//Logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Admin router

//Get all users

exports.allUsers = catchAsyncError(async(req,res,next)=>{

    const users = await UserModel.find()

    res.status(200).json({
        succes:true,
        users: users.length,
        users
    })
})

//get users by id => /api/v1/admin/user/:id

exports.getUserDetail = catchAsyncError(async(req,res,next)=>{

    const user = await UserModel.findById(req.params.id);

    if(!user){

        return next(new ErrorHandler(`Ne postoji user sa ovim ${req.params.id}`,400))
    }

    res.status(200).json({
        succes:true,
        user
    })
})

//Update user only ADMIN 

exports.updateUser = catchAsyncError(async(req,res,next)=>{

    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }



    const user = await UserModel.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        succes:true,
        user
    })
})

//Delte User --ADMIN by ID

exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await UserModel.findById(req.params.id);

    if(!user){

        return next(new ErrorHandler(`Ne postoji user sa ovim ${req.params.id}`,400))
    }
    const image_id = user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(image_id);
    //delete user

    await user.remove()

    res.status(200).json({
        success:true,
        user
    })
})



