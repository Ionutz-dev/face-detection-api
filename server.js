const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'HatzJohn',
    database: 'smart-brain',
  },
});

db.select('*')
  .from('users')
  .then(data => {
    // console.log(data);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Success');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiKey(req, res);
});

app.listen(3001, () => {
  console.log('app is running on port 3001');
});

/*
/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = new user
/profile/:userId --> GET = user 
/image --> PUT = updated user
*/
