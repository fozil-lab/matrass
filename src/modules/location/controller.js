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
    let location = await model.fetchLocation()
    if (location){
        res.send({
            status:200,
            message:'all location successfully fetched',
            data: location
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
        let response = await model.updateLocation(req.body)
        if (response){
            res.send({
                status:200,
                message:'the location updated',
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
        let response = model.deleteLocation(id)
        if (response){
            res.send({
                status:200,
                message:'the location deleted',
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
    DELETE
}