const {verify} = require('jsonwebtoken')
const {fetch} = require('../lib/postgres')

const checkToken = async (req,res,next) => {
    console.log(req.body)
        if (req.body.token){
            const {token} = req.body
            let verifyToken = verify(token,'MyNaMeIsFoZiL')
            if (verifyToken.userId){
                const {userId} = verifyToken
                let user = await fetch('select * from users where user_id = $1',userId)
                if (user){
                    next()
                }else{
                    res.send({
                        status:404,
                        message:'user not found'
                    })
                }
            }else {
                res.send({
                    status:403,
                    message:'your have not permission'
                })
            }
        }else{
            res.send({
                status:401,
                message:'you must be logged in'
            })
        }
}

module.exports = checkToken