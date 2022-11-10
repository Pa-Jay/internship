const router = require('express').Router()
const addNewTransaction = require('../../controllers/transactionsController/addNewTransaction')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middlewares/authMiddleware/verifyAdmin')
const getAllTransactions = require('../../controllers/transactionsController/getAllTransactions')
const getAllTransactionsByUser = require('../../controllers/transactionsController/getAllTransactionsByUser')

router.get('/all',verifyToken,verifyAdminToken, getAllTransactions )
router.get('/per-user',verifyToken, getAllTransactionsByUser )
router.post('/create',verifyToken, addNewTransaction )
// router.delete('/:id',verifyToken,verifyAdminToken,deleteAppointment )


module.exports = router