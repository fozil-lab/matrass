const router = require('express').Router()
const { POST,GET,LOGIN } = require('./controller.js')


router.route('/users')
    .post( POST )
    .get(GET)

router.route('/login')
    .post(LOGIN)





module.exports = router