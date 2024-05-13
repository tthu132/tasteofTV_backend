const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {

    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication 1',
                status: 'ERROR'
            })
        }
        console.log(user.name);
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication 2',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {

    console.log('reqqq', req.headers.token.split(' ')[1]);
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    console.log('user', userId);
    console.log('user', req.params);

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(401).json({
                message: 'The authemtication 1',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(401).json({
                message: 'The authemtication 2',
                status: 'ERROR'
            })
        }
    });
}
//user?.isAdmin || user?.id === userId
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}