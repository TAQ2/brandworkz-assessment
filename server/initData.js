const MongoClient = require("mongodb");
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  const dbo = db.db("commonplace");
  dbo.createCollection("answers", function(err, res) {
    if (err) throw err;
    console.log("Answers collection created!");
  });

  dbo.createCollection("options", function(err, res) {
    if (err) throw err;
    console.log("Options collection created!");

    const options = [
      { name: "cat" },
      { name: "dog" },
      { name: "fish" },
      { name: "parrot" }
    ];

    const optionsCollection = dbo.collection("options");

    optionsCollection.insertMany(options, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
});
