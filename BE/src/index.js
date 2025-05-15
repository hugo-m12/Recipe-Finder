const express = require('express')
const cors = require('cors')
const routes = require("./router/routes")
const adminRouter = require("./router/adminRouter")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api', routes)
app.use("/admin", adminRouter);

app.listen(port, function () {
	console.log(`Listening on port: ${port}`)
})
