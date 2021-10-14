const model = require('./model')
const {sign,verify} = require('jsonwebtoken')

const POST = (req,res) => {
    const {file} = req.files
    if (file && req.body != null){
        let response = model.insert(file,req.body)
        if (response){
            res.send({
                status:201,
                message:'the data created'
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
    let response = model.fetchUsers()
    if (response){
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
}

const LOGIN = async (req,res) => {
    try {
        const {username,password} = req.body
        if (username && password){
            let response = await model.Login(username,password)
            let token = sign({userId:response.user_id},'MyNaMeIsFoZiL')
            if (response.user_id){
                res.send({
                    status:200,
                    message:'you successfully logged in',
                    data:response,
                    token:token,
                })
            }else{
                res.send({
                    status:404,
                    message:"usrname or password wrong"
                })
            }
        }
    }catch (err) {
        console.log(err)
    }
}

const PUT = async (req,res) => {
    const {file} = req.files
    console.log(req.body)
    if (file && req.body != null){
        let response = await model.updateUser(file,req.body)
        console.log(response)
        if (response){
            res.send({
                status:200,
                message:'the data updated',
            })
        }else{
            res.send({
                status:404,
                message:'something wrong'
            })
        }
    }
}

const DELETE = async (req,res) => {
    let response = await model.deleteUser(req.body.id)
    if (response){
        res.send({
            status:200,
            message:'the data deleted',
        })
    }else{
        res.send({
            status:404,
            message:'something wrong'
        })
    }
}

module.exports = {
    POST,
    GET,
    LOGIN,
    PUT,
    DELETE
}