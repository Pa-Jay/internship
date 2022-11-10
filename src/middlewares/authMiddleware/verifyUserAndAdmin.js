const verifyToken = require('./verifyToken')
const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(req.user.id || ['admin'].includes(req.user.role)){
            next()
        }
    })
}
module.exports = verifyAdmin