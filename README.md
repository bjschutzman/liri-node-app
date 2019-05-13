# liri-node-app
**** LIRI APP PICTURE WORKING
https://docs.google.com/document/d/1O2CbHPYjIPuK-hL4iAxSLi7ZguIUDmouHzVWgoz4h_k/edit?usp=sharing

Things needed for LIRI to work
-Npm install axios
-npm install --save node-spotify-api
-omdb api link and key
-bands in town api link and key

How to use
  - in the terminal locate the liri.js file
  - type in node liri.js + one of the options for searching
    -spotify-this-song
    -concert-this
    -movie-this
    -do-what-it-says
   - add a movie title, band, or song depending on which search option you chose.
    
Results
Liri will take in the the commands and output data about the search.
  -spotify-this-song (add song of your choice) will return
    - Artist
    - Album
    - Preview Link
  - concert-this (add band) will return
    - Venue
    - location,
    - Event Date
  - movie-this (add movie) will return
    - Movie Title
    - IMDB Rating
    - Rotten Tomatoes Rating
    - Country
    - Language
    - Plot
    - Actors
  - do-what-it-says will return one of the previous searches.
  
