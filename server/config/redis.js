const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const client = redis.createClient({
	host: '10.0.2.166',
	port: 6379
});

module.exports = client;