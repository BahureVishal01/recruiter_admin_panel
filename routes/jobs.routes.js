const express = require('express');
const { getAllJobs, getSingleJobById, createNewJobs, jobTypes, getAllJobsForCandidates, getSingleJobForCandidates } = require('../controllers/jobs.controller');
const authVerify = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/all-jobs',  authVerify,getAllJobs);
router.get('/single-job',authVerify, getSingleJobById);
router.post('/new-job', authVerify,createNewJobs);
router.get('/job-types', jobTypes)


///////// current openings //////////

router.get('/openings/all-jobs', getAllJobsForCandidates)
router.get('/openings/single-job', getSingleJobForCandidates);

module.exports = router;

