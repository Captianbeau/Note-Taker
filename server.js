const express = require('express');
const path = require('path');
const fs = require('fs')
const noteData = require('./db/db.json');


const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (res,req) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes',(res,req) => res.json(noteData));