const router = require('express').Router();
const fs = require('fs');
let database = require('../../db/db.json');

router.get('/notes', (req, res) => {
    database = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'))
    res.json(database)
});

router.post('/notes', (req, res) => {
    let noteModel = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random()* 100)
    }
    database.push(noteModel)
    fs.writeFileSync('./db/db.json', JSON.stringify(database))
    //sends response
    res.json(database)
});

router.delete('/notes/:id', (req, res) => {
    let keep = []
    for (var i = 0; i < database.length; i++) {
        if (database[i].id != req.params.id) {
            keep.push(database[i])
        }
    }
    database = keep;
    fs.writeFileSync('./db/db.json', JSON.stringify(database))
    res.json(database)
});

module.exports = router;