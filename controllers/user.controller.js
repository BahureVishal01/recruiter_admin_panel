const userModel = require('../models/user.model')

async function getAllUsers(req, res){
 try {
       let page = Number(req.query.page) || 1
       let page_limit = Number(req.query.limit)|| 10

       const starting_offset = Math.max(0, page_limit * page - page_limit);
       const ending_offset = Math.max(page_limit - 1, page_limit * page);
       req.query.limit = page_limit;
       req.query.offset = starting_offset;
       let usersData = await userModel.getAllUsers(req)
       if(usersData.rowCount>0){
        let total = usersData.rows[0].total_count
        const total_pages = Math.ceil(total / page_limit);
        const last_page = ending_offset >= total;
        return res.status(200).json({
            success:true,
            message : "All users Details",
            current_page : page,
            total_pages: total_pages,
            last_page: last_page,
            total_count: total,
            data: usersData.rows
        })
       }else{
         return res.status(404).json({
            success:false,
            message : "No Users Found."
         })
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

async function updateUsersRole(req, res){
    try {
         let { user_id, user_role}= req.body;

         if(!user_id||!user_role){
            return res.status(400).json({
                success:false,
                message: "Please provide user_id and user_role"
            })
         }
         let updatedData = await userModel.updateUserRole(req);
         if(updatedData.rowCount>0){
            return res.status(200).json({
                success:true,
                message: "User role updated successfully"
            })
         }else{
            return res.status(404).json({
                success:false,
                message : "failed to update user role."
            })
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

module.exports = {updateUsersRole, getAllUsers}