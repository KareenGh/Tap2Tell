import React from 'react';
import './Dots.scss';
// import '../../pages/MainPage.jsx';

function Dots(props) {
    return (
        <div className="dotsContainer">
            <div className={props.firstDotColorVar}></div>
            <div className={props.secondDotColorVar}></div>
            <div className={props.thirdDotColorVar}></div>
        </div>
    )
}

export default Dots