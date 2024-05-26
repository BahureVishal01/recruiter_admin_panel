const { pool } = require("../configs/config.db");

module.exports.createUser = async(req)=>{
   // console.log(req)
   let insertQuery = `INSERT INTO users(first_name, last_name, user_email, user_mobile, user_password, user_role) VALUES
                ($1, $2, $3, $4, $5, $6) returning user_id, user_role`;
   let params = [req.first_name, req.last_name, req.user_email, req.user_mobile, req.user_password, req.user_role]
   let result = await pool.query(insertQuery, params)
   return result;
}

module.exports.getUser = async(user_email)=>{
    let getQuery = `select * from users where user_email = $1`;
    let result = await pool.query(getQuery, [user_email])
    return result;
}
module.exports.getAdminUser = async()=>{
    let getQuery = `select * from users where user_role = $1`;
    let result = await pool.query(getQuery, ['admin'])
    return result;
}

module.exports.updateUserRole = async(req)=>{
    let updateQuery = `UPDATE users set user_role = $1 WHERE user_id=$2`;
    let result = await pool.query(updateQuery, [req.body.user_role, req.body.user_id]);
    return result;
}
module.exports.getAllUsers = async(req)=>{
   let getQuery = `select *,(select COUNT(user_id) from users where user_role <> 'admin' OR user_role IS NULL) as total_count from users where user_role <> 'admin' OR user_role IS NULL ORDER BY user_id DESC LIMIT $1 OFFSET $2`;
   let result = await pool.query(getQuery, [req.query.limit, req.query.offset]);
   return result;
}

module.exports.getUserDetails = async(user_id)=>{
    let getQuery = `SELECT user_id, first_name, last_name, user_role, is_verified, is_active, created_at, updated_at, user_email, user_mobile
	FROM public.users where user_id = $1`;
    let result = await pool.query(getQuery, [user_id])
    return result;
}


