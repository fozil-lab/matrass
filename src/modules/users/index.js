const router = require('express').Router()
const { POST,GET,LOGIN,PUT,DELETE } = require('./controller.js')


router.route('/users')
    .post(POST)
    .get(GET)
    .put(PUT)
    .delete(DELETE)

router.route('/login')
    .post(LOGIN)





module.exports = router