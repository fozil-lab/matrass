const {fetch,fetchAll} = require('../../lib/postgres')


const insert = async ({experiance, clients, graduate, delivery}) => {
    let stats = await fetch(
        'insert into statistics (experiance,clients,graduate,deliveryd) values ($1,$2,$3,$4) RETURNING*',
        experiance,clients,graduate,delivery
    )
    return stats
}

const fetchStats = async () => {
    let stats = await fetchAll('select * from statistics')
    return stats
}

const fetchOne = async (id) => {
    let stats = await fetch('select * from statistics where id =$1',id)
    return stats
}

const updateStats = async ({id,experiance,clients,graduate,delivery}) => {
    let stats = await fetch(
        'update statistics set experiance = $1,clients = $2,graduate = $3,delivery = $4 where id =$5 RETURNING*',
        experiance,clients,graduate,delivery,id
    )
    return stats
}

module.exports = {
    insert,
    fetchStats,
    updateStats,
    fetchOne
}