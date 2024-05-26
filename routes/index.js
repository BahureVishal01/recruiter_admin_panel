const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const jobsRoutes = require('./jobs.routes')
const clientRoutes = require('./clients.routes');
const candidateRoutes = require('./candidate.routes');

/// auth routes ///
router.use('/v1/auth', authRoutes)

//// user routes  ///
router.use('/v1/users', userRoutes);

//// jobs routes ///
router.use('/v1/jobs', jobsRoutes);

// clients routes
router.use('/v1/clients', clientRoutes);

router.use('/v1/candidate', candidateRoutes)


module.exports = router;