import React from "react";

export default function Comment(props) {
  // const { name, message, time } = props.comment;
  // console.log('PROPS for COMMENT: ', name, message);
  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://api.adorable.io/avatars/48/${props.name}@adorable.io.png`}
        alt={props.name}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border align-left">
        <small className="float-right text-muted">{props.time}</small>
        <h6 className="mt-0 mb-1 text-muted">{props.name}</h6>
        {props.message}
      </div>
    </div>
  );
}
