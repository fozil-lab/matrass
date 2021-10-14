const pg = require('pg')

const pool = new pg.Pool({
	connectionString: 'postgres://xxtzfrrp:Zx6TPrz_mjcxstIcVq4WHChjOQ38v6Jq@fanny.db.elephantsql.com/xxtzfrrp'
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
