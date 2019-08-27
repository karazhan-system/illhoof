const bluebird = require('bluebird')
const redis = require('redis')
const config = require('../app.config')

bluebird.promisifyAll(redis)

const client = redis.createClient({ 
  host: config.redis 
})

module.exports = client