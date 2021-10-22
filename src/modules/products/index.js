const router = require('express').Router()
const { POST,GET,PUT,DELETE,ACTIVE,SEARCH } = require('./controller.js')
const {FETCH} = require("./controller");
const checkToken = require('../../middlewares/checkToken')
router.route('/products')
    .post(checkToken,POST)
    .get( GET )
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)
    .patch(checkToken,ACTIVE)

router.route('/productSearch')
    .get(SEARCH)

router.route('/products/:id')
    .get(FETCH)


module.exports = router