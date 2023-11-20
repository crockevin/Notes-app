const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const apiPAth = './db/db.json'
router.use(express.json())

router.get('/notes', (req, res) => {// loads saved noted
    fs.promises.readFile(apiPAth).then((data) => {
        console.log(JSON.parse(data))
        res.json(JSON.parse(data))// reads the db.json and the index.js loads it on notes.html
    })
})

router.post('/notes', (req, res) => {//adds note
    console.log(req.body)
    const {title, text, id} = req.body//breaks about info submitted toadd
    if(title && text){// checks to see if these data have value
        const note = { title, text, id: uuidv4()// makes a new variable with the data
        }
        console.log(note)
        fs.promises.readFile(apiPAth, 'utf8').then((data) => {
            const readFile = JSON.parse(data)
            readFile.push(note)// pushed the new note to add to the file
            fs.promises.writeFile(apiPAth, JSON.stringify(readFile, null, 4), (error) => {// writes the file with the new note
                if(error){
                    console.log(error)
                }
                console.log('note added')
            })
        })
    }
})

router.delete('/notes/:id', (req, res) => {//deletes note
    const noteId = req.params.id// gets note id
    fs.promises.readFile(apiPAth, 'utf8').then((data) => {
        const readFile = JSON.parse(data)
        const index = readFile.findIndex((note) => note.id == noteId)// finds the index of selected note to be deleted
        if(index !== -1){// checks to see if its there
            readFile.splice(index, 1)// removes it from the db.json
            fs.promises.writeFile(apiPAth, JSON.stringify(readFile, null, 4), (error) => {//writes new file without the deleted note
                if(error){
                    console.log(error)
                }
                console.log('note deleted')
            })
        }
    })
})
module.exports = router