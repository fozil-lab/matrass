const {fetch,fetchAll} = require('../../lib/postgres')

const insert = async (phoneNumber) => {
    try {
        let response = await fetch('insert into calls (phone_number) values ($1) RETURNING*',phoneNumber)
        return response
    } catch (err) {
        console.log(err)
    }
}

const fetchCalls = async () => {
    let calls = await fetchAll('select * from calls where deleted = false')
    return calls
}

const updateActive = async (id) => {
    let calls = await fetch('update calls set active = NOT active where id = $1 RETURNING*',id)
    return calls
}

const updateCalls = async (id,phoneNumber) => {
    try {
        let calls = await fetch('update calls set phone_number = $2 where id = $1 RETURNING*',id,phoneNumber)
        return calls
    } catch (err) {
        console.log(err)
    }
}

const deleteCalls = async (id) => {
    try{
        let calls = await fetch('update calls set deleted = true where id = $1 RETURNING*',id)
        return calls
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    insert,
    fetchCalls,
    updateCalls,
    deleteCalls,
    updateActive
}