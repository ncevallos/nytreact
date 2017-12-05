const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

console.log("Included article routes");
// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

router.get("/nytArticles", (req, res) => {
	console.log("Running nytArticles");
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {params:{q: req.query, "api-key": authKey}})
    .then((results) => { res.json(results.data); console.log(results.data)})
    .catch(err => { res.status(422).json(err);});
});

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);


module.exports = router;
