const { pool}  = require("../configs/config.db");

module.exports.addJobs = async(req)=>{
    let insertQuery = `INSERT INTO public.jobs( job_role, work_domain, location, experience, salary, 
        description, job_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
    let params = [req.job_role, req.work_domain, req.location, req.experience, req.salary, 
        req.description, req.job_type_id]
        let result = await pool.query(insertQuery, params)
        return result;
}

module.exports.getAllJobs = async(req)=>{
     console.log(req.query)
    let getQuery = `select j.*, jt.job_type_id,(select count(j.job_id) from jobs as j INNER JOIN job_type as jt ON jt.job_type_id=j.job_type_id)as total_count from jobs as j INNER JOIN job_type as jt ON jt.job_type_id=j.job_type_id ORDER BY job_id desc limit $1 offset $2`;
    let result = await pool.query(getQuery, [req.query.limit, req.query.offset]);
    return result;
}

module.exports.getSingleJobs = async(job_id)=>{
    let getQuery = `select * from jobs where job_id=$1`;
    let result = await pool.query(getQuery, [job_id])
    return result;
}

///////// job_type list ////
module.exports.getJobTypes = async()=>{
    let getQuery = 'select * from job_type';
    let result = await pool.query(getQuery);
    return result;
}

///////// job role should be unique /////
module.exports.checkJobRole = async(job_role)=>{
    let getQuery = `select * from jobs where job_role = $1`;
    let result = await pool.query(getQuery, [job_role])
    return result;
}