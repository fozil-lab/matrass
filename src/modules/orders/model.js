const {fetch,fetchAll} = require('../../lib/postgres')


const insert = async ({product,clientContact,clientName,count}) => {
    let productId = await fetch('select product_id from products where product_name = $1',product)
    let order = fetch(
        'insert into orders (product_id,client_contact,client_name,count) values ($1,$2,$3,$4) RETURNING*',
               productId.product_id,clientContact,clientName,count
    )
    console.log(await order)
    return order
}


module.exports = {
    insert
}