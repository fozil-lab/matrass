const router = require('express').Router()
const { POST,GET,PUT,DELETE,ACTIVE,SEARCH } = require('./controller.js')
const checkToken = require('../../middlewares/checkToken')
router.route('/calls')
    .post(POST)
    .get(GET)
    .put(checkToken,PUT)
    .delete(checkToken,DELETE)
    .patch(checkToken,ACTIVE)

router.route('/searchCalls')
    .get(SEARCH)

module.exports = router