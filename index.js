require("dotenv").load();
var lifx = require("lifx-http-api");

// Change to a label or group to set which lights you want it to activate
const lifxBulbSelector = "all";

const client = new lifx({
  bearerToken: process.env["token"]
});

function pulseBulb(color, period, responseBodyJSONString, callback) {
  client
    .pulse(lifxBulbSelector, { color, period })
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: responseBodyJSONString
      });
    })
    .catch(err => console.error(err));
}

exports.handler = function(event, context, callback) {
  const { state } = event.queryStringParameters;

  if (state === "success") {
    console.log("Going green");
    pulseBulb("green", 5, JSON.stringify({ state: "Success" }), callback);
  } else if (state === "fail") {
    console.log("Going red");
    pulseBulb("red", 5, JSON.stringify({ state: "Failure" }), callback);
  }
};
