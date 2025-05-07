const router = require("express").Router();
const adminController = require("../controllers/adminController");

const verifyToken = require("../middleware/verifyTokenMiddleware");

router.get("/", verifyToken, adminController.getIndex)

module.exports = router;