const express = require('express')

const router = express.Router()



const {
     getProduct,
     getAdminProducts,
     getProductById,
     newProducts, 
     updateProduct,
     deleteProduct,
     createProductReview,
     getProductReview,
     deleteReview
    
    }= require('../controllers/ProductController')

    const {isAuthUser, authorizeRoles} = require('../middlewares/auth')

router.route('/products').get(getProduct);
router.route('/admin/products').get(getAdminProducts)
router.route('/product/:id').get(getProductById)

router.route('/admin/product/new').post(isAuthUser,authorizeRoles('admin'),newProducts)
router.route('/admin/product/:id').put(isAuthUser,authorizeRoles('admin'),updateProduct).delete(deleteProduct)
router.route('/review').put(isAuthUser, createProductReview)
router.route('/reviews').get(isAuthUser,getProductReview)
                        .delete(isAuthUser,deleteReview)


module.exports=router