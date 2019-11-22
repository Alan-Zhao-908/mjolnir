import React, { Component } from "react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        name: "",
        message: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    console.log(comment);
    fetch("https://poll-asgard.herokuapp.com/v1/comment", {
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? this.state.error : "";
  }

  render() {
    return (
      <div>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="div-block-22">
            <input
              style={{ width: "100%" }}
              className="text-block"
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              placeholder="Your Name"
              name="name"
              type="text"
            />
          </div>

          <div className="div-block-6">
            <textarea
              style={{ width: "100%" }}
              className="text-block-3"
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              placeholder="Send a message"
              name="message"
              rows="5"
            />
          </div>
          <div style={{ padding: "0px 12px" }}>{this.renderError()}</div>
          <div class="div-block-13">
            <a href="#">
              <button disabled={this.state.loading} class="button-4 w-button">
                Send
              </button>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
