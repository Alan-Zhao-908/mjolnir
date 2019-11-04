import React, {Component} from "react";
import CommentList from './CommentList'
import FormComponent from './FormComponent'

class AppComments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comments: [{name: "asdf", message: "df"}, {name: "d", message: "df"}],
			loading: false
		};

		this.addComment = this.addComment.bind(this);
	}

	componentDidMount() {
		// loading
		this.setState({loading: true});

		// get all the comments
		fetch("http://localhost:3000")
			.then(res => res.json())
			.then(res => {
				this.setState({
					comments: res,
					loading: false
				});
			})
			.catch(err => {
				this.setState({loading: false});
			});
	}

	addComment(comment) {
		this.setState({
			loading: false,
			comments: [comment, ...this.state.comments]
		});
		console.log(this.state.comments)
	}

	render() {

		// console.log(this.getCommentDoc());
		// const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
		return (
			<div className="App container">
				<div className="row">
					<div className="col-4  pt-3 border-right">
						<h6>Add a public comment</h6>
						<FormComponent addComment={this.addComment}/>
					</div>
					<div className="col-8  pt-3 bg-white">
						<CommentList
							loading={this.state.loading}
							comments={this.state.comments}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default AppComments;
