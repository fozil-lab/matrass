const {fetch,fetchAll} = require('../../lib/postgres')


const insert = async ({name, description,poster,video,active}) => {
    let technology = await fetch(
        'insert into technologies (name,description,poster_link,video_link,active) values ($1,$2,$3,$4,$5) RETURNING*',
        name,description,poster,video,active
    )
    return technology
}

const fetchTechnology = async () => {
    let technology = await fetchAll('select * from technologies where deleted = false')
    return technology
}

const updateTechnology = async ({id,name,description,poster,video}) => {
    let technology = await fetch(
        'update technologies set name = $1,description = $2,poster = $3,video = $4 where id =$5 RETURNING*',
        name,description,poster,video,id
    )
    return technology
}

const updateActive = async (id) => {
    let technology = await fetch('update technologies set active = not active where id = $1 RETURNING*',id)
    return technology
}

const deleteTechnology = async (id) => {
    let technology = await fetch('update technologies set deleted = true where id = $1 RETURNING*',id)
    return technology
}

const fetchOne = async(id) => {
    let response = await fetch(`select * from technologies where id = $1 and deleted = false`,id)
    return response
}

module.exports = {
    insert,
    fetchTechnology,
    updateTechnology,
    deleteTechnology,
    updateActive,
    fetchOne
}