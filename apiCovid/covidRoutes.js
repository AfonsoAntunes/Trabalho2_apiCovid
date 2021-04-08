// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to API COVID-19'
    });
});

// Import COVID Controller
var covidController = require('./covidController');

// COVID routes
router.route('/covid')
    .get(covidController.index)
    .post(covidController.add);
    
router.route('/covid/:covid_id')
    .get(covidController.view);

// Export API routes
module.exports = router;