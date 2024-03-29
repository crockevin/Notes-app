const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const api = require('./routes/api')
const PORT = process.env.PORT || 3001

app.use('/api', api)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html')) //loads note.html
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))//loads index.html
})

app.listen(PORT, () => {
    console.log(`live from ${PORT}`)//shows that server is online
})
