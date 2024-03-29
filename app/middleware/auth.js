const jwt = require ('jsonwebtoken')
const authenticateUser = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({errors:'jwt token missing'})
    }
    try{
        const tokenData = jwt.verify(token,process.env.JWT_SECRET)
        req.user={id:tokenData.id}
        next()
    } catch(e){
        res.status(401).json(e)
    }
}
module.exports = {
    authenticateUser:authenticateUser
}