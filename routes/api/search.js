const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

router.get("/nytArticles", (req, res) => {

  console.log("Running nytArticles");
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {params:{q: req.query, "api-key": authKey}})
    .then((results) => { res.json(results.data); console.log(results.data); })
    .catch(err => res.status(200).json(err));
});

module.exports = router;