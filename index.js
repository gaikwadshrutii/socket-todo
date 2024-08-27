const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { app, httpServer } = require("./socket/socket")
require("dotenv").config()

// const app = express()

// step 1 middelwere
app.use(express.json())
app.use(express.static("dist"))
app.use(cors({ origin: true, credentials: true }))
// step 2 route
app.use("/api/notes", require("./routes/todo.route"))
// step 3 404
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found 404" })
})
// step 4 error handler
app.use("*", (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
// step 5 connection
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    httpServer.listen(process.env.PORT, console.log("SERVER RUNNING")
    )

})
