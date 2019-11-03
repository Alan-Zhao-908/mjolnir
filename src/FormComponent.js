import React, {Component} from "react";

import firebase from "firebase";
import {FirebaseDatabaseMutation} from "@react-firebase/database";

export default class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: "",

			comment: {
				name: "",
				message: ""
			},
		};

		// bind context to methods
		// this.handleFieldChange = this.handleFieldChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	/**
	 * Handle form input field changes & update the state
	 */
	handleFieldChange = event => {
		const {value, name} = event.target;

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
			this.setState({error: "All fields are required."});
			return;
		}

		// loading status and clear error
		this.setState({error: "", loading: true});

		// persist the comments on server
		let {comment} = this.state;
		console.log(comment)
		fetch("http://localhost:3000", {
			method: "post",
			body: JSON.stringify(comment)
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					this.setState({loading: false, error: res.error});
				} else {
					// add time return from api and push comment to parent state
					comment.time = res.time;
					this.props.addComment(comment);

					// clear the message box
					this.setState({
						loading: false,
						comment: {...comment, message: ""}
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
								const name = this.state.comment.name;
								const comment = this.state.comment.message;
								await runMutation({
									name,
									comment,
									created_at: firebase.database.ServerValue.TIMESTAMP,
									updated_at: firebase.database.ServerValue.TIMESTAMP
								});
							}}
						>
							{/*<form method="post" onSubmit={this.onSubmit}>*/}
							<div className="form-group">
								<input
									// onChange={this.handleFieldChange}
									value={this.state.comment.name}
									className="form-control"
									placeholder="Your Name"
									name="name"
									type="text"
								/>
							</div>

							<div className="form-group">
								<textarea
									// onChange={this.handleFieldChange}
									value={this.state.comment.message}
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
