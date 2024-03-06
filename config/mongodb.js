const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb://syamsulhuda7:syamsulhuda7@localhost:27017?authSource=admin";
const client = new MongoClient(url);

// Database Name

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server MongoDB");
  //   const db = client.db(dbName);
  //   const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
//   .finally(() => client.close());

const db = client.db("syamsulhuda7");

module.exports = db;