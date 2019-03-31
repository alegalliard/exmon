const router = require('express').Router();
const ExperiencesRoute = require('../route/ExperiencesRoute');
const AppController = require('../controller/AppController');
const package = require('../../package.json');

router.get('/', AppController.index);
router.get('/html', (request, response, next) => {
	let umNum = Math.random() * 100;
	response.render('index', { title: `Numerão aleatório ${umNum}`, version: package.version }) //para renderizar o html
});
router.use('/experiences', ExperiencesRoute);

module.exports = router;