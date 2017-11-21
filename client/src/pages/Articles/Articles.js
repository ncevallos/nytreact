import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { SearchedList, SearchedListItem } from "../../components/SearchedList";

class Articles extends Component {
  state = {
    articles: [], //holds saved articles from MongoDB
    nytArticles: [], //holds article results from the search
    title: "",
    date: "",
    url: "",
    saved: "",
    articleSearch: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = event => {
      API.saveArticle({
        title: this.state.title,
        date: this.state.date,
        url: this.state.url

      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getNewArticles(this.state.articleSearch)
      .then(res => {console.log(res); this.setState({ nytArticles: res.data.response.docs }); })
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.url) {
      API.saveArticle({
        title: this.state.title,
        url: this.state.url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-10">
            <Jumbotron>
              <h1><center>New York Times Search</center></h1>
            </Jumbotron>
            <form>
            <br/>
              <Input
                value={this.state.articleSearch}
                onChange={this.handleInputChange}
                name="articleSearch"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="URL (required)"
              />
              <FormBtn
                disabled={!(this.state.articleSearch)}
                onClick={this.handleSearchFormSubmit}
              >
                Submit Article
              </FormBtn>
              <br/>
            </form>
          </Col>
          <Col size="md-10">
            <Jumbotron>
              <h1>Searched Articles</h1>
              </Jumbotron>
                          {this.state.nytArticles.length ? (
              <List>
                {this.state.nytArticles.map(recipe => (
                  <ListItem key={recipe.headline.main}>
                      <strong>
                        <h3>Title: {recipe.headline.main} </h3>
                        <p> Date: {recipe.pub_date} </p>
                         <a href={recipe.web_url}><p> URL: {recipe.web_url} </p></a>
                      </strong>
                    <SaveBtn onClick={() => this.saveArticle(recipe.headline.main, recipe.pub_date, recipe.web_url)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
              {!this.state.nytArticles.length ? (
                <h3 className="text-center">You haven't Searched for an Article yet!</h3>
              ) : (
                <SearchedList>

                  {this.state.nytArticles.map(recipe => {
                    return (
                      <SearchedListItem
                        key={recipe.headline.main}
                        title={recipe.headline.main}
                        href={recipe.web_url}
                        ingredients={recipe.pub_date}
                      />
                    );
                  })}
                </SearchedList>
              )}
          </Col>
          <Col size="md-10">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                      <strong>
                        <p>Title: {article.title} </p>
                        <p> Date: {article.date} </p>
                        <a href={article.url}><p> URL: {article.url} </p></a>
                        <p> ID: {article._id} </p>
                      </strong>
                    <DeleteBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;