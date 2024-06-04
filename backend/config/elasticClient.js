// elasticClient.js
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTIC_ENDPOINTURL,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});
client.ping((error) => {
  if (error) {
    console.error("Error connecting to Elasticsearch server:", error);
  } else {
    console.log("Successfully connected to Elasticsearch server.");
  }
});

module.exports = client;

// // elasticClient.js
// const { Client } = require("@elastic/elasticsearch");

// // Update the endpoint URL provided by Elastic Cloud
// const endpointUrl = process.env.endpointUrl; // Replace with your actual endpoint URL

// // Initialize the Elasticsearch client with the endpoint URL
// const client = new Client({
//   node: endpointUrl,
// });

// module.exports = client;
