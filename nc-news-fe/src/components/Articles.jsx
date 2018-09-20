import React, { Component } from "react";
import axios from "axios";
import "./css/Articles.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import moment from "moment";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        <h2> Articles </h2>
        <Link to="/articles/post">Post an article!</Link>
        {[...articles]
          .sort((a, b) => {
            const c = new Date(a.created_at);
            const d = new Date(b.created_at);
            return d - c;
          })
          .map(article => {
            const previewText = `${article.body.slice(0, 200)}...`;
            return (
              <div key={article._id}>
                <table className="articleBlock">
                  <col width="5%" />
                  <col width="70%" />
                  <tbody>
                    <tr>
                      <th> {article.votes}</th>
                      <Link to={`/articles/${article._id}`}>
                        <th className="articleBody">
                          <p className="articleTitle"> {article.title} </p>
                          {previewText}
                          <p className="articleFooterText">
                            {`Posted ${moment(article.created_at)
                              .startOf("second")
                              .fromNow()} 
                          by ${article.created_by}`}
                          </p>
                        </th>
                      </Link>
                      <th>
                        <Link to={`/articles/${article._id}`}>
                          <ion-icon name="reorder" />
                        </Link>
                      </th>
                      <th>
                        <button>
                          <ion-icon name="thumbs-down" />
                        </button>
                      </th>
                      <th>
                        <button
                          onClick={() => {
                            this.handleVote("up");
                          }}
                        >
                          <ion-icon name="thumbs-up" />
                        </button>
                      </th>
                      <th>
                        <ion-icon name="chatboxes" />
                        {article.comment_count}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    );
  }

  handleVote = direction => {
    axios.patch("a").then();
  };

  componentDidMount() {
    if (this.props.match.params.topic) {
      axios
        .get(
          `https://nc-news-matt.herokuapp.com/api/topics/${
            this.props.match.params.topic
          }/articles`
        )
        .then(data => {
          this.setState({
            articles: data.data.articles
          });
        });
    } else {
      axios
        .get("https://nc-news-matt.herokuapp.com/api/articles")
        .then(data => {
          this.setState({
            articles: data.data.articles
          });
        });
    }
  }
}
export default Articles;
