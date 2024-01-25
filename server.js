const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');


const app = express();
const PORT = 3001;

app.use(express.static('public'))

app.get('/', (res, req) => )