import jwt from 'jsonwebtoken'

const deserializerUser =  async (req,res, next)=>{
    const accessToken = req?.headers?.authorization.replace(/^Bearer\s/,"");
    if(!accessToken) return next();
    const user = await jwt.decode(accessToken)
    req.user = user;
}

export default deserializerUser;