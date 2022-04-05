const redis = require('redis');
const { promisify } = require('util');
const { REDIS_URL } = require('../util/config');
const config = require('../util/config');


let getAsync;
let setAsync;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled');
    return null;
  }
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  const client = redis.createClient({
    url: REDIS_URL
  });

  // If the values are wanted to be refreshed on each restart:
  // client.set(config.REDIS_ID_TODO_COUNT, Number.NaN);

  getAsync = promisify(client.get).bind(client);
  setAsync = promisify(client.set).bind(client) ;
}

module.exports = {
  getAsync,
  setAsync
}