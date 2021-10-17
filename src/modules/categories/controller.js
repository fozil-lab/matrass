const model = require('./model')

const POST = async (req,res) => {
    const {categoryName,active} = req.body
    if (categoryName){
        let response = await model.insert(categoryName,active ? active : true)
        if (response){
            res.send({
                status:201,
                message: 'The data successfully created',
                data: await response
            })
        }
    }else{
        res.send({
            status:400,
            message:"bad request"
        })
    }
}

const GET = async (req,res) => {
    let response = await model.fetchCategory()
    if (response){
        res.send({
            status:200,
            message: 'successfully fetched',
            data:response
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const PUT = async (req,res) => {
    const {id,categoryName} = req.body
    let response = await model.updateCategory(id,categoryName)
    if (response){
        res.send({
            status:200,
            message: 'the data updated',
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const DELETE = async (req,res) => {
    const {id} = req.body
    let response = await model.deleteCategory(id)
    if (response){
        res.send({
            status:200,
            message: 'the data deleted',
            data:await response
        })
    }{
        res.send({
            status:400,
            message:'bad request',
        })
    }
}

const ACTIVE = async (req,res) => {
    const {id} = req.body
    if (id){
        let response = await model.updateActive(id)
        if (response){
            res.send({
                status:200,
                message: 'the data active updated',
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
                message:'the category successfully fetched',
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

module.exports = {
    POST,
    GET,
    PUT,
    DELETE,
    ACTIVE,
    FETCH
}