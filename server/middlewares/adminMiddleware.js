import jwt from 'jsonwebtoken';
import 'dotenv/config';
import util from '../services/util.js';


const isOrganizer = async (req, res, next) => {

    const {token }= req.cookies
    if(token == null){
            res.sendStatus(403)
            return 0;
    }
    else{
        await jwt.verify(
            token,
            process.env.JWT_SECRET, 
            async (err, authData) => {
                if (err) {
                    res.sendStatus(403)
                }else{
                    req.user = await util.getUserByToken(req)
                    if(req.user.role == "A"){
                        next()

                    }else{
                        res.status(401)
                        .json({msg: "User is not an Admin"})
                    }
                }
        })

    }


};

export default isOrganizer;