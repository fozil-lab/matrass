const model = require('./model')


const POST = async (req,res) => {
    if (req.body != null){
        let response = await model.insert(req.body)
        if (response){
            res.send({
                status:201,
                message:'the data successfully created',
                data:await response
            })
        }else if (!response){
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}

const GET = async (req,res) => {
    const {page,limit} = req.query
   let orders = await model.fetchOrders(page,limit)
    if (orders){
        res.send({
            status:200,
            message:'all orders successfully fetched',
            data: orders
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const PUT = async (req,res) => {
    const {id} = req.params
    if (id){
        let response = await model.updateOrders(id)
        if (response){
            res.send({
                status:200,
                message:'the order active updated',
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}
module.exports = {
    POST,
    GET,
    PUT,
}