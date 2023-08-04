const express = require('express')
const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.send(200)
})

app.listen(3000, () => {
    console.log("Server is running.")
})