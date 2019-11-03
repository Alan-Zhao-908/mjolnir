import React, {Component} from "react";

import firebase from "firebase";
import {FirebaseDatabaseMutation} from "@react-firebase/database";

export default class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: "",

			// comment: {
			// 	name: "",
			// 	message: ""
			// },
			name: '',
			message: ''
		};

		// this.nameRef = React.createRef();
		// this.commentRef = React.createRef();

		// bind context to methods
		// this.handleFieldChange = this.handleFieldChange.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	 * Handle form input field changes & update the state
	 */
	// handleFieldChange = event => {
	// 	const {value, name} = event.target;
	//
	// 	this.setState({
	// 		...this.state,
	// 		comment: {
	// 			...this.state.comment,
	// 			[name]: value
	// 		}
	// 	});
	// };

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	/**
	 * Form submit handler
	 */
	// onSubmit(e) {
	// 	// prevent default form submission
	// 	e.preventDefault();
	//
	// 	if (!this.isFormValid()) {
	// 		this.setState({error: "All fields are required."});
	// 		return;
	// 	}
	//
	// 	// loading status and clear error
	// 	this.setState({error: "", loading: true});
	//
	// 	// persist the comments on server
	// 	let {comment} = this.state;
	// 	console.log(comment)
	// 	fetch("http://localhost:3000", {
	// 		method: "post",
	// 		body: JSON.stringify(comment)
	// 	})
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			if (res.error) {
	// 				this.setState({loading: false, error: res.error});
	// 			} else {
	// 				// add time return from api and push comment to parent state
	// 				comment.time = res.time;
	// 				this.props.addComment(comment);
	//
	// 				// clear the message box
	// 				this.setState({
	// 					loading: false,
	// 					comment: {...comment, message: ""}
	// 				});
	// 			}
	// 		})
	// 		.catch(err => {
	// 			this.setState({
	// 				error: "Something went wrong while submitting form.",
	// 				loading: false
	// 			});
	// 		});
	// }

	// isFormValid() {
	// 	return this.state.comment.name !== "" && this.state.comment.message !== "";
	// }

	renderError() {
		return this.state.error ? (
			<div className="alert alert-danger">{this.state.error}</div>
		) : null;
	}

	render() {
		// console.log('TICK');
		return (
			<React.Fragment>
				<FirebaseDatabaseMutation type="push" path="comments">
					{({runMutation}) => (
						<form
							onSubmit={async e => {
								e.preventDefault();
								const name = this.state.name;
								const comment = this.state.message;
								let timestamp = Date.now() * -1;
								await runMutation({
									name,
									comment,
									created_at: timestamp,
									updated_at: timestamp
								});
								// this.nameRef.value = '';
								// this.commentRef.value = '';
							}}
						>
							{/*<form method="post" onSubmit={this.onSubmit}>*/}
							<div className="form-group">
								<input
									onKeyUp={this.handleChange}
									// value={this.state.name}
									// ref={this.nameRef}
									className="form-control"
									placeholder="Your Name"
									name="name"
									type="text"
								/>
							</div>

							<div className="form-group">
								<textarea
									onKeyUp={this.handleChange}
									// value={this.state.message}
									// ref={this.commentRef}
									className="form-control"
									placeholder="😎 Your Comment"
									name="message"
									rows="5"
								/>
							</div>

							{this.renderError()}

							<div className="form-group">
								<button disabled={this.state.loading} className="btn btn-primary">
									Comment ➤
								</button>
							</div>
						</form>
					)}
				</FirebaseDatabaseMutation>
			</React.Fragment>
		);
	}
}
