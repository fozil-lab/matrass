const carouselRouter = require('./carousel')
const callsRouter = require('./calls')
const productsRouter = require('./products')
const usersRouter = require('./users')
const ordersRouter = require('./orders')
const categoriesRouter = require('./categories')
const locationRouter = require('./location')
const technologiesRouter = require('./technologies')
const statisticsRouter = require('./statistics')

module.exports = [
    carouselRouter,
    callsRouter,
    productsRouter,
    usersRouter,
    ordersRouter,
    categoriesRouter,
    technologiesRouter,
    locationRouter,
    statisticsRouter
]