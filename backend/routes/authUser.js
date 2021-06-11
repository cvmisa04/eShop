const express = require('express')
const router = express.Router()


const { newUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword, 
    updateProfile,
    allUsers,
    getUserDetail,
    updateUser,
    deleteUser} = require('../controllers/authControler');
const { isAuthUser, authorizeRoles } = require('../middlewares/auth');



router.route('/register').post(newUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/me').get(isAuthUser, getUserProfile)
router.route('/me/update').put(isAuthUser,updateProfile)
router.route('/password/update').put(isAuthUser, updatePassword)
router.route('/admin/users').get(isAuthUser,authorizeRoles('admin'),allUsers)
router.route('/admin/user/:id').get(isAuthUser,authorizeRoles('admin'),getUserDetail)
                                .put(isAuthUser,authorizeRoles('admin'),updateUser)
                                .delete(isAuthUser,authorizeRoles('admin'),deleteUser)



module.exports = router;