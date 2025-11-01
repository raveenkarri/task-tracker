
import jwt from "jsonwebtoken";

const authenticationRoute = async (req,res,next)=>{
    try{
        let token;
        const authHeader = req.headers["authorization"]
        if(!authHeader){
            return res.json({message:"No Authorization header"})
        }
        token = authHeader.split(" ")[1]
        if(!token){
             return res.json({message:"No Token in header"})
        }

        jwt.verify(token,process.env.JWT_TOKEN,(err,payload)=>{
            if(err){
                return res.json({error:err.message,message:"Error in token verification"})
            }
            req.user = payload.user 
            console.log(req.user)
            next()
            
        })
    }catch(err){
        console.log("Middleware error", err.message);
        res.status(500).json({ error: err.message });
    }
}
export default authenticationRoute;