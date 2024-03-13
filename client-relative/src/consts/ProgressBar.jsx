import React from "react";
import './progressBar.style.scss'
const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
   
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'       //why?
    }
    // todo: style
    return (
      <div /* style={containerStyles} */ className="containerStyles">
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;