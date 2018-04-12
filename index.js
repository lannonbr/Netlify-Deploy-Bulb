require("dotenv").load();
var lifx = require("lifx-http-api");

// Change to a label or group to set which lights you want it to activate
const lifxBulbSelector = "all";

const client = new lifx({
  bearerToken: process.env["token"]
});

exports.handler = function(event, context, callback) {
  if (event.queryStringParameters.state == "success") {
    client
      .pulse(lifxBulbSelector, {
        color: "green",
        period: 5
      })
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ state: "Success" })
        });
      });
  } else if (event.queryStringParameters.state == "fail") {
    client
      .pulse(lifxBulbSelector, {
        color: "red",
        period: 5
      })
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ state: "Failure" })
        });
      });
  }
};
