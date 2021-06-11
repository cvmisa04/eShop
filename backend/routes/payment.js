const express = require('express')
const router = express.Router();


const { processPayment, sendStripeApi }= require('../controllers/paymentController')

const { isAuthUser} =require('../middlewares/auth');



router.route('/payment/process').post(processPayment)
router.route('/stripeapi').get(isAuthUser,sendStripeApi)


module.exports= router