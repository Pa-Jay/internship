const verifyToken = require('./verifyToken')
const verifyUserAndAdmin = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(['deactivate'].includes(req.user.role)){
            res.status(400).json({error:{message:'Access denied, account deactivated. Please Contact admin'}})
        }else{
            res.status(500).json({error:{message:'Access denied, Not authorized.'}})
        }
    })
}

module.exports = verifyUserAndAdmin