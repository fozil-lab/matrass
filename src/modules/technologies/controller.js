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
                message:"bad request"
            })
        }
    }
}

const GET = async (req,res) => {
    let technology = await model.fetchTechnology()
    if (technology){
        res.send({
            status:200,
            message:'all technology successfully fetched',
            data: technology
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const PUT = async (req,res) => {
    if (req.body != null){
        let response = await model.updateTechnology(req.body)
        if (response){
            res.send({
                status:200,
                message:'the technology updated',
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
        let response = model.deleteTechnology(id)
        if (response){
            res.send({
                status:200,
                message:'the data successfully deleted',
            })
        }else if (!response){
            res.send({
                status:400,
                message:"bad request"
            })
        }
    }
}

const FETCH = async (req,res) => {
    const {id} = req.params
    if (req.params.id){
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
    if (req.body.id){
        let response = await model.updateActive(req.body.id)
        if (response){
            res.send({
                status:200,
                message:'the data active successfully updated',
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