const express = require('express');
const { getAllClients, addClients } = require('../controllers/client.controller');
const router = express.Router();

router.get('/allClientsEnquiry', getAllClients);
router.post('/addEnquiry', addClients);

module.exports = router;