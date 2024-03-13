import React from 'react';
import '../components/RotateScreen/RotateScreen.scss';

function RotateScreenPage() {
    return (
        <div >
            <div className="container">
                <div className="text">סובב את המסך</div>
                <img src={'/images/RotateScreen.gif'} className="rotateScreen" alt="Rotate Screen"></img>
            </div>
        </div>
    )
}


export default RotateScreenPage