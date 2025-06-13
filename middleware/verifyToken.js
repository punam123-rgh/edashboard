const jwt = require('jsonwebtoken');
const jwtkey = 'e-com';

const verifyToken = async(req,resp,next)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1]
        console.log('middleware called',token)
        jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                resp.status(401).send('please provide valid token')
            }
            else{
                next();
            }

        })
    }
    else{
        resp.status(403).send('please add token with header')
    }
}
module.exports = verifyToken;