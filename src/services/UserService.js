const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, avatar } = newUser
        try {

            const checkUser = await User.findOne({
                email: email
            })
            if ((checkUser !== null)) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }

            const hash = bcrypt.hashSync(password, 10)

            const createUser = await User.create({
                name, email, password: hash, phone, avatar

            })

            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }

        } catch (e) {
            reject(e)
        }

    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                data: checkUser
            })
        } catch (e) {
            reject(e.message)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {

            const checkUser = await User.findOne({
                _id: id
            })

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            console.log('update uer', updateUser);


            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser,
                data

            })


        } catch (e) {
            console.log(e.message);
            reject(e)
        }

    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUser = await User.findOne({
                _id: id
            })

            await User.findByIdAndDelete(id)
            console.log('delete uer', deleteUser);
            resolve({
                status: 'OK',
                message: 'delete user SUCCESS',
            })

        } catch (e) {
            console.log(e.message);
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {

        try {

            const data = await User.find()

            resolve({
                status: 'OK',
                message: 'delete user SUCCESS',
                data
            })

        } catch (e) {
            console.log(e.message);
            reject(e)
        }
    })
}
const detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e.message)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    detailUser
}