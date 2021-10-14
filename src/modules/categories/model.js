const {fetch,fetchAll} = require('../../lib/postgres')
const  path = require('path')
const  fs = require('fs')


const insert =(categoryName) => {
    try {
        let categories = fetch('insert into categories (category_name) values ($1) RETURNING*',categoryName)
        return categories
    } catch (err){
        console.log(err)
    }
}

const fetchCategory = async () => {
    try {
        let response = fetchAll('select * from categories where deleted = false')
        return response
    } catch (err) {
        console.log(err)
    }
}

const updateCategory = async (id,categoryName) => {
    try {
        let category = fetch('update categories set category_name = $1 where category_id = $2 RETURNING*',categoryName,id)
        return category
    } catch (err) {
        console.log(err)
    }

}

const deleteCategory = async (id) => {
    try{
        let category = await fetch('update categories set deleted = false where category_id = $1',id)
        return true
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    insert,
    fetchCategory,
    updateCategory,
    deleteCategory
}