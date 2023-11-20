const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 3001
const { v4: uuidv4 } = require('uuid')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
    fs.promises.readFile('./db/db.json').then((data) => {
        console.log(JSON.parse(data))
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    const {title, text, id} = req.body
    if(title && text){
        const note = { title, text, id: uuidv4()
        }
        console.log(note)
        fs.promises.readFile('./db/db.json', 'utf8').then((data) => {
            const readFile = JSON.parse(data)
            readFile.push(note)
            fs.promises.writeFile('./db/db.json', JSON.stringify(readFile, null, 4), (error) => {
                if(error){
                    console.log(error)
                }
                console.log('note added')
            })
        })
    }

})

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id
    fs.promises.readFile('./db/db.json', 'utf8').then((data) => {
        console.log('test 1')
        const readFile = JSON.parse(data)
        const index = readFile.findIndex((note) => note.id == noteId)
        console.log('test 2')
        if(index !== -1){
            readFile.splice(index, 1)
            console.log('test 3')
            fs.promises.writeFile('./db/db.json', JSON.stringify(readFile, null, 4), (error) => {
                if(error){
                    console.log(error)
                }
                console.log('note deleted')
            })
        }
    })
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html')) 
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})



app.listen(PORT, () => {
    console.log(`live from ${PORT}`)
})
