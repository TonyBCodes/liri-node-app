// JavaScript source code
require("dotenv").config();

var xyz = require("./keys.js");
console.log(xyz.spotify);

var Twitter = require("twitter");

var tclient = new Twitter(xyz.twitter);
console.log("**Twitter** " + tclient);

//var params = {
//    q: "valencia",
//    count: 1
//};
//tclient.get("search/tweets", params, function (error, tweets, response) {
//    //if (!error) {
//        console.log(error);
//        console.log(JSON.stringify(tweets,null,2));
//    //}
//});

//var params = {
//    screen_name: 'Chris and Stephanie',
//    count: 10
//};
//finally found that I wanted user timeline! exciting client.
//tclient.get('statuses/user_timeline', params, function (error, tweets, response) {
//    if (!error) {
//        for (i = 0; i < tweets.length; i++)
//            { console.log(tweets[i].text); }
//    }
//});

var Spotify = require('node-spotify-api');

var spotify = new Spotify(xyz.spotify);
console.log("**Spotify** " + spotify);

spotify.search({ type: 'track', query: 'beat it' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(JSON.stringify(data));
});

//var I = require("inquirer");
//console.log("**Inquirer** "+ I);

//var R = require("request");
//console.log("**Request** " + R);

//var action = process.argv[3];

//var item = process.argv[4];

//switch (action) {
//    case "twitter": {
//        var params = { screen_name: 'TonyBCodes' };
//        client.get('statuses/user_timeline', params, function (error, tweets, response) {
//            if (!error) {
//                console.log(tweets);
//            }
//        });
//        break;
//    }

//    case "spotify": {

//    }

//    case "omdb": {

//    }


//}