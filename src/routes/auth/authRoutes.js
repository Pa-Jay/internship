const router = require('express').Router()
const registerController = require('../../controllers/authController/registerController')
const changePasswordController = require('../../controllers/authController/changePasswordController');
const verifyToken = require('../../middlewares/authMiddleware/verifyToken');
const loginController = require('../../controllers/authController/loginController')

router.post('/login', loginController )

router.post('/register', registerController )
router.patch("/change-password", verifyToken, changePasswordController);




module.exports = router