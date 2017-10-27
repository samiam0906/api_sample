const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const ejs = require('ejs');
app.set('view engine', 'ejs');
var request = require('request');

app.use(express.static('public'))

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[environment];
const knex = require('knex')(knexConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req,res,next){
  var API_KEY = 'KV3cK7gANzCXl5g5gy2vUrHAxdnTxKfa';
  var user = 'j3concepts';

  request('https://api.behance.net/v2/users/'+user+'/projects?client_id='+API_KEY, function (error, response, body) {
    var response = JSON.parse(body)
    var projects = response.projects;
    res.render('index', {projects})
  });

})
app.listen(8000, function(){
  console.log('You are listening to port 8000...')
})
