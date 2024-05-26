const jobsModel = require('../models/job.model')

async function getAllJobs(req, res){
    try {
        let page = Number(req.query.page) || 1
        let page_limit = Number(req.query.limit)|| 10
 
        const starting_offset = Math.max(0, page_limit * page - page_limit);
        const ending_offset = Math.max(page_limit - 1, page_limit * page);
        req.query.limit = page_limit;
        req.query.offset = starting_offset;
       console.log("sdfsd")
        let jobsData = await jobsModel.getAllJobs(req);
          console.log(jobsData.rows)
        if(jobsData.rowCount>0){
            let total = jobsData.rows[0].total_count
            const total_pages = Math.ceil(total / page_limit);
            const last_page = ending_offset >= total;
            return res.status(200).json({
                success:true,
                message : "All jobs list",
                current_page : page,
                total_pages: total_pages,
                last_page: last_page,
                total_count: total,
                data: jobsData.rows
            })
           }else{
             return res.status(404).json({
                success:false,
                message : "No Jobs Found."
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

async function createNewJobs(req, res){
    try {
         let {job_role, work_domain, location, experience, salary, description, job_type_id} = req.body;
         if(!job_role || !work_domain || !location || !experience || !salary || !description || !job_type_id){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
         }
           let isJobRoleExists = await jobsModel.checkJobRole(job_role)
           if(isJobRoleExists.rowCount>0){
              return res.status(409).json({
                success : false,
                message : "job is already exists"
              })
           }
      
         let newJobsData = await jobsModel.addJobs(req.body);
         if(newJobsData?.rowCount>0){
            return res.status(201).json({
                success : true,
                message : "New Job is created successfully..",
                data : newJobsData.rows
            })
         }else{
            return res.status(400).json({
                success: false,
                message : "failed to create new Job."
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

///// list job types ////

async function jobTypes(req, res){
    let data = await jobsModel.getJobTypes();
    if(data?.rowCount>0){
        return res.status(200).json({
            success:true,
            message : "job types list",
            data: data.rows
        })
    }else{
        return res.status(404).json({
            success : false,
            message : "NO Job Types Found"
        })
    }
}

async function getSingleJobById(req, res){
    try {
         let job_id = req.query.job_id
         if(!job_id){
            return res.status(400).json({
                success: false,
                message : "Please provide job id"
            })
         }
         let data = await jobsModel.getSingleJobs(job_id);
         if(data?.rowCount>0){
            return res.status(200).json({
                success:true,
                message : "Single job details",
                data: data.rows
            })
         }else{
            return res.status(404).json({
                success:false,
                message : "No Job found."
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
////////  job listing for current openings page //////

async function getAllJobsForCandidates(req, res){
    try {
        let page = Number(req.query.page) || 1
        let page_limit = Number(req.query.limit)|| 10
 
        const starting_offset = Math.max(0, page_limit * page - page_limit);
        const ending_offset = Math.max(page_limit - 1, page_limit * page);
        req.query.limit = page_limit;
        req.query.offset = starting_offset;

        let jobsData = await jobsModel.getAllJobs(req);
        if(jobsData.rowCount>0){
            let total = jobsData.rows[0].total_count
            const total_pages = Math.ceil(total / page_limit);
            const last_page = ending_offset >= total;
            return res.status(200).json({
                success:true,
                message : "All jobs list",
                current_page : page,
                total_pages: total_pages,
                last_page: last_page,
                total_count: total,
                data: jobsData.rows
            })
           }else{
             return res.status(404).json({
                success:false,
                message : "No Jobs Found."
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

async function getSingleJobForCandidates(req, res){
    try {
         let job_id = req.query.job_id
         if(!job_id){
            return res.status(400).json({
                success: false,
                message : "Please provide job id"
            })
         }
         let data = await jobsModel.getSingleJobs(job_id);
         if(data?.rowCount>0){
            return res.status(200).json({
                success:true,
                message : "Single job details",
                data: data.rows
            })
         }else{
            return res.status(404).json({
                success:false,
                message : "No Job found."
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

module.exports = {getAllJobs, getAllJobsForCandidates, getSingleJobById, getSingleJobForCandidates, jobTypes, createNewJobs}