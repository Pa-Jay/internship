const verifyToken = require('./verifyToken')
const verifyUserAndAdmin = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(['agent'].includes(req.user.role)){
            next()
        }else{
            res.status(400).json({error:{message:'Access denied, Not authorized.'}})
        }
    })
}

module.exports = verifyUserAndAdmin