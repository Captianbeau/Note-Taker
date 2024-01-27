const express = require('express');
const path = require('path');
const fs = require('fs')
const noteData = require('./db/db.json');
const api = require('./public/assets/js/index.js')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (res, req) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (res, req) => {

    res.json(`${req.method} request received to get reviews`);

    fs.readFile(noteData, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            const parsedNotes = json.parse(data);
            res.status(200).json('success')
            return parsedNotes;
        }
    })
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} add note request`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: randomUUID()
        };

        fs.readFile(noteData, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(noteData, JSON.stringify(parsedNotes, (err) =>
                    err
                        ? console.error(err)
                        : console.log('New Note added')
                ));
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

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)

})