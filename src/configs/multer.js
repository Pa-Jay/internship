const multer = require('multer')
const path = require('path')

const fileStorageEngine = multer.diskStorage({
    
    destination: (req, file, cb) =>{
        cb(null, './images')
    },

    filename: (req, file, cb) =>{
        cb(null, Date.now() + "..." + file.originalname)
    }
})
const upload = multer({storage:fileStorageEngine})
module.exports = upload
// app.post ('/singleupload', upload.single('image'), (req, res) =>{
//     console.log(req.file)
//     res.status(200).send('Image upload successful')
// })

// app.post('/multipleupload', upload.array('images', 3), (req,res) => {
//     console.log(req.files)
//     res.status(200).send('Multiple upload successful')
// })