const express = require('express');
const fetch = require('node-fetch');
const faker = require('faker');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db;
const url = 'mongodb://root:example@mongo:27017/';

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to database");
    db = client.db('test');
    app.listen(port, () => 'Listening to server Marcus');
});

app.get('/', (req, res) => {
    res.send('Hello, Marcus! This is World.');
});

app.get('/java', (req, res) => {
    fetch('http://java:4000/greeting')
        .then(res => res.json())
        .then(json => res.send('id: ' + json.id))
        .catch(err => console.log(err));
});

app.get('/mongo', (req, res) => {
    db.collection('users').find({}).toArray()
    .then(data => res.send(data))
    .catch((err) => console.log(err));
})

// app.get('/fill/:nb', (req, res) => {
//     const usersArray = new Array(parseInt(req.params.nb)).fill(null).map(() => ({
//         title: faker.name.title(),
//         firstName: faker.name.firstName(),
//         lastName:  faker.name.lastName(),
//         job: faker.name.jobTitle(),
//         phoneNumber: faker.phone.phoneNumber(),
//         address: faker.address.streetAddress(),
//         countryCode: faker.address.countryCode(),
//         price: faker.commerce.price(),
//         department: faker.commerce.department(),
//         amount: faker.finance.amount(),
//         biography: faker.lorem.paragraph(),
//         avatar: faker.image.avatar(),
//         email: faker.internet.email(),
//         username: faker.internet.userName(),
//         password: faker.internet.password(),
//         ip: faker.internet.ip()

//     }));
//     db.collection('users').insertMany(usersArray)
//         .then((data) => res.send(data));
// })
