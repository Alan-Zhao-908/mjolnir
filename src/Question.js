import React, { useState, useEffect } from "react";
import { Button } from "shards-react";
import axios from "axios";

function Question(props) {
  let handleClick = id => {
    console.log(id);
    axios
      .post(`https://poll-asgard.herokuapp.com/v1/vote`, {
        user_id: props.uid,
        chosen: id
      })
      .then(({ data }) => {
        console.log(data);
      });
    props.showresults();
  };

  return (
    <div>
      <div>
        <h2 class="heading-4">{props.data.text}</h2>
      </div>
      <div class="container-4 w-container">
        {props.data.option_set.map((choice, i) => {
          return (
            <strong
              onClick={handleClick.bind(this, choice.id)}
              class="button w-button"
              key={i}
            >
              {choice.text}
              {/* <Button onClick={handleClick.bind(this, choice.id)}>
              {choice.text}
            </Button> */}
            </strong>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
