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

const fetchOrders = async (page,limit) => {
    try{
        page = (page-1)*limit
        let orders = await fetchAll(
            `select 
                    o.order_id,o.client_name,o.client_contact,
                    o.date,o.active,o.count,p.product_name
                   from orders o 
                   join products p
                   on o.product_id = p.product_id
                   order by o.order_id desc
                   offset $1 limit $2`,page,limit)
        for (let order of orders) {
            delete order.product_id
        }
        return orders
    } catch(err){
        console.log(err)
    }
}

const updateOrders = async (id) => {
    let order = await fetch('update orders set active = not active where order_id = $1 RETURNING*',id)
    return order
}

const orderSearch = async (clientName) => {
    let order = await fetch('select * from orders where client_name = $1',clientName)
    return order
}


module.exports = {
    insert,
    fetchOrders,
    updateOrders,
    orderSearch
}