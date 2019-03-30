const app = require('../app');

console.time();

app.listen(3000, () => {
	console.log('Server is up');
	console.timeEnd();
});