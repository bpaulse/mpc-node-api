const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
	rejectUnauthorized: false
	}
});

module.exports = async (req, res) => {

	let client;
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