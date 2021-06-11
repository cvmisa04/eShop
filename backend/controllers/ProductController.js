const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHendler');

const catchAsyncError = require('../middlewares/catchAsyncError')
const ApiFeatures = require('../utils/apiFeature')
const cloudinary = require('cloudinary')

//create new products =>  /api/v1/new

exports.newProducts = catchAsyncError( async (req,res,next)=>{
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
})

//get all Products => /api/v1/products?keyword=apple
exports.getProduct = catchAsyncError( async (req,res,next) => {

  //return  next(new ErrorHandler('Moja greska',400));
    const resPerPage = 4;

    const productCounts = await Product.countDocuments()


    
    const apiFeature = new ApiFeatures(Product.find(),req.query)
                        .search()
                        .filter()
                       


 let products = await apiFeature.query;
    let filteredProductsCount = products.length;
  

    apiFeature.pagination(resPerPage)
    products = await apiFeature.query
    
   

setTimeout(()=>{
    res.status(200).json({
        success:true,
        count:products.length,
        productCounts,
        resPerPage,
        filteredProductsCount,
        products
    })
},1000)
    

    
 

})
//get all products for ADMIN /api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async(req,res,next)=>{

    const products = await Product.find();

    res.status(200).json(
        {
            success:true,
            products
        }
    )
})

// get product by id => /api/v1/admin/product/:id

exports.getProductById =catchAsyncError(async (req,res,next)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
       return next(new ErrorHandler('Product not found', 404))
       
    }
    res.status(200).json({
        success:true,
        product
    })


}) 

//updateProduct => /api/v1/admin/product/:id

 exports.updateProduct =catchAsyncError( async(req,res,next)=>{


    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



     let product = await Product.findById(req.params.id)

     if(!product){
         res.status(404).json({
             success:false,
             message:"Nismo pronasli proizvod "
         })
     }

     product= await Product.findByIdAndUpdate(req.params.id,req.body,
        {new:true,useFindAndModify:false,runValidators:true});

     res.status(200).json({
         success:true,
         product

     })


})

//deleteProduct => /api/v1/admin/product/:id

exports.deleteProduct =catchAsyncError( async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success:false,
            message:"Nismo pronasli proizvod"
        })

    }
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    

  await product.remove();
    res.status(200).json({
        success:true,
        message:"Ovaj proizvod je obrisan"
    })
})

//Create new review => api/v1/review

exports.createProductReview= catchAsyncError(async(req,res,next)=>{

    const { rating, comment , productId}= req.body
   

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment


    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r=>r.user === req.user._id
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user === req.user_id){
                review.comment=comment;
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews =product.reviews.length
    }


    product.ratings=product.reviews.reduce((acc,item)=>item.rating +acc,0)/product.reviews.length


    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})

//get product review =>/api/v1/review?id=....

exports.getProductReview = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

//Delete reviews

exports.deleteReview= catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId)

    

    const reviews = product.reviews.filter(review=> review._id.toString() !== req.query.id.toString())
    console.log(reviews)
       
   
    const numOfReviews = reviews.length
    //const  ratings = product.reviews.reduce((acc,item)=>item.rating +acc ,0)/reviews.length
   product.ratings=product.reviews.reduce((acc,item)=>item.rating +acc,0)/product.reviews.length


    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings:product.rating,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})