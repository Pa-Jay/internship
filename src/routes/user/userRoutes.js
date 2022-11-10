const router = require('express').Router()
const getAllUserController = require('../../controllers/userControls/getAllUserController')
const verifyToken = require('../../middlewares/authMiddleware/verifyToken')
const verifyAdmin = require('../../middlewares/authMiddleware/verifyAdmin')
const verifyUserAndAdmin = require('../../middlewares/authMiddleware/verifyUserAndAdmin')

const upload = require("../../controllers/userControls/uploadPicture")
const updateUserController = require('../../controllers/userControls/updateUserController')
const getSingleUserController = require('../../controllers/userControls/getSingleUserController')
const deleteUserController = require('../../controllers/userControls/deleteUserController')
const updateUserPassword = require('../../controllers/userControls/updateUserPassword')
const becomeAgent = require('../../controllers/userControls/agentController')
const agentUploads = require('../../controllers/userControls/uploadPicture')
const getAllDetailerController = require('../../controllers/userControls/getAllDetailer')
const getSingleDetailerController = require('../../controllers/userControls/getSingleDetailer')
const isVerifyDetailer = require('../../controllers/userControls/isVerifyDetailer')
const { createService, allServices } = require('../../controllers/userControls/serviceController')


router.get('/all',verifyToken, getAllUserController )

router.post ('/singleupload', verifyToken, upload.single('image'), (req, res) =>{
    console.log(req.file)
    res.status(200).send('Image upload successful')
})
router.put('/update/:id',verifyToken, updateUserController )
router.put('/update-password',verifyToken, updateUserPassword )

router.get('/single',verifyToken, verifyUserAndAdmin, getSingleUserController )
router.get('/single/:id',verifyToken, verifyAdmin, getSingleUserController )
router.get('/detailer/all',verifyToken,  getAllDetailerController )
router.get('/detailer/single/:id',verifyToken,  getSingleDetailerController )
router.patch('/detailer/verify/:id',verifyToken,  isVerifyDetailer )

router.delete('/delete',verifyToken, deleteUserController )
router.put('/become-agent/:id', verifyToken, becomeAgent)

// router.patch('/agent/:id', verifyToken, agentUploads)
router.post ('/agent-upload', verifyToken, upload.array('images', 2), (req, res) =>{
    console.log(req.files)
    const uploadBy = req.user._id
    res.status(200).json({message:'Images upload successful',uploadBy})
})

router.post('/service/create', verifyToken, createService);
router.get('/service/all', verifyToken, allServices);

module.exports = router