const model = require('./model')


const POST = async (req,res) => {
    const {phoneNumber} = req.body
    if (phoneNumber){
        let response = await model.insert(phoneNumber)
        if (response){
            res.send({
                status:201,
                message: 'The data successfully created',
                data:response
            })
        }
    }else{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const GET = async (req,res) => {
    const {page,limit} = req.query
    let response = await model.fetchCalls(page,limit)
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
    const {id,phoneNumber} = req.body
    let response = await model.updateCalls(id,phoneNumber)
    if (response){
        res.send({
            status:200,
            message: 'the data updated',
            data:response
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
    let response = await model.deleteCalls(id)
    if (response){
        res.send({
            status:200,
            message: 'the data deleted',
        })
    }else{
        res.send({
            status:400,
            message:'bad request'
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

const SEARCH = async (req,res) => {
    const  {phoneNumber} = req.query
    if (phoneNumber){
        let response = await model.callsSearch(phoneNumber)
        if (response){
            res.send({
                status:200,
                message:"the search calls successfully completed",
                data:response
            })
        }else{
            res.send({
                status:404,
                message:'the calls not found'
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
    SEARCH
}