const router = require('express').Router();

const apiRoutes = require('./api');
const homepageController = require('./homepageController');
const dashboardController = require('./dashboardController');

router.use('/api', apiRoutes);
router.use('/', homepageController);
router.use('/dashboard', dashboardController);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;