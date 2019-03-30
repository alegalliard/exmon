const repository = require('../repository/ExperienceRepository');
const ExperienceController = {
	list(request,response, next) {
		repository.list((err, data) => {
			if(err) return next(err);
			response.send(data)
		})
	},

	byId(request, response, next) {
		const id = request.params.id;
		repository.byId(id, (err, data) => {
			if(err) return next(err);
			if(!data) {
				let notFound = new Error('xp not found');
				notFound.status = 404;
				return next(notFound);
			}
			response.send(data);
		})
	},

	create(request, response, next) {

		const body = request.body;
		repository.create(body, (err, data) => {
			if(err) return next(err);
			response.status(201)
				.json(data)
		})
		// db.collection('experiences')

		
	},

	update(request, response, next) {
		const id = request.params.id;
		const body = request.body;
		repository.update(id, body, (err, data) => {
			response.json(data);
		})
	},

	delete(request,response, next) {
		const id = request.params.id;
		repository.delete(id, (err, data) => {
			response.sendStatus(204);
		})

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