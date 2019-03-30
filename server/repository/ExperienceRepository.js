const ExperienceRepository = {
	list(request,response, next) {
	},

	byId(id, callback) {	
		let obj = { name: 'Castelo da Cinderela'}
				//erro, retorno q quero devolver
				//o primeiro argumento de qualquer callback do node tem q ser argumento de erro
		callback(null, obj)
	},

	create(request,response, next) {

	},

	update(request,response, next) {
		
	},

	delete(request,response, next) {

	}
}

module.exports = ExperienceRepository;