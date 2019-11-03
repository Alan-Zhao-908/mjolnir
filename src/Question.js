import React, { useState, useEffect } from 'react';
import { Button } from "shards-react";



function Question(props) {
  return <div>
    <p>{props.data.text}</p>
    {
      props.data.option_set.map((choice, i) => {
        return <div style={{ marginBottom: 10 }} key={i}>
          <Button onClick={props.showresults}>{choice.text}</Button>
        </div>;
      })
    }

  </div>;
}

export default Question;