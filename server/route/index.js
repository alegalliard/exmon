const router = require('express').Router();
const ExperiencesRoute = require('../route/ExperiencesRoute');
const AppController = require('../controller/AppController');
const package = require('../../package.json');
const jwt = require('jwt-simple');
const SECRET = 'domingo';

router.get('/', AppController.index);

router.post('/login', (request, response, next) => {
	const {user, pass} = request.body;
	if(user === 'ale' && pass === '123') {
		const payload = {user: user, isLogged: true}
		const token = jwt.encode(payload, SECRET);

		response.json({token: token});
	} else {
		let err = new Error('Não foi possível logar');
		err.status = 401;
		next(err);
	}
});

function auth(request, response, next) {
	let token = request.query.token;
	token = token || request.headers['x-token'];
	
	if(!token) {
		return next(forbidden)
	}

	try{
		const decoded = jwt.decode(token, SECRET);
		if(decoded.isLogged) {
			next();
		} else {
			return next(forbidden)
		}
	} catch(e) {
		return next(forbidden)
	}
}

router.use('/experiences', ExperiencesRoute);

router.get('/html', (request, response, next) => {
	let umNum = Math.random() * 100;
	response.render('index', { title: `Numerão aleatório ${umNum}`, version: package.version }) //para renderizar o html
});

module.exports = router;