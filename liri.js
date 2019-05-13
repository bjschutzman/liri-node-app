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



// spotify function
function spotifyThis() {
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


// function which searches a concert and returns venue, location, and date.
function concertThis() {
  axios
      axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
      .then(function(response) {
      var concert = response.data[0];
      var datetime = concert.datetime;
      var year = datetime.substring(0, 4);
      var month = datetime.substring(5, 7);
      var day = datetime.substring(8, 10);
      console.log("--------Concert Search-------\n");
      console.log("Venue: " + concert.venue.name + "\n");
      console.log("Location: " + concert.venue.city + ", " + concert.venue.region + "\n" );
      console.log(
        "Event Date: " + month + "/" + day + "/" + year + "\n");
      console.log("--------Concert Search-------\n");
    });
  append();
}




// omdb movie search function
function movieThis() {
  axios
    .get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
    
    // var to store movie date
    var movie = response.data;

    // logs out response info
    console.log("--------Movie Search-------\n");
    console.log("Movie Title: " + movie.Title);
    console.log("Year: " + movie.Year);
    console.log("IMDB:Rating: " + movie.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
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

  if (search === "concert-this"){
    concertThis()
  }

  if (search === "movie-this"){
    if (userInput === ''){
    search = "Mr. Nobody";
    }
    movieThis()
  }

  

  if (search === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
      console.log(data);

      var file = data.split(",")
      search = file[0];
      userInput = file[1];
      liri();
    });
  }
}
liri();