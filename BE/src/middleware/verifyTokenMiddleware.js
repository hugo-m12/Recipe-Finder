const jwtService = require("../services/jwt-service");

function verifyToken(req, res, next) {
    const authValue = req.get('authorization');
    if (!authValue) {
        res.status(400).end()
        return
    }
    const [type, token] = authValue.split(" ");
    if (type != "Bearer") {
        res.status(401).end()
        return
    }

    const tokenPayload = jwtService.verify(token)
    if (!tokenPayload) {
        res.status(401).end()
        return
    }
    next();
}
 

module.exports = verifyToken;