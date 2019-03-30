const repository = require('../repository/ExperienceRepository');
const ExperienceController = {
	list(request,response, next) {
		response.send('Pipopoporopó')
	},

	byId(request, response, next) {	
		const id = request.params.id;
		repository.byId(id, (err, data) => {
			response.send(data);
		})
	},

	create(request,response, next) {},

	update(request,response, next) {
		
	},

	delete(request,response, next) {},

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