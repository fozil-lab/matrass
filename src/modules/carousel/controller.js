const model = require('./model')

const POST = async (req,res) => {
    const {title} = req.body
    const {file} = req.files
    console.log(file,title)
    if (file && title){
        let response = await model.insert(file,title)
        if (response){
            res.send({
                status:201,
                message: 'The data successfully created',
                data: response
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
    let response = await model.fetchCarousel()
    console.log(response)
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
    const {file} = req.files;
    const {id,title} = req.body
    let response = await model.updateCarousel(id,title,file)
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
    let response = await model.deleteCarousel(id)
    if (response){
        res.send({
            status:200,
            message: 'the data deleted',
        })
    }{
        res.send({
            status:400,
            message:'bad request'
        })
    }
}

const FETCH = async (req,res) => {
    const {id} = req.params
    if (id){
        let response = await model.fetchOne(id)
        if (response){
            res.send({
                status:200,
                message:'the carousel successfully fetched',
                data:response
            })
        }else{
            res.send({
                status:404,
                message:'the carousel not found'
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