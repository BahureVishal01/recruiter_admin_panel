const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function signup(req, res){
  try {
       let {first_name, last_name, user_email, user_mobile, user_password} = req.body;

       if(!first_name||!last_name || !user_email || !user_mobile || !user_password){
         return res.status(400).json({
              success:false,
              message: "All fields are required...!"
         })
       }
       if(user_password?.length <6){
       return res.status(400).json({
          success:false,
          message : "Password length should be greater than 6"
       })
      }
      let checkUser = await userModel.getUser(user_email)
      if(checkUser?.rowCount>0){
          return res.status(409).json({
            success:false,
            message : "Email allready exists."
          })
      }
       const hashedPassword = await bcrypt.hash(user_password, 10);
        req.body.user_password = hashedPassword
       let isAdmin = await userModel.getAdminUser();
       let newUserData;
       if(isAdmin?.rowCount == 0){
           req.body.user_role = 'admin';
          newUserData = await userModel.createUser(req);
       }
       
       newUserData = await userModel.createUser(req.body);
       if(newUserData?.rowCount == 0){
        return res.status(400).json({
          success:false,
          message: "failed to create new user"
        })
       }
       let token = jwt.sign({
        user_id: newUserData?.rows[0]?.user_id,
        user_role: newUserData?.rows[0]?.user_role,
   }, process.env.JWT_SECRET
  )
       return res.status(201).json({
        success:true,
        message : "New user is created successfully.",
        data : { ...newUserData?.rows[0], token:token}
       })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message: "Some internal server error",
        error: error
    })
  }
}

async function login(req, res){
    try {
          let {user_email, user_password} = req.body
          if(!user_email || !user_password){
            return res.status(400).json({
                success:false,
                message: "All fields are required...!"
           })
          }
       let checkUser = await userModel.getUser(user_email);

       if(checkUser?.rowCount>0){
          let user_role = checkUser?.rows[0]?.user_role
          console.log("userrole", user_role)
          if(user_role !== "admin" && user_role !== 'sub-admin'){
            return res.status(401).json({
               success:false,
               message : "Unauthorised access"
            })
          }
           let hashedPassword = checkUser?.rows[0]?.user_password || null
           let comparePass = bcrypt.compare(req.body.user_password, hashedPassword)
           let token = jwt.sign({
                user_id: checkUser?.rows[0]?.user_id,
                user_role: user_role,
           }, process.env.JWT_SECRET
          )
           if(comparePass){
             return res.status(200).json({
              success:true,
              message : "you have loggedIn successfully.",
              data : {
                user_id: checkUser?.rows[0]?.user_id,
                user_role: user_role,
                user_email: checkUser?.rows[0]?.user_email,
                token : token
              }
             })
           }else{
            return res.status(400).json({
               success:false,
               message: "Please enter valid credentials."
            })
           }
       }
    } catch (error) {
        console.log(error)
    return res.status(500).json({
        success:false,
        message: "Some internal server error",
        error: error
    })
    }
}


module.exports = {signup, login}