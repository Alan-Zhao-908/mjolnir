import React, { Component } from "react";
import CommentList from "./CommentList";
import FormComponent from "./FormComponent";

class CommentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [
        { name: "Alan", message: "This is great!", time: "10:00 am" },
        { name: "Jack", message: "Hilarious...", time: "9:00 am" }
      ],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("https://poll-asgard.herokuapp.com/v1/comment")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
    console.log(this.state.comments);
  }

  render() {
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <div>
        <div class="div-block-20">
          <div class="text-block-2">
            <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
        <FormComponent addComment={this.addComment} />
      </div>
    );
  }
}

export default CommentComponent;
