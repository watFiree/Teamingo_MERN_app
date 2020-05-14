const jwt = require('jsonwebtoken');

module.exports= function (req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token) return res.statusStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, id)=>{
        if(err)  res.statusStatus(401);
        req.user = id;
        next()
    })
}

