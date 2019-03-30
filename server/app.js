const express = require('express');
const app = express();

// app.get('/', (request, response, next) => {
// 	console.log('request URL: '+ request.url);
// 	console.log('request.query.q: '  + request.url + (request.query.q || '(Sem query)') );
// 	response.status(200);
// 	response.send('Você está em: ' + request.url + (request.query.q || '(Sem query)'));
// })

app.use(require('./route'));

app.listen(3000);