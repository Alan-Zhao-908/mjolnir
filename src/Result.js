import React, { useState, useEffect } from "react";
import { Button } from "shards-react";

function Results(props) {
  let max_votes = 0;
  let chosen = -1;
  const options = props.data.option_set;
  for (var i = 0; i < options.length; i++) {
    if (options[i].votes > max_votes) {
      max_votes = options[i].votes;
      chosen = i;
    }
  }

  return (
    <div>
      <h2 class="heading-4">{props.data.text}</h2>
      <h6 style={{ color: "#d8900a" }}>(waiting for next question...)</h6>
      {props.data.option_set.map((choice, i) => {
        return (
          <div key={i}>
            <strong class="button-result w-button-result">
              {`${choice.text} - ${choice.votes} votes`}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

export default Results;
