const { pool } = require('../configs/config.db');
const candidateModel = require('../models/candidate.model');


async function getAllCandidateList(req, res){
    try {
        let page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        let skip = (page-1)*limit
        req.query.offset = skip
        let data = await candidateModel.getAllCandidates(req) 
        if(data.rowCount>0){
            let total_count = data.rows[0].total_count
            return res.status(200).json({
                success: true,
                message : "All Applied candidates list",
                total_count:total_count,
                current_page: page,
                total_pages:  +total_count/limit,
                data : data.rows
            })
        }else{
            return res.status(404).json({
                success:false,
                message : "No Candidates found."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Some internal server error",
            error:error.message
        }) 
    }
}

async function applyToJobs(req, res){
    try {
        let {name, email, job_id, phone, qualification, location, resume_image} = req.body 

    if(!name || !email || !job_id || !phone || !qualification || !location || !resume_image){
        return res.status(400).json({
            success:false,
            message :"Please provide all fields."
        })
    }
    let data = await pool.query(req);
    if(data.rowCount>0){
        return res.status(201).json({
            success:true,
            message :"You have successfully applied for this job"
        })
    }else{
        return res.status(400).json({
            success:false,
            message :"failed to submit. Please try again.",
        })
    }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Some internal server error",
            error:error.message
        }) 
    }
}


module.exports = {applyToJobs, getAllCandidateList}