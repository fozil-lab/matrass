const pg = require('pg')

const pool = new pg.Pool({
	user: 'postgres',
	password: 'fozil2003',
	port: 5432,
	host: 'localhost',
	database: 'matras'
})


const fetchAll = async (query, ...params) => {
	const client = await pool.connect()
	try {
		let { rows } = await client.query(query, params ? params : null)
		return rows
	} catch(err) {
		console.log(err)
	} finally {
		await client.release()
	}
}

const fetch = async (query, ...params) => {
	const client = await pool.connect()
	try {
		let { rows: [ row ] } = await client.query(query, params ? params : null)
		return row
	} catch(err) {
		console.log(err)
	} finally {
		await client.release()
	}
}


module.exports = { fetch, fetchAll }
