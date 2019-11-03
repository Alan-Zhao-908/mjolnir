import React, { useState, useEffect } from 'react';
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

  return <div>
    <p style={{ color: '#8196ff' }}>(waiting for next question...)</p>
    <p>{props.data.text}</p>
    {
      props.data.option_set.map((choice, i) => {
        return <div style={{ marginBottom: 10, color: chosen === i ? '#10bf2d' : 'black' }} key={i}>
          <div style={{ display: 'inline' }}>{choice.text} </div>
          <div style={{ display: 'inline' }}>{choice.votes}</div>
        </div>;
      })
    }

  </div>;
}

export default Results;