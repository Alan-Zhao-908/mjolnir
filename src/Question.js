import React, { useState, useEffect } from 'react';
import { Button } from "shards-react";
import axios from 'axios'



function Question(props) {

  let handleClick = (id) => {
    console.log(id)
    axios.post(`https://poll-asgard.herokuapp.com/v1/vote`,{
      "user_id": props.uid,
      "chosen": id
    }) 
    .then(({data}) => {
      console.log(data)
    })
    props.showresults()
  };

  return <div>
    <p>{props.data.text}</p>
    {
      props.data.option_set.map((choice, i) => {
        // console.log(choice.id)
        return <div style={{ marginBottom: 10 }} key={i}>
          <Button onClick={handleClick.bind(this,choice.id)}>{choice.text}</Button>
        </div>;
      })
    }

  </div>;
}

export default Question;