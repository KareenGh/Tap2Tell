import React, { useEffect, useState } from 'react';
import './TryAgain.css';

function TryAgain(props) {
    // todo useMemo
    const [text, setText] = useState()
    useEffect(() => {
        findText()
    }, []);

    const findText = () => {
        if (props.imageStatus === 'err') {
            setText('אירעה שגיאה, אנא נסו שנית מאוחר יותר');
            return;
        };
        if (props.imageStatus === 'deleted') {
            setText('התמונה נמחקה');
            return;
        }
        if (localStorage.getItem(`${props.id}`) === props.id) {
            setText('מצטערים, כבר הגבת לתמונה זו');
        } else {
            setText('נסה בפעם הבאה,\n מישהו אחר ענה לפניך');
        }
    }



    return (
        <div /* className="tryAgainContainer" */>
            <div className="tryAgainText">{text}</div>
            <img src={'/images/TryAgainMonster.svg'} className="tryAgainMonster" alt="a monster"></img>
        </div>
    )

}

export default TryAgain