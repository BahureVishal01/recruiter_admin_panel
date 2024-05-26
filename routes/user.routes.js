const express = require('express');
const { getAllUsers, updateUsersRole } = require('../controllers/user.controller');
const authVerify = require('../middlewares/auth.middleware');
const router = express.Router()


router.get('/all-users', authVerify, getAllUsers);

router.patch('/update-user-role', authVerify, updateUsersRole)

module.exports = router;