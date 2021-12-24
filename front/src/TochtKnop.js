

import React from "react";



const TochtKnop = (props) => {
    const { text, url } = props;

    function vote(url) {
      console.log(url);
      fetch(url);
      
    }
    
  
    // const containerStyles = {
    //   height: 20,
    //   width: '95%',
    //   backgroundColor: "#e0e0de",
    //   borderRadius: 50,
    //   margin: 50
    // }
  
    // const fillerStyles = {
    //   height: '100%',
    //   transition: 'width 0.1s ease-in-out',
    //   width: `${completed}%`,
    //   backgroundColor: bgcolor,
    //   borderRadius: 'inherit',
    //   textAlign: 'right'
    // }
  
    // const labelStyles = {
    //   padding: 5,
    //   color: 'white',
    //   fontWeight: 'bold'
    // }
  
    return (
      <button onClick={() => vote(url)}>
        {text}
      </button>
    );
  };
  
  export default TochtKnop;
  