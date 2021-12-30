

import React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


const Statistieken = (props) => {
    const { clicks, resetSeconds, durationTocht, participants} = props;

    
    
    const containerStyles = {
      margin: 10
    }
  
    return (
      <div style={containerStyles}>
       Statistieken voor nerds
       <p>
       Aantal clicks dit congres: {clicks} - {resetSeconds}s tot afbreken tocht - deze tocht duurt al {durationTocht} - {participants} deelnemer(s) aan deze tocht
        </p>
      </div>
    );
  };
  
  export default Statistieken;
  