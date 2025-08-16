const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {

	let client;

	console.log('Connecting to the database...');

	console.log('DATABASE_URL:', process.env.DATABASE_URL);

	if (!process.env.DATABASE_URL) {
		return res.status(500).json({ error: 'DATABASE_URL is not set' });
	}

	try {
		client = await pool.connect();
		const result = await client.query('SELECT NOW() as now');
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Database connection failed', details: err.message });
	} finally {
		if (client) client.release();
	}
};