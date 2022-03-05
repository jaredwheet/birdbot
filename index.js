const Twitter = require("twitter");
require("dotenv").config();
let moment = require("moment");

const client = new Twitter({
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

const params = { screen_name: "SinceISUDanced" };

const current_date = moment();
let lastNCAAGame = moment("1998-03-14");
let elapsedDays = current_date.diff(lastNCAAGame, "days");

const years = current_date.diff(lastNCAAGame, "year");
lastNCAAGame.add(years, "years");

const months = current_date.diff(lastNCAAGame, "months");
lastNCAAGame.add(months, "months");

const days = current_date.diff(lastNCAAGame, "days");

let elapsedYears = years + " years, " + months + " months, " + days + " days";

console.log(elapsedYears);
elapsedDays = thousands_separators(elapsedDays);
console.log(elapsedDays);

client.post(
  "statuses/update",
  {
    status: `${elapsedDays} days

${elapsedYears}

@KyleBrennanISU @Redbird_MBB @ryanpedon @ISURedbirds #REDBIRDhoops
`,
  },
  function (error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  }
);

// client.get(
//   "statuses/user_timeline",
//   params,
//   function (error, tweets, response) {
//     if (!error) {
//       console.log(tweets);
//     }
//   }
// );
