const express = require('express');

const { applyToJobs,getAllCandidateList } = require('../controllers/candidate.controller');
const router = express.Router()

router.get('/getAllCandidates', getAllCandidateList)

router.post('/applyJobs', applyToJobs)

module.exports = router;