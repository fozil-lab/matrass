const router = require('express').Router()
const { POST,GET,PUT } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
const {SEARCH} = require("../orders/controller");
router.route('/orders')
    .post(POST)
    .get(GET)

router.route('/orderSearch')
    .get(SEARCH)

router.route('/orders/:id')
    .put(checkToken,PUT)
module.exports = router