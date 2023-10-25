const express = require('express');
const fs = require('fs');
const path = require('path');
//const bodyParser = require('body-parser');
const DATA_FILE = path.join(__dirname,'mock-projects.json');
const app = express();

app.set('port', (process.env.PORT || 3002));

app.use('/',express.static(path.join(__dirname,'..','public')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.get('/test',(req, res) => {
    res.json({
        'test': 1
    });
});

app.get('/projects',(req, res) => {
    fs.readFile(DATA_FILE, (err,data) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(JSON.parse(data));
    })
})

app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
})