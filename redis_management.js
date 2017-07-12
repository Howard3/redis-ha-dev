"use strict";

// import node modules
const path = require('path');
const shelljs = require('shelljs');
const log4js = require('log4js');
const Promise = require('bluebird');

// begin module
class RedisManager {
	constructor(sentinel, number) {
		const sentinel_stub = sentinel ? 'sentinel.' : '';

		this.filename = path.join(process.cwd(), 'config', `redis.${sentinel_stub}${number}.conf`);
		this.log = log4js.getLogger(`RedisManager ${sentinel_stub}${number}`);
		this.is_sentinel = sentinel;
	}

	start() {
		this.log.info('Starting server');
		let command = `redis-server ${this.filename}`;

		if (this.is_sentinel) command += ' --sentinel';

		this.child_process = shelljs.exec(command, {async: true, silent: true});
		this.child_process.stdout.on('data', (data) => this.log.info(data));
		this.child_process.stderr.on('data', (data) => this.log.error(data));
		return Promise.resolve();
	}

	kill() {
		this.log.info('killing');

		return shelljs.exec(`kill -9 ${this.child_process.pid}`);
	}
}

const instances = {
	ms_1: new RedisManager(false, 1),
	ms_2: new RedisManager(false, 2),
	sentinel_1: new RedisManager(true, 1),
	sentinel_2: new RedisManager(true, 2),
	sentinel_3: new RedisManager(true, 3)
};

module.exports = { RedisManager, instances };