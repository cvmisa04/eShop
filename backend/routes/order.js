const express = require('express')
const router = express.Router();


const { newOrder, getSingleOrder, getLoggedUser, allOrders, updateOrder, deleteOrder }= require('../controllers/orderController')

const { isAuthUser,authorizeRoles} =require('../middlewares/auth');



router.route('/order/new').post(isAuthUser,newOrder)
router.route('/order/:id').get(isAuthUser,getSingleOrder)
router.route('/orders/me').get(isAuthUser,getLoggedUser)


router.route('/admin/orders').get(isAuthUser,authorizeRoles('admin'),allOrders)
router.route('/admin/order/:id').put(isAuthUser,authorizeRoles('admin'),updateOrder)
                                .delete(isAuthUser,authorizeRoles('admin'),deleteOrder)

module.exports= router