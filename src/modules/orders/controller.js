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
                status:404,
                message:"something wrong"
            })
        }
    }
}

const GET = async (req,res) => {

}

const PUT = async (req,res) => {

}

const DELETE = async (req,res) => {

}

module.exports = {
    POST,
    GET,
    PUT,
    DELETE
}