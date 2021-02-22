const { response, request } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const e = require('express');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'austejamatuzaite',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send(db.users);
})


//SIGN IN
app.post('/signin', signin.handleSignin(db, bcrypt));


//REGISTER
app.post('/register', register.handleRegister(db, bcrypt));


//USER ID
app.get('/profile/:id', profile.handleProfileGet(db));


//ENTRIES
app.put('/image', (request, response) => { image.handleImage(request, response, db) });

app.post('/imageurl', (request, response) => { image.handleApiCall(request, response) });


app.listen(3000, () => {
  console.log('it is running');
})

