const app = require('../server/app');
const request = require('supertest')(app);
const assert = require('assert');

describe('==> Main Routes', () => {
	it.skip('GET /', () => { //pulando um teste, mas mostra como pendente
		throw new Error('xii marquinho')
	})

	it('GET /', () => { //testes assíncronos
		return request
				.get('/')
				.expect(200)
				.then((result) => {
					assert.equal('Pong!', result.text)
				})

	})

	it('GET /not-found', (done) => { //precisa do done usando um callback da função end
		request
			.get('/not-found')
			.expect(404)
			.end( (err, result) => {
						   //callback(erro, dados)
				assert.equal('not found', result.text);
				done();
			})
	})
});