const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const kenx = require('knex');

const register = require('./controllers/register');
const singin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = kenx({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working!')})

app.post('/signin', (req, res) => {singin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApi(req, res)})



// // // Load hash from your password DB.

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is ruunign on port ${process.env.PORT}`);
});
