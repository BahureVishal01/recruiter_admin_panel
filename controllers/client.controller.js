const clientModel = require('../models/client.model');

async function getAllClients(req, res){
    try {
        let  page = Number(req.query.page) || 1
        let limit = Number(req.query.limit) || 10
        let skip = (page-1)*limit
         req.query.offset = skip
         let data = await clientModel.getClientEnquiry(req)
         if(data.rowCount>0){
            return res.status(200).json({
                success: true,
                message : 'all clients list',
                current_page: page,
                total_count: 0,
                data : data.rows
            })
         }else{
            return res.status(404).json({
                success:false,
                message :"Clients enquiry not found"
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

async function addClients(req, res){
    try {
        let {company_name, email, phone, industry_type_id, subject} =req.body;
        if(!company_name || !email || !phone || !industry_type_id || !subject){
            return res.status(400).json({
                success:false,
                message: "Please provide all fields"
            })
        }
        let isCompanyNameExists = await clientModel.checkEnquiry(company_name)
        if(isCompanyNameExists.rowCount>0){
            return res.status(409).json({
                success:false,
                message: "Your Enquiry is already submitted."
            })
        }
        let newClientsData = await clientModel.addClientEnquiry(req);
        if(newClientsData.rowCount>0){
            return res.status(201).json({
                success:true,
                message : "Enquiry submitted successfully.."
            })
        }else{
            return res.status(400).json({
                success:false,
                message : "failed to submit enquiry"
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

module.exports = {addClients, getAllClients}

