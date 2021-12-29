
import React, { useState, useEffect } from "react";
import './App.css';
import ProgressBar from "./progress-bar.component";
import TochtKnop from './TochtKnop';
import VoorstelGetocht from "./VoorstelGetocht";
import Statistieken from "./Statistieken";


function App() {
  const [completed, setCompleted] = useState(0);
  const [tochtState, setTochtState] = useState(null);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [durationOfTocht, setDurationOfTocht] = useState("0:00");
  const [durationUntilReset, setDurationUntilReset] = useState(0);
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);


  useEffect(() => {
    const ws = new WebSocket("wss://tochten.njn.nl/api/status/ws");
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          setTochtState(json.status);
          if (json.status == "tocht_in_progress") {
            setCompleted(json.details.progress_of_tocht * 100);
            setNumberOfClicks(json.details.total_number_of_votes);
            var start_of_tocht_diff = new Date() / 1000 - json.details.time_vote_started;
            var m = Math.floor(start_of_tocht_diff / 60).toString().padStart(2,'0');
            var s = Math.floor(start_of_tocht_diff % 60).toString().padStart(2,'0');
            setDurationOfTocht(m + ":" + s);
            setDurationUntilReset(Math.ceil(json.details.time_last_vote + (7 - new Date() / 1000 ) ));
            setNumberOfParticipants(json.details.number_of_vote_participants);
          } else if (json.status == "no_tocht_in_progress") {
            setCompleted(0);
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
      
      {tochtState == "tocht_in_progress" &&
          <TochtKnop text="Stop de tocht!" url="https://tochten.njn.nl/api/vote?opinion=false" type_button="outlined"></TochtKnop>
      }
      <TochtKnop text="Tocht!" url="https://tochten.njn.nl/api/vote?opinion=true" type_button="contained"></TochtKnop>    
      
      {tochtState == "tocht_in_progress" &&
          <Statistieken clicks={numberOfClicks}  durationTocht={durationOfTocht} resetSeconds={durationUntilReset} participants={numberOfParticipants} > </Statistieken>
      }
    </div>
  );
}

export default App;
