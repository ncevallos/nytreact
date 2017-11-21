const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/NYTarticlelist",
  {
    useMongoClient: true
  }
);

  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true },
  saved: { type: Boolean, default: false }
const articleSeed = [
  {
    title: "The Trumps, the Poodle, the Sex Scandal",
    date: new Date(Date.now()),
    url: "https://www.nytimes.com/2017/10/12/opinion/ivana-ivanka-trump-book.html"
    date: new Date(Date.now())
  },
  {
    title: "Russian Banker Denies Role in Planned Trump Building in Moscow",
    date: new Date(Date.now()),
    url: "https://www.nytimes.com/2017/10/13/us/politics/andrey-kostin-felix-sater.html"
    date: new Date(Date.now())
  },
  {
    title: "Donald Trump Jr. Gives Up Secret Service Protection, Seeking Privacy",
    date: new Date(Date.now()),
    url: "https://www.nytimes.com/2017/09/18/us/politics/donald-trump-jr-secret-service.html"
    date: new Date(Date.now())
  },
  {
    title: "Would You Buy a Condo From the Trumps?",
    date: new Date(Date.now()),
    url: "https://www.nytimes.com/2017/10/05/opinion/ivanka-donald-trump-condo-fraud.html"
    date: new Date(Date.now())
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
