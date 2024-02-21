//packages require
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid')

//file require
const noteData = require('./db/db.json');

//host
const app = express();
const PORT = 3001;

//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//Home page index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// /notes is notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// read and return the notes
app.get('/api/notes', (req, res) => {

    console.log(`${req.method} request received to get notes`);


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const parsedNotes = JSON.parse(data);
            res.status(200).json(parsedNotes)
        }
    })
});

// add new notes to db 
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} add note request`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid.v4()
        };
        //reads db and rewrites it with the new note
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null),
                    (err) =>
                        err
                            ? console.error(err)
                            : console.log('New Note added')
                );
            }
        });
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(200).json(response);
    } else {
        res.status(500).json('error');

    }
})

//get note by id
app.get('/api/notes/:id', (req, res) => {

    const id = req.params.id;

    fs.readFile('/db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const parsedNotes = JSON.parse(data);
            res.status(200).json(parsedNotes)
            const title = parsedNotes.json.filter((title) => title.id === id)
            const text = parsedNotes.json.filter((text) => text.id === id)
            const activeNote = { title, text }
            return activeNote.id;
        }
    })
})

//starts the application
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)

})