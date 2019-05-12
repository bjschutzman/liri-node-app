// requires .env file
 require("dotenv").config();

// required files
var axios = require("axios");
var fs = require("fs");
var request = require("request");
var keys = require("./key");
var Spotify = require("node-spotify-api");
var omdb = require("omdb");
// spotify search creating new spotify call
var spotify = new Spotify(keys.spotify);
// take in which "this" the user inputs and then what search they want to make
var search = process.argv[2];
var userInput = process.argv.splice(3).join(" ");





// appends user input search to searchlog.txt
function append(){
  fs.appendFile("log.txt", userInput + ", ", function(err){});
}

// function which searches a concert and returns venue, location, and date.
function concertThis() {
  axios
    .get("https://rest.bandsintown.com/artists/" + search +"/events?app_id=codingbootcamp")
    .then(function(response) {
      var concert = response.data[0];
      console.log("Venue: " + concert.venue.name + "\n");
      console.log("Location: " + concert.venue.city + ", " + concert.venue.region + "\n" );
      var datetime = concert.datetime;
      var year = datetime.substring(0, 4);
      var month = datetime.substring(5, 7);
      var day = datetime.substring(8, 10);
      console.log(
        "Date of the Event: " + month + "/" + day + "/" + year + "\n"
      );
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
    });
  append();
}

// spotify function
function spotifyThis(){
  spotify
  // takes in parameters for search
  .search({ type: "track", query: userInput, limit: 1 })
    .then(function(response) {
      // variables for response data
      var artist = response.tracks.items[0].artists[0].name;
      var album = response.tracks.items[0].album.name;
      var link = response.tracks.items[0].artists[0].external_urls.spotify;
      // log out what we want returned
      console.log("--------Song Search-------\n");
      console.log("Song: " + search);
      console.log("Artist: " + artist);
      console.log("Album: " + album);
      console.log("Preview Link: " + link);
      console.log("--------Song Search-------\n");
    })
    // catches errors 
    .catch(function(err) {
      console.log(err);
    });
  append();
}

// omdb movie search function
function movieThis() {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + search)
    .then(function(response) {
    
    // var to store movie date
    var movie = response.data;

    // logs out response info
    console.log("--------Movie Search-------\n");
    console.log("Movie Title: " + movie.Title);
    console.log("Year: " + movie.Year);
    console.log(movie.Ratings[0].Source + ": " + movie.Ratings[0].Value);
    console.log(movie.Ratings[1].Source + ": " + movie.Ratings[1].Value);
    console.log("Conutry: " + movie.Country);
    console.log("Language: " + movie.Language);
    console.log("Plot: " + movie.Plot);
    console.log("Actors: " + movie.Actors);
    console.log("--------Movie Search-------\n");
    });
  append();
}

// takes in all of the inputs and and calls the correct functions
function liri(){
  if (search === "spotify-this-song"){
    if (userInput === ""){
      search = "The Sign"
    }
    spotifyThis()
  }

  if (search === "movie-this"){
    if (userInput === ''){
    search = "Mr. Nobody";
    }
    movieThis()
  }

  if (search === "concert-this"){
    if (userInput === ""){
      console.log("Please enter an input")
    }
    concertThis()
  }

  if (search === "do-what-it-says"){
    fs.readFile("random.txt" + "utf8" + function(error, data){
      console.log(data);

      var file = data.split(",")
      search = file[0];
      userInput = file[1];
      liri()
    })
  }
}
liri();