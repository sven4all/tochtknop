
import React, { useState, useEffect } from "react";
import './App.css';
import ProgressBar from "./progress-bar.component";
import TochtKnop from './TochtKnop';
import VoorstelGetocht from "./VoorstelGetocht";


function App() {
  const [completed, setCompleted] = useState(0);
  const [tochtState, setTochtState] = useState(null);


  useEffect(() => {
    const ws = new WebSocket("ws://tochten.njn.nl/api/status/ws");
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          console.log(json);
          setTochtState(json.status);
          if (json.status == "tocht_in_progress") {
            setCompleted(json.details.progress_of_tocht * 100);
          } else if (json.status == "no_tocht_in_progress") {
            setCompleted(0);
          } else if (json.status == "proposal_is_getocht") {

          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  // 

 


  return (
    <div className="App">
      {tochtState != "proposal_is_getocht" &&
        <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
      }
      {tochtState == "proposal_is_getocht" &&
        <VoorstelGetocht />
      }
      
      {tochtState != "no_tocht_in_progress" &&
          <TochtKnop text="Stop de tocht!" url="https://tochten.njn.nl/vote?opinion=false"></TochtKnop>
      }
      <TochtKnop text="Tocht!" url="http://tochten.njn.nl/vote?opinion=true"></TochtKnop>      
    </div>
  );
}

export default App;
