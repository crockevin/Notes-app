const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const apiPath = require('../db/db.json')

router.get('/notes', (req, res) => {
    fs.promises.readFile(apiPath).then((data) => {
        console.log(JSON.parse(data))
        res.json(JSON.parse(data))
    })
})

router.post('/notes', (req, res) => {
    const {title, text, id} = req.body
    if(title && text){
        const note = { title, text, id: uuidv4()
        }
        console.log(note)
        fs.promises.readFile(apiPath, 'utf8').then((data) => {
            const readFile = JSON.parse(data)
            readFile.push(note)
            fs.promises.writeFile(apiPath, JSON.stringify(readFile, null, 4), (error) => {
                if(error){
                    console.log(error)
                }
                console.log('note added')
            })
        })
    }
})

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id
    fs.promises.readFile(apiPath, 'utf8').then((data) => {
        const readFile = JSON.parse(data)
        const index = readFile.findIndex((note) => note.id == noteId)
        if(index !== -1){
            readFile.splice(index, 1)
            fs.promises.writeFile(apiPath, JSON.stringify(readFile, null, 4), (error) => {
                if(error){
                    console.log(error)
                }
                console.log('note deleted')
            })
        }
    })
})
module.exports = noteApi