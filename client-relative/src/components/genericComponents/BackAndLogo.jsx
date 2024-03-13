import React from 'react';
import './BackAndLogo.scss';


function BackAndLogo() {
    
    return (
        <div className={"backgroundContainer"}>
            <img src={'/images/NewBackground.png'} className="background" alt="Background"></img>
            <img src={'/images/Logo1.svg'} className="logo" alt="tap2tell logo"></img>
        </div>
    )
}

export default BackAndLogo