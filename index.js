var Twitter = require("twitter");
require("dotenv").config();
var moment = require("moment");

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

var params = { screen_name: "SinceISUDanced" };

var current_date = moment();
var lastNCAAGame = moment("1998-03-14");
let elapsedDays = current_date.diff(lastNCAAGame, "days");

var years = current_date.diff(lastNCAAGame, "year");
lastNCAAGame.add(years, "years");

var months = current_date.diff(lastNCAAGame, "months");
lastNCAAGame.add(months, "months");

var days = current_date.diff(lastNCAAGame, "days");

var elapsedYears = years + " years " + months + " months " + days + " days";

console.log(elapsedYears);
elapsedDays = thousands_separators(elapsedDays);
console.log(elapsedDays);

client.post(
  "statuses/update",
  {
    status: `${elapsedDays} days

${elapsedYears}
`,
  },
  function (error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  }
);
