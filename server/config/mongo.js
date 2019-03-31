const mongojs = require('mongojs');
let mongoURi;

if(process.env.NODE_ENV === 'test')
	mongoURi = 'localhost:27017/disney-test';
else
	mongoURi = 'localhost:27017/disney';

const db = mongojs(mongoURi);
// const db = mongojs('user:password@localhost:27017/disney');

db.on('error', (err) => {
	console.log('Caiu', err)
});

module.exports = db;