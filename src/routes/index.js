const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProductCategory = require('./ProductCategoryRouter')
const ImageRouter = require('./ImageRouter')
const OrderRouter = require('./OrderRouter')
const CardRouter = require('./CardRouter')
const BlogRouter = require('./BlogRouter')
const CommentRouter = require('./CommentRouter')






const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/product-category', ProductCategory)
    app.use('/api/image', ImageRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/card', CardRouter)
    app.use('/api/blog', BlogRouter)
    app.use('/api/comment', CommentRouter)




}
module.exports = routes