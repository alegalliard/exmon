const router = require('express').Router();
const ExperiencesRoute = require('../route/ExperiencesRoute');
const AppController = require('../controller/AppController');

const RequestDemorado = require('../controller/RequestDemorado');


router.get('/', AppController.index);

router.use('/experiences', ExperiencesRoute);

module.exports = router;