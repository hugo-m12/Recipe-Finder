const { ObjectId } = require('mongodb')

function validateId(req, res, next) {
	const id = req.params.id

	if (!ObjectId.isValid(id)) {
		res.status(400).end('Invalid id')
		return
	}
	req.id = id
	next()
}

module.exports = validateId
