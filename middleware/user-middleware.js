import jwt from 'jsonwebtoken';	// Importing jwt

export const Middleware = async (req, res, next) => {
    try {
        req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        const token = req.headers.authorization.split(" ")[1];
        console.log("llll"+ token);
        if(!token){
        return res.status(403).json({message: "Token Invalid"});
    }
    console.log(token);
    const user = await jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if(err){
        return res.status(403).json({message: err.message});
    }
    req.user = user;
    next()
    });
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}