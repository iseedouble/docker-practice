const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/', (req, res) => { 
    fetch('http://java:4000/greeting')
        .then(res => res.json())
        .then(json => res.send('id: ' + json.id))
        .catch(err => console.log(err));
});

app.listen(port, () => 'Listening to server Marcus');
