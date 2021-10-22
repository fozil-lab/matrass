const router = require('express').Router()
const { POST,GET,PUT,FETCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/stats')
    .post(checkToken,POST)
    .get(GET)
    .put(checkToken,PUT)

router.route('/stats/:id')
    .get(FETCH)
module.exports = router