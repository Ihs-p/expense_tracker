const { getDashboardData } = require('../controllers/dashboardController')
const { protect } = require('../middleware/authMiddleware')

const router = require('express').Router()

router.get('/',protect , getDashboardData)


module.exports = router