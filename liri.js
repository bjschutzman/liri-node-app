// requires .env file
var Dotenv = require("dotenv").config();
var Axios = require("axios");
var Moment = require("moment");
var fs = require("fs");

// stores keys.js in variable
var keys = require("./keys.js");

require
// requires spotify and sets up new contructor
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

var nodeArg  = process.argv

var userInput = ""


// for (var i = 3; i < nodeArg.length; i++){

// }

spotify
  .search({ 
    type: 'track',
    query: userInput })
    
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });