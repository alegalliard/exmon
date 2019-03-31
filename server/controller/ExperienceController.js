const repository = require('../repository/ExperienceRepository');

function notFound(data) {
	if(Array.isArray(data) && !data.length || !data) {
		let err = new Error('not found')
		err.status = 404;

		throw err;
	}
	return data;
}
const ExperienceController = {
	list(request,response, next) {
		//VERSÃO COM CALLBACK
		// repository.list((err, data) => {
		// 	if(err) return next(err);
		// 	response.send(data)
		// })

		//VERSÃO COM ASYNC (com bluebird)
		repository.listAsync()
			.then(notFound)
			.then(( data ) => {
				response.json(data);
			})
			.catch(next)
	},

	byId(request, response, next) {
		const id = request.params.id;
		//CALBACK
		// repository.byId(id, (err, data) => {
		// 	if(err) return next(err);
		// 	if(!data) {
		// 		let notFound = new Error('xp not found');
		// 		notFound.status = 404;
		// 		return next(notFound);
		// 	}
		// 	response.send(data);
		// })

		//ASYNC
		repository.byIdAsync(id)
			.then(notFound)
			.then(data => response.send(data))
			.catch(next)
	},

	create(request, response, next) {
		const body = request.body;
		//versão callback
		// repository.create(body, (err, data) => {
		// 	if(err) return next(err);
		// 	response.status(201)
		// 		.json(data)
		// })
		// db.collection('experiences')

		//versão async

		repository.createAsync(body)
			.then(data => {
				response.status(201)
					.json(data)
			})
			.catch(next)

		
	},

	update(request, response, next) {
		const id = request.params.id;
		const body = request.body;

		//versão callback
		// repository.update(id, body, (err, data) => {
		// 	response.json(data);
		// })


		//versão async
		repository.updateAsync(id, body)
			.then(notFound)
			.then( (data) => {
				response.json(data);
			})
			.catch(next)
	},

	delete(request,response, next) {
		const id = request.params.id;
		//versão callback
		// repository.delete(id, (err, data) => {
		// 	response.sendStatus(204);
		// })

		repository.deleteAsync(id)
			.then(notFound)
			.then((data) => {
				response.sendStatus(204);
			})
			.catch(next);
	},

	validateId(request, response, next) {
		const id = request.params.id;

		if(id.length !== 24) {
			let err = new Error('invalid Id');
			err.status = 422;
			return next(err);
		}

		next();
	}
}

module.exports = ExperienceController;