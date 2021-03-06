const router = require('express').Router()
const { POST,GET,PUT,DELETE,ACTIVE,FETCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
const path = require("path");
router.route('/location')
    .post(checkToken,POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)

router.route('/location/:id')
    .get(FETCH)
module.exports = router