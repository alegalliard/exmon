const AppController = {
	index(request, response, next) {
		response.send('Pong!');
	},
	notFound(request, response, next) {
		let err = new Error('not found');
		err.status = 404;
		next(err);
	},
	handleError(err, request, response, next) {
		let status = err.status || 500;

		//tratando erros que não mostram no console
		if(status !== 404 && process.env.NODE_ENV !== 'test') console.log(err.stack) 

		response.status(status);
		if(request.xhr)
			response.json({message: err.message});
		else
			response.send(err.message);
	}
};

module.exports = AppController;