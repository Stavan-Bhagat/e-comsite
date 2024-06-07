const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTIC_END_POINT_URL,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD
  }
});
client.ping((error) => {
  if (error) {
    console.error('Error connecting to Elasticsearch server:', error);
  } else {
    console.log('Successfully connected to Elasticsearch server.');
  }
});

module.exports = client;
