require("dotenv").config();
var axios = require("axios")
var keys = require("./keys.js");

// omdb variables
var movieName = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// bands in town var
var bandName = process.argv[2]
var bandsInTown ="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// spotify variables
var spotify = new Spotify(keys.spotify);
