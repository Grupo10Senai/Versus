import jwt from 'jsonwebtoken';
import 'dotenv/config';
import util from '../services/util.js';


const verifyToken = async (req, res, next) => {

    const {token }= req.cookies
    if(token == null){
        res.sendStatus(403)
        return 0;
    }

    await jwt.verify(
        token,
        process.env.JWT_SECRET, 
        (err, authData) => {
            if (err) {
                res.sendStatus(403)
            }})

    req.user = await util.getUserByToken(req)
    next()
};

export default verifyToken;