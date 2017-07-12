"use strict";

// imports
const restify = require('restify');
const RedisManager = require('./redis_management');
const log4js = require('log4js');

// runtime config
const log = log4js.getLogger('server');
log4js.configure({
	appenders: { out: { type: 'stdout'}},
	categories: { default: { level: 'info', appenders:[ 'out' ] }}
});

// begin module
RedisManager.instances.ms_1.start();
RedisManager.instances.ms_2.start();
RedisManager.instances.sentinel_1.start();
RedisManager.instances.sentinel_2.start();
RedisManager.instances.sentinel_3.start();

// @todo: Add Rest API for managing the Redis HA cluster