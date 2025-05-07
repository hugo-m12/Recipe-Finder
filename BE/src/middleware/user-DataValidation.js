const validator = require('validator')

function validate(body) {
	const { email } = body

	if (!email) {
		return false
	}

	if (!validator.isEmail(email)) {
		return false
	}

	return true
}

function validateBody(req, res, next) {
	if (!validate(req.body)) {
		res.status(400).end()
		return
	}
	next()
}

module.exports = validateBody
