const router = require('express').Router()
const { POST,GET,PUT,DELETE,FETCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/carousel')
    .post(checkToken,POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)


router.route('/carousel/:id')
    .get(FETCH)
module.exports = router