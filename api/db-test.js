import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false, },
});

export default async function handler(req, res) {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT NOW()");
		client.release();

		res.status(200).json({
		message: "Connected to Neon DB 🚀",
		time: result.rows[0],
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database connection failed" });
	}
}
