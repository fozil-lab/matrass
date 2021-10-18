const {fetch,fetchAll} = require('../../lib/postgres')

const insert =(categoryName,active) => {
    try {
        let categories = fetch('insert into categories (category_name,active) values ($1,$2) RETURNING*',categoryName,active)
        return categories
    } catch (err){
        console.log(err)
    }
}

const fetchCategory = async () => {
    try {
        let response = await fetchAll('select * from categories where deleted = false')
        return response
    } catch (err) {
        console.log(err)
    }
}

const updateActive = async (id) => {
    let category = await fetch('update categories set active = NOT active where category_id = $1 RETURNING*',id)
    return category
}

const fetchOne = async (id) => {
    let category = await fetch('select * from categories where category_id = $1 and deleted = false',id)
    return category
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
        let category = await fetch('update categories set deleted = true where category_id = $1 RETURNING*',+id)
        return category
    } catch (err) {
        return err
    }
}

module.exports = {
    insert,
    fetchCategory,
    updateCategory,
    deleteCategory,
    updateActive,
    fetchOne
}