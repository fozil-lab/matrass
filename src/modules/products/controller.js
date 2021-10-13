const model = require('./model')

const POST  = (req,res) => {
    const {file} = req.files
    if (req.body != null){
        let response = model.insert(file,req.body)
        if (response){
            res.send({
                status:201,
                message:'the date created'
            })
        }else{
            res.send({
                status:404,
                message:'something wrong'
            })
        }
    }
}

const GET = async (req,res) => {
    let response = model.fetchProducts()
    console.log(response)
    if (response){
        res.send({
            status:200,
            message:'the data successfully fetched',
            data:await response
        })
    }else{
        res.send({
            status:404,
            message:'something wrong'
        })
    }
}


const PUT = (req,res) => {
    const {file} = req.files

    if (req.body != null){
        let response = model.updateProducts(file,req.body)
        if (response){
            res.send({
                status:201,
                message:'the date updated'
            })
        }else{
            res.send({
                status:404,
                message:'something wrong'
            })
        }
    }
}

const DELETE = (req,res) => {
    const {id} = req.id
    if (id){
        let response = model.deleteProducts(id)
        if (response){
            res.send({
                status:201,
                message:'the date updated'
            })
        }else{
            res.send({
                status:404,
                message:'something wrong'
            })
        }
    }
}

const FETCH = async (req,res) => {
    const {id} = req.params
    if (id){
        let response = model.fetchOne(id)
        if (response){
            res.send({
                status:201,
                message:'the data successfully fetched',
                data:await response
            })
        }else{
            res.send({
                status:404,
                message:'something wrong'
            })
        }
    }
}

module.exports = {
    POST,
    GET,
    PUT,
    DELETE,
    FETCH
}