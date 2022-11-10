const router = require('express').Router()
const getAllAppointment = require('../../controllers/appointmentController/getAllAppointment')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdminToken = require('../../middlewares/authMiddleware/verifyAdmin')
const getAppointmentPerUser = require('../../controllers/appointmentController/getAllBookingsPerUser')
const deleteAppointment = require('../../controllers/appointmentController/deleteAppointment')
const bookAppointment = require('../../controllers/appointmentController/bookAppointmentController')
const { appointmentsPerUser } = require('../../controllers/appointmentController/getAllBookingsPerUser')
const { updateAppointmentController } = require('../../controllers/appointmentController/updateAppointment')
const { getSingleAppointmentController } = require('../../controllers/appointmentController/getSingleAppointment')
// router.get('/all',verifyToken,verifyAdminToken, getAllAppointment )
router.get('/all',verifyToken, appointmentsPerUser )
router.get('/:id',verifyToken, getSingleAppointmentController )
router.post('/create', verifyToken, bookAppointment )
router.put('/update/:id',verifyToken, updateAppointmentController )
router.delete('/:id',verifyToken,deleteAppointment )


module.exports = router