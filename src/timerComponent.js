import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
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

function TimerComponent() {
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
    <div>
      <Timer time={data.time} seconds={40} />
    </div>
  );
}

export default TimerComponent;
