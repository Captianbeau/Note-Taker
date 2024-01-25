const express = require('express');
const path = require('path');
const fs = require('fs')
const noteData = require('./db/db.json');
const api = require('./public/assets/js/index.js')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', api);

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (res,req) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes',(res,req) => {
fs.readFile('./db/db.json', 'utf8', (err,data) =>{
    if(err){
        console.error(err);
    }else {
       const parsedNotes = json.parse(data);

        return parsedNotes;
    }
})
});

app.post('/api/notes', )