const jwt = require('jsonwebtoken');
const { getUser, getUserDetails } = require('../models/user.model');

async function authVerify(req, res, next){
      try {
        const authorization = req.headers.authorization;
          console.log(authorization)
        if (!authorization) {
          console.log("is there 1")
          return res.status(401).json({
            success: false,
            message: "Unauthorized access...!",
          });
        };
    
        const decodedData = jwt.verify(authorization, process.env.JWT_SECRET);
    
        //console.log("decodedData",decodedData);
    
        const getUser = await getUserDetails(decodedData.user_id);
        //console.log("getUser", getUser.rows)
        if (getUser.rowCount > 0) {
          req.user = getUser.rows[0];
          // console.log("req.user===", req.user);
    
          next();
        } else {
          console.log("is there 2")
          return res.status(401).json({
            success: false,
            message: "Unauthorized access...!",
          });
        }
        
      } catch (error) {
         console.log(error)
         return res.status(500).json({
            success:false,
            message: "Some internal server error"
         })
      }
}

module.exports = authVerify;