import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(title, date, url) {
    return axios.post("/api/articles", title, date, url);
  },
  getNewArticles: function(query) {
    return axios.get("/api/articles/nytArticles", { params: { q: query}});
  }
};
