require("dotenv").load();
var lifx = require("lifx-http-api");

const client = new lifx({
  bearerToken: process.env["token"]
});

// Sample Test of the API: List all lights
client.listLights("all").then(console.log);
