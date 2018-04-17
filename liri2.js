// JavaScript source code

var sec_info;
var info_f;
var check_emp;

function setup() {
    require("dotenv").config();
    sec_info = require("./keys.js");

    info_f = require("fs");
    check_emp = require('extfs');

}

function save_trans(cmd, info) {

    var record = { "cmd": cmd, "info": info };
    record = JSON.stringify(record);

    check_emp.isEmpty('./log.txt', function (empty) {
        if (!empty) {
            record = ",\n" + record;
        }
        info_f.appendFile('./log.txt', record, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

}

function get_tweets() {

    var Twitter = require("twitter");
    var tclient = new Twitter(sec_info.twitter);

    var params = {
        screen_name: 'TonyBCodes',
        count: 20
    };

    tclient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("\n");
            console.log("Tweets")
            for (i = 0; i < tweets.length; i++) { console.log(tweets[i].text); }
            console.log("\n");
            save_trans("my-tweets", "");
        }
        else {
            console.log("\n");
            console.log("There was an error.  Please try again.");
            console.log("\n");
        }
    });
}

function get_spot(song) {

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(sec_info.spotify);  //pull in key from environment variable

    if (song == undefined) {
        song = "The Sign Ace of Base";
    }
    else {

        var i = 4;
        while (process.argv[i] != undefined) {
            song += (" " + process.argv[i]);
            i++;
        }
    }

    spotify.search({type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            console.log("\n");
            console.log("Song Info");
            console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name));
            console.log(JSON.stringify(data.tracks.items[0].name));
            console.log(JSON.stringify(data.tracks.items[0].href));
            console.log(JSON.stringify(data.tracks.items[0].album.name));
            console.log("\n");
            save_trans("spotify-this-song", song);
        }
    });
}

function get_omdb(mov_tit) {

    var mov_key = sec_info.omdb.key;
    var request = require('request');

    if (mov_tit == undefined) {
        mov_tit = "Mr Nobody";
    }
    else {

        var i = 4;
        while (process.argv[i] != undefined) {
            mov_tit += (" " + process.argv[i]);
            i++;
        }
    }

    request('http://www.omdbapi.com/?apikey=' + mov_key + '&t=' + mov_tit, function (error, response, body) {
        if (error) {
            console.log("\n");
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log("\n");
        }
        else {
            console.log("\n");
            console.log(JSON.parse(body).Title); // Print the HTML for the Google homepage.
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            if (JSON.parse(body).Ratings[0].Value == undefined) {
                console.log("** No Rotten Tomatoes rating for this movie. **");
            }
            else {
                console.log(JSON.parse(body).Ratings[0].Value);
            }
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            console.log("\n");
            save_trans("movie-this", mov_tit);
        }
    });
}


setup();

var action = process.argv[2];
var item = process.argv[3];

switch (action) {
    case "my-tweets": {
        get_tweets();
        break;
    }

    case "spotify-this-song": {
        get_spot(item);
        break;
    }

    case "movie-this": {
        get_omdb(item);
        break;
    }

    case "help": {
        console.log("\n");
        console.log("LIRI Help");
        console.log("This is LIRI.  LIRI replies with information based on your input.");
        console.log("node liri.js my-tweets returns 20 (or whatever is available) most recent tweets.");
        console.log("node liri.js spotify-this-song songname returns information about the song. Optionally add the artist's name.");
        console.log("node liri.js movie-this movie name returns information about the movie.");
        console.log("node liri.js do-what-it-says performs a random function and returns some data.");
        console.log("\n");
        break;
    }

}