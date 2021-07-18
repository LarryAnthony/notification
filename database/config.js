const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS,
	port: 5432
});

const poolEnv = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'notification',
	password: 12345678,
	port: 5432
});

module.exports = {
	pool,
	poolEnv
}