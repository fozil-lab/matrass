const model = require('./model')
const {sign,verify} = require('jsonwebtoken')

const POST = (req,res) => {
    const {file} = req.files
    if (file && req.body != null){
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
    let response = model.fetchUsers()
    if (response){
        if (response){
            res.send({
                status:200,
                message:'the date created',
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
    const {username,password} = req.body
    console.log(username,password)
    if (username && password){
        let response = await model.Login(username,password)
        console.log(response)
        let token = sign({id:response.user_id},'MyNaMeIsFoZiL')
        if (response){
            res.send({
                status:200,
                message:'you successfully logged in',
                data:response,
                token:token,
            })
        }else{
            res.send({
                status:404,
                message:'username or password wrong'
            })
        }
    }
}

module.exports = {
    POST,
    GET,
    LOGIN
}