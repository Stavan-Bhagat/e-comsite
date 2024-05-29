// elasticClient.js
const { Client } = require("@elastic/elasticsearch");

// Update the endpoint URL provided by Elastic Cloud
// const endpointUrl = "YOUR_ELASTICSEARCH_ENDPOINT_URL"; // Replace with your actual endpoint URL

// Initialize the Elasticsearch client with the endpoint URL
const client = new Client({
  node: process.env.ELASTIC_ENDPOINTURL,
  auth: {
    // If authentication is required, provide the username and password
    username: process.env.ELASTIC_USERNAME, // Replace with your actual username
    password: process.env.ELASTIC_PASSWORD, // Replace with your actual password
  },
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
