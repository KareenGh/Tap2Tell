import React, { useRef, useState } from 'react';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';

import ProgressBar from '../../consts/ProgressBar';

export const PlayAudio = ({ recordAgain, durationMill, audioRecord, uploadImage }) => {
    const [progressBar, setProgressBar] = useState(0);
    const [pause, setPause] = useState(false);

    const intervalTimer = useRef();

    const interval = () => {
        intervalTimer.current = setInterval(() => {
            setProgressBar(prev => (prev + (100 / (durationMill * 0.01)) >= 100) ? 100 : prev + (100 / (durationMill * 0.01)));
        }, 100);
    }

    const playAudio = () => {
        if (audioRecord) {
            try {
                setPause(true)   //use true?
                audioRecord.play()
                interval()
                audioRecord.onended = function () {
                    clearInterval(intervalTimer.current);
                    setPause(false)
                    setProgressBar(0);
                }
            } catch (err) {
            }
        }
    }

    const pauseAudio = () => {
        if (audioRecord) {
            setPause(false)
            clearInterval(intervalTimer.current);
            audioRecord.pause()
        }
    }

    const sendImage = () => {
        // audioRecord.pause();
        uploadImage();
    }

    const tryAgain = () => {
        setProgressBar(0);
        setPause(false)
        clearInterval(intervalTimer.current);
        audioRecord.pause();
        recordAgain();
    }

    return (
        <div className='hearingRecordCon'>
            <div className='recording'>
                {pause ? <FaPause className='icon' onClick={pauseAudio} /> : <FaPlay className='icon' onClick={playAudio} />}
                <div className='progressBar'>
                    <ProgressBar bgcolor={'#F7FDDC'} completed={progressBar} />
                </div>
            </div>
            <div className="iconsContainer">
                <img src={'/images/Approved.svg'} className='sendImage' onClick={sendImage} alt="approved" />
                <img src={'/images/TryAgain.svg'} className='tryAgain' onClick={tryAgain} alt="disapproved" />
            </div>
        </div>
    )
}