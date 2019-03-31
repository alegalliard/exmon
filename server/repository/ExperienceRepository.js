const db = require('../config/mongo');
const bluebird = require('bluebird');

const ExperienceRepository = {
	list(callback) {
		db.collection('experiences').find({}, (err, data) => {
			callback(null, data);
		})
	},

	byId(id, callback) {	
		let _id = db.ObjectId(id);
		db.collection('experiences').findOne({ _id: _id}, callback)

		//versão completa
		// db.collection('experiences').findOne({ _id: _id}, (err, data) => {
		// 	callback(err,data)
		// })
				//erro, retorno q quero devolver
				//o primeiro argumento de qualquer callback do node tem q ser argumento de erro
		// callback(null, obj)
	},

	create(body, callback) {
		db.collection('experiences').insert(body, callback);
	},

	update(id, body, callback) {
		let _id = db.ObjectId(id);
		let query = { _id: _id }
		db.collection('experiences').update(query, { $set: body }, callback);
	},

	delete(id, callback) {
		let _id = db.ObjectId(id);
		let query = { _id: _id };

		db.collection('experiences').remove(query, callback);
	}
}
// bluebird.promisifyAll pega todos os callbacks e trabsforma em uma promise
module.exports = bluebird.promisifyAll(ExperienceRepository);