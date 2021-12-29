

import React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


const TochtKnop = (props) => {
    const { text, url, type_button} = props;

    function vote(url) {
      console.log(url);
      fetch(url);
      
    }
    
    const containerStyles = {
      margin: 10
    }
  
    return (
      <Button style={containerStyles} onClick={() => vote(url)} variant={type_button}>
        {text}
      </Button>
    );
  };
  
  export default TochtKnop;
  