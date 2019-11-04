import React from "react";
import Comment from "./Comment";
import {FirebaseDatabaseNode} from "@react-firebase/database";

export default function CommentList(props) {

	return (
		<div className="commentList">
			<FirebaseDatabaseNode
				path="comments/"
				limitToFirst={5}
				// orderByKey
				orderByValue={"created_at"}
			>
				{d => {
					// console.log(d.value ? d.value : 'no value loaded');
					return (
						<>
							{/*<h5 className="text-muted mb-4">*/}
							{/*	<span className="badge badge-success">{d.value}</span>{" "}*/}
							{/*	Comment{d.value > 0 ? "s" : ""}*/}
							{/*</h5>*/}

							{d.value ?
								Object.keys(d.value).map((keyName, id) => {
									const currentComment = d.value[keyName];
									console.log('COMMENT: ', keyName, id, currentComment);
									if (currentComment.name) {
										return <Comment key={keyName} name={currentComment.name} message={currentComment.comment}/>
									}
								})
								:
								<div className="alert text-center alert-info">
									Be the first to comment
								</div>
							}
						</>
					)
				}}
			</FirebaseDatabaseNode>
		</div>
	);
}
