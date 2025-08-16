const { Pool } = require('pg');

const testConnection = async () => {
	const pool = new Pool({
		connectionString: 'YOUR_NEON_CONNECTION_STRING',
		ssl: { rejectUnauthorized: false }
	});

	try {
		const client = await pool.connect();
		console.log("Connected successfully!");
		await client.query('SELECT 1');
		client.release();
	} catch (err) {
		console.error("Connection failed:", err.message); // Capture detailed error
	} finally {
		await pool.end();
	}
};

testConnection();