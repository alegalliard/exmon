const AppController = {
	index(request, response, next) {
		response.send('Pong!');
	}
};

module.exports = AppController;