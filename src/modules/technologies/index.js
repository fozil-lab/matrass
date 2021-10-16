const router = require('express').Router()
const { POST,GET,PUT,DELETE } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/technology')
    .post(checkToken,POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)
module.exports = router