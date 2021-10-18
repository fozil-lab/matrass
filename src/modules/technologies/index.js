const router = require('express').Router()
const { POST,GET,PUT,DELETE,ACTIVE,FETCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/technology')
    .post(checkToken,POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE).
    patch(checkToken,ACTIVE)

router.route('/technology/:id')
    .get(checkToken,FETCH)
module.exports = router