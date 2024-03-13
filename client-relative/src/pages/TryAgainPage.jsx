import React from 'react';
import BackAndLogo from '../components/genericComponents/BackAndLogo.jsx';
import TryAgain from '../components/tryAgain/TryAgain.jsx';


function TryAgainPage(props) {

    return (
        <div>
            <BackAndLogo />
            <TryAgain imageStatus={props.imageStatus} id={props.id} />
        </div>
    )
}

export default TryAgainPage