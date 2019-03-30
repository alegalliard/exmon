const mongojs = require('mongojs');
const db = mongojs('localhost:27017/disney');
// const db = mongojs('user:password@localhost:27017/disney');

db.on('error', (err) => {
	console.log('Caiu', err)
});

module.exports = db;