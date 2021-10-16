const router = require('express').Router()
const { POST,GET,PUT,DELETE } = require('./controller.js')
const {FETCH} = require("./controller");
const checkToken = require('../../middlewares/checkToken')
router.route('/products')
    .post(checkToken,POST)
    .get( GET )
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)

router.route('/products/:id')
    .get(FETCH)


module.exports = router