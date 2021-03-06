import React, { useState, useEffect } from "react";
import "./App.css";
import ApiClient from "./APIClient";
import useSWR, { SWRConfig } from "@zeit/swr";
import { useCookies } from "react-cookie";
import Question from "./Question";
import moment from "moment";
import Result from "./Result";
import Timer from "./timer.js";

const uuidv4 = require("uuid/v4");
let tempTime;

function App() {
  return (
    <SWRConfig value={{ refreshInterval: 5000 }}>
      <MainApp />
    </SWRConfig>
  );
}

function MainApp() {
  const [cookies, setCookie] = useCookies(["uid"]);
  const [uid, setUid] = useState(null);
  const [screen, setScreen] = useState("question");
  const { data, error } = useSWR("/v1/status", () => ApiClient.get("status"));

  useEffect(() => {
    if (!uid) {
      if ("uid" in cookies) {
        setUid(cookies["uid"]);
      } else {
        let uuid = uuidv4();
        setCookie("uid", uuid);
        setUid(uuid);
      }
    }
  });

  let onOptionChosen = e => {
    setScreen("result");
  };

  if (!data) return <p>Loading...</p>;
  // console.log(data);
  // console.log(error);

  let timeDiff = moment().diff(moment(data.time));

  if (tempTime !== data.time) {
    setScreen("question");
  }

  tempTime = data.time;

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1 style={{ color: 'blue' }}> CTRLife</h1> */}
        <img width="200px" src={require("./assets/logo.png")} />
        <h3>
          A social experiment to control Max's life <br /> <br />
          {""}
          <br />
          {""}
        </h3>
        <h4 style={{ color: "red", textAlign: "left" }}>
          Rules of Engagement:
        </h4>
        <h6 align="eft">
          (1) The event starts at 1:05pm PST on Sunday Nov 3 and if the stream
          goes down go
          <a href="https://www.facebook.com/ControlLife-109561203819750/ ">
            {" "}
            here
          </a>{" "}
          to continue watching!
          <br /> (2) The director will post questions periodically on what Max
          should do. You have 40 seconds to vote. <br /> (3) Are you an Agent of
          Chaos? Go find Max in SF and change the course of livestream
          <br /> (4) Be kind... or don’t be
        </h6>
        <div style={{ display: "in-line-block" }}>
          <h4 style={{ float: "left" }}>Time Left </h4>
          <Timer time={data.time} seconds={40} />
        </div>
        {screen === "question" ? (
          <div style={{ display: "in-line-block" }}>
            <div style={{ float: "left" }}>
              <Question uid={uid} data={data} showresults={onOptionChosen} />
            </div>
          </div>
        ) : (
          <Result data={data} />
        )}
      </header>
    </div>
  );
}

export default App;
