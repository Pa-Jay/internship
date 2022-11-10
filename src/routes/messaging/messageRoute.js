const router = require('express').Router()
const messaging = require('../../controllers/chatController/messaging')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middlewares/authMiddleware/verifyAdmin')

router.post('/mail',verifyToken, messaging )


module.exports = router