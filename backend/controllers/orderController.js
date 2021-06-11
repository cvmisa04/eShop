const OrderModel = require('../models/order');
const ErrorHandler = require('../utils/errorHendler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const product = require('../models/product');

//New order = > api/v1/order/new

exports.newOrder = catchAsyncError(async(req,res,next)=>{

    const { 
        orderItems,
        shipingInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
        paymentInfo

     } = req.body

     const order = await OrderModel.create({

        orderItems,
        shipingInfo,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id


     })

     res.status(200).json({
         success:true,
         order
     })


})

//Get single order by id /api/v1/order/:id

exports.getSingleOrder= catchAsyncError(async(req,res,next)=>{
  
    const order = await OrderModel.findById(req.params.id).populate('user','name email')

    if(!order){
       return next(new ErrorHandler('Ne postoji narudzbina sa ovim id',404))
    }

    res.status(200).json({
        success:true,
        order
    })

})

//get logged in user orders

exports.getLoggedUser= catchAsyncError(async(req,res,next)=>{

    const orders = await OrderModel.find({user: req.user.id})

    res.status(200).json({
        success:true,
        orders
    })
})

//get all orders -ADMIN-  ==> /api/v1/admin/orders

exports.allOrders= catchAsyncError(async(req,res,next)=>{

    const orders = await OrderModel.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//Update orders proccesin to delivered

exports.updateOrder = catchAsyncError(async(req,res,next)=>{

    const order = await OrderModel.findById(req.params.id);

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('Ova narudzbina je vec isporucena',400))
    }

    order.orderItems.forEach(async item=>{
        await updateStock(item.product,item.quantity)
    })

    order.orderStatus=req.body.status
    order.delieverdAt = Date.now()

    await order.save()

    res.status(200).json({
        success:true
    })
})

async function updateStock(id,quantity){
    const pr = await product.findById(id)

    pr.stock = pr.stock - quantity;
   

    await pr.save({validateBeforeSave:false})
}

//Delete order
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{

    const order = await OrderModel.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Ne postoji porudzbina sa ovim ID',404));
    
    }

    await order.remove()

    res.status(200).json({
        success:true
    })
})

