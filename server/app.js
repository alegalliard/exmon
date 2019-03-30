const express = require('express');
const app = express();
const AppController = require('./controller/AppController');
const bodyParser = require('body-parser');

// app.get('/', (request, response, next) => {
// 	console.log('request URL: '+ request.url);
// 	console.log('request.query.q: '  + request.url + (request.query.q || '(Sem query)') );
// 	response.status(200);
// 	response.send('Você está em: ' + request.url + (request.query.q || '(Sem query)'));
// })

//só para o body q vier em formato de URL
// ?q=lala&page=3
//extended para multi níveis {obj:{name: 1}}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.use(require('./route'));

//s caras de erro são os últimos middlewares
app.use(AppController.notFound);
app.use(AppController.handleError);



// app.listen(3000);
module.exports = app;