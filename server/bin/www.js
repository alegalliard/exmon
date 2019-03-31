const app = require('../app');

//node multi thread
const cluster = require('cluster'); 
const numCpus = require('os').cpus().length; 

console.time();

//verifica se o worker morreu e sobre de novo

cluster.on('exit', (worker, code, signal) => {
	console.log('XXXXXXX\nWorker is dead', signal);
	//para matar o worker, kill PID no terminal
	/// ps aux | grep node
	// kill PID

	cluser.fork();
})

if(cluster.isMaster) {
	console.log(cluster.isMaster);
	console.log(`Você tem ${numCpus} CPUs \n\n`);
	//um processo para cada core da CPU
	//um worker para cada thread do processador
	//4 cores = 4 processos: 1 master e 3 workers fazendo load balance
	//
	//Forever ou PM2 é como o nodemon para produção. ( passar por ex: forever server/bin/www em produção)
	//rodar  os.cpus() no console do node
	for(let i = 0; i < numCpus; i++) {
		//se na hora de subir tiver um worker a menos, subir um novo worker
		//master não deve cair, senão a aplicação cai
		let workers = cluster.fork();
	}
} else {
app.listen(3000, () => {
	console.log('Server is up');
	console.timeEnd();
});
}

//ab: módulo de benchmark
//ab -n 1000 -c 100 http://localhost:3000
// pra instalar o ab precis do Apache