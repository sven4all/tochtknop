import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: '70vh',
      margin: 'auto',
      width: 50,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      marginTop: 50,
      marginBottom: 50,
      position: 'relative'
    }
  
    const fillerStyles = {
      width: '100%',
      transition: 'height 0.1s ease-in-out',
      height: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      verticalAlign: 'right'
    }
  
    const labelStyles = {
      padding: 10,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${Math.round(completed)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  