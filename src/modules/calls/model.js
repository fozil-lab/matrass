const {fetch,fetchAll} = require('../../lib/postgres')
const {LOGIN} = require("../users/controller");

const insert = async (phoneNumber) => {
    try {
        let response = await fetch('insert into calls (phone_number) values ($1) RETURNING*',phoneNumber)
        return response
    } catch (err) {
        console.log(err)
    }
}

const fetchCalls = async (page,limit) => {
    page=(page-1)*limit
    let calls = await fetchAll('select * from calls where deleted = false order by id desc offset $1 limit $2',page,limit)
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

const callsSearch = async (phoneNumber) => {
    phoneNumber = '+' + phoneNumber.trim()
    let calls = await fetch('select * from calls where phone_number = $1',phoneNumber)
    return calls
}


module.exports = {
    insert,
    fetchCalls,
    updateCalls,
    deleteCalls,
    updateActive,
    callsSearch
}