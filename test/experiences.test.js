const app = require('../server/app');
const request = require('supertest')(app);
const assert = require('assert');
const db = require('../server/config/mongo');

describe('==> Experieces routes', () => {
	let id;
	// rodam só uma vez
	// before()
	// after()
	beforeEach((done) => {
		//a cada teste ele vai criar o dado abaixo
		let obj = {name: 'A Bela e a Fera', minHeight: 123};
		db.collection('experiences').insert(obj, (err, result) => {
			id = result._id.toString();
			done();
		});
	})

	afterEach((done) => {
		//ao final de cada teste ele limpa os dados para que um não interfira no outro
		db.collection('experiences').remove({}, done);
	})

	it('GET /experiences', () => {
		return request.get('/experiences')
					.expect(200)
					.then(result => {
						assert.ok(result.body.length);
						assert.equal(result.body.length, 1);
						assert.equal(result.body[0].name, 'A Bela e a Fera')
					})
	})

	it('GET /experiences/:id', () => {
		return request.get(`/experiences/${id}`)
					.expect(200)
					.then(result => {
						assert.equal(result.body._id, id);
						assert.equal(result.body.name, 'A Bela e a Fera');
					})
	})

	it('POST /experiences', () => {
		let obj = { name: 'Carrossel'}
		return request.post('/experiences').send(obj).expect(201)
						.then(result => {
							assert.ok(result.body._id);
							assert.ok(result.body.name);
						});
	})

	it('PUT /experiences/:id', () => {
		let obj = {name: 'Alo Alo W Brazil'}
		return request.put(`/experiences/${id}`).send(obj).expect(200)
						.then(result => {
							assert.deepEqual(result.body, { n:1, nModified: 1, ok: 1})
						});
	})

	it('DELETE /experiences/:id', () => {
		return request.delete(`/experiences/${id}`).expect(204)
						.then(result => {
							assert.equal(result.text, '')
						});

		// teste com mongo

		// db.collection('experiences').find({_id: db.ObjectId(id)}, (err, data) => {
		// 	assert.ok(!data)
		// 	assert.ok(!err)
		// })
	})

	it('Invalid ID', () => {
		return request.get('/experiences/45').expect(422)
		.then(result => {
			assert.equal( result.text, 'invalid Id');
		})
	})

	//testar uma única coisa
	// it.only('PUT /experiences/:id', () => {	})

	//closure: função retornando função
})