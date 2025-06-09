const userService = require('../services/user-service')
const jwtService = require("../services/jwt-service")

async function findAllUsers(req, res) {
	const result = await userService.findAllUsers()
	res.json(result)
}

async function findUserById(req, res) {
	const id = req.params.id

	const result = await userService.findUserById(id)

	if (result) {
		res.json(result)
	} else {
		res.status(404).end()
	}
}

async function createUser(req, res) {
	const userData = req.body

	const result = await userService.createUser(userData)

	if (result) {
		res.json('User Created')
	} else {
		res.status(404).end()
	}
}

async function postLogin(req, res) {
    const { email, password } = req.body;
    const user = await userService.userAuth(email, password);
    if (!user) {
        res.status(401).end();
    }
    const token = jwtService.sign(user);
    res.json({
        token
    })
}
	
module.exports = {
	findAllUsers,
    createUser,
    findUserById,
    postLogin
}