const router = require('express').Router()
const { POST,GET,PUT,DELETE } = require('./controller.js')
const {FETCH} = require("./controller");

router.route('/products')
    .post( POST )
    .get( GET )
    .put(PUT)
    .delete(DELETE)

router.route('/products/:id')
    .get(FETCH)


module.exports = router