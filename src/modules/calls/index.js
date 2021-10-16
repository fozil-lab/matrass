const router = require('express').Router()
const { POST,GET,PUT,DELETE } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/calls')
    .post(POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)
module.exports = router