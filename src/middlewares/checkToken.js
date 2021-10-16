const {verify} = require('jsonwebtoken')
const {fetch} = require('../lib/postgres')

const checkToken = async (req,res,next) => {
    if (req.method == 'GET'){
        next()
    }else{
        if (req.body.token){
            const {token} = req.body
            let verifyToken = verify(token,'MyNaMeIsFoZiL')
            if (verifyToken.userId){
                const {userId} = verifyToken
                let user = await fetch('select * from users where user_id = $1',userId)
                if (user.user_id){
                    next()
                }else{
                    res.send({
                        status:404,
                        message:'user not found'
                    })
                }
            }else {
                res.send({
                    status:400,
                    message:'your token not authorized'
                })
            }
        }else{
            res.send({
                status:400,
                message:'you have not token'
            })
        }
    }
}

module.exports = checkToken