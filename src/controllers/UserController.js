const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body

        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)


        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is remail"
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: "The password is equal confirmPassword"
            })
        }

        const result = await UserService.createUser(req.body)
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body)


        const { refresh_token, ...newReponse } = response

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })

        return res.status(200).json({ ...newReponse, refresh_token })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }

        console.log('user body ', data);

        const result = await UserService.updateUser(userId, data)
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        // const token = req.headers

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }

        const result = await UserService.deleteUser(userId)
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}
const getAllUser = async (req, res) => {
    try {


        const result = await UserService.getAllUser()
        return res.status(200).json(result)

    } catch (e) {
        return res.status(404).json({

            message: e.message
        })
    }
}

const detailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.detailUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
const refreshToken = async (req, res) => {
    try {
        // let token = req.headers.token.split(' ')[1]
        console.log('token cookieszzzz', req.cookies.refresh_token);

        const token = req.cookies.refresh_token

        console.log('token cookies', token);
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    detailUser,
    refreshToken,
    logoutUser
} 