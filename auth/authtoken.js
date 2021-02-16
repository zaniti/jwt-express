const { NotExtended } = require('http-errors')
const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req,res,next){
    const token = req.header('user-token')
    if(!token){
        return res.status(401).send('permission denied')
    }
    try {
        const decodeToken = jwt.verify(token,'PrivateKey')
        next()
    } catch (err) {
        res.status(404).send('error token');
    }
}
