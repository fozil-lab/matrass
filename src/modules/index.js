const carouselRouter = require('./carousel')
const callsRouter = require('./calls')
const productsRouter = require('./products')
const usersRouter = require('./users')
const ordersRouter = require('./orders')

module.exports = [
    carouselRouter,
    callsRouter,
    productsRouter,
    usersRouter,
    ordersRouter
]