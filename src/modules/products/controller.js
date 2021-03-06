const model = require('./model')

const POST  = async (req,res) => {
    const {file} = req.files
    if (req.body != null){
        let response = await model.insert(file,req.body)
        if (response.product_id){
            res.send({
                status:201,
                message:'the data created'
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}

const GET = async (req,res) => {
    let response = await model.fetchProducts()
    console.log(response)
    if (response){
        res.send({
            status:200,
            message:'the data successfully fetched',
            data:response
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const SEARCH = async (req,res) => {
    const{productName} = req.query
    if (productName){
        let response = await model.searchProduct(productName)
        console.log(response)
        if (response){
            res.send({
                status:200,
                message:'the search product successfully completed',
                data:response
            })
        }else{
            res.send({
                status:404,
                message:"the product not found"
            })
        }
    }
}


const PUT = async (req,res) => {
    const {file} = req.files
    if (req.body != null){
        let response = await model.updateProducts(file,req.body)
        console.log(response)
        if (response){
            res.send({
                status:200,
                message:'the data updated'
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}

const DELETE = (req,res) => {
    const {id} = req.body
    if (id){
        let response = model.deleteProducts(id)
        if (response){
            res.send({
                status:200,
                message:'the data updated'
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}

const FETCH = async (req,res) => {
    const {id} = req.params
    if (id){
        let response = await model.fetchOne(id)
        if (response){
            res.send({
                status:200,
                message:'the data successfully fetched',
                data:response
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
    }
}

const ACTIVE = async (req,res) => {
    const {id} = req.body
        let response = await model.updateActive(id)
        if (response){
            res.send({
                status:200,
                message:'the product active successfully updated',
            })
        }else{
            res.send({
                status:400,
                message:'bad request'
            })
        }
}

module.exports = {
    POST,
    GET,
    PUT,
    DELETE,
    FETCH,
    ACTIVE,
    SEARCH
}