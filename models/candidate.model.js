const { pool } = require("../configs/config.db");

module.exports.getAllCandidates = async(req)=>{
    let getQuery = `select *, (select count(candidate_id) from candidates)as total_count from candidates order by candidate_id DESC LIMIT $1 OFFSET $2`;
    let result = await pool.query(getQuery, [req.query.limit, req.query.offset]);
    return result;
}



module.exports.applyToJob = async(req)=>{
    let insertQuery = `INSERT INTO candidates(name, email, job_id, phone, qualification, location, resume_image) 
             values($1, $2, $3, $4, $5,$6, $7)returning *`;
    let result = await pool.query(insertQuery, [req.body.name, req.body.email, req.body.job_id, req.body.phone, req.body.qualification, req.body.location, req.body.resume_image])
    return result;
}


