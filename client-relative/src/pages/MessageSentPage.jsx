import React, { useEffect } from 'react';
import '../components/messageSent/MessageSent.css';
import RotateScreenPage from './RotateScreenPage';

function MessageSentPage(props) {

    if (props.rotateScreen === 0) {
        return (
            <div >
                <div className="container">
                    <div className="text">תגובתך נשלחה</div>
                    <img src={'/images/Envelope.svg'} className="envelope" alt="Envelope"></img>
                    <div className="littleMonster">
                        <img src={'/images/MessageSentLittleMonster.svg'} alt="Little monster"></img>
                    </div>
                </div>
            </div>
        )
    } else {
        return <RotateScreenPage />
    }
}


export default MessageSentPage