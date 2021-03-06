const router = require('express').Router()
const { POST,GET,PUT,DELETE,ACTIVE,FETCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')

router.route( '/categories')
    .post( checkToken,POST )
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)
    .patch(checkToken,ACTIVE)


router.route('/categories/:id')
    .get(FETCH)
module.exports = router