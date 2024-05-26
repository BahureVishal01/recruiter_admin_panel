const { pool } = require("../configs/config.db");

module.exports.addClientEnquiry = async(req)=>{
    let insertQuery = `INSERT INTO clients (company_name, email, phone, industry_type_id, subject) VALUES($1, $2, $3, $4, $5) returning *` ;
    let params = [req.body.company_name, req.body.email, req.body.phone, req. body.industry_type_id, req.body.subject];
    let result = await pool.query(insertQuery, params);
    return result;
}

module.exports.getClientEnquiry = async(req)=>{
    let getQuery = `select (select count(c.client_id) from clients c INNER JOIN industry_type i ON i.industry_type_id=c.industry_type_id)as count, * from clients c INNER JOIN industry_type i ON i.industry_type_id=c.industry_type_id order by client_id desc limit $1 offset $2`;
    let result = await pool.query(getQuery, [req.query.limit, req.query.offset])
    return result;
}

module.exports.getIndustryType = async()=>{
    let getQuery = 'select * from industry_type';
    let result = await pool.query(getQuery);
    return result;
}
module.exports.checkEnquiry = async(company_name)=>{
    let getQuery = 'select * from clients where company_name = $1';
    let result = await pool.query(getQuery, [company_name]);
    return result;
}

