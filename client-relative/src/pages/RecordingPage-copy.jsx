import React, { useEffect, useRef, useState } from 'react';
import { BrowserName } from "react-device-detect";
import { useFiles } from '@hilma/fileshandler-client';
import { useAsyncState } from '@hilma/tools';

import { ENTER_DETAILS, MESSAGE_SENT, TRY_AGAIN } from '../consts/FormSteps';
import { PlayAudio } from '../components/recording/PlayAudio.jsx';
import recording from '../components/recording/animation.gif';
import { useGenAlert } from '../context/generalAlertContext';
import { getMimeTypeByBrowser } from '../components/recording/mimeTypeByBrowser';
import { useGenStore } from '../context/generalStore';
import RotateScreenPage from './RotateScreenPage';

import '../components/recording/Recording.scss';

function RecordingPage({ rotateScreen, setCurrStep, existingRelative }) {
    const [isRecording, setIsRecording, getIsRecording] = useAsyncState(false);
    const [enoughTime, setEnoughTime] = useState(false);
    const [audioRecord, setAudioRecord] = useState()
    const [durationMill, setDurationMill] = useState(0)

    const { setRelativeAnswer, relativeAnswer, idRegex, childImage } = useGenStore();
    const audioUploader = useFiles();//audio uploader instance
    const { openGenAlert } = useGenAlert();

    const recorder = useRef();


    const resatrtRecord = () => {
        const naviRecorder = navigator.mediaDevices ? navigator.mediaDevices : navigator;
        naviRecorder.getUserMedia({ audio: true }).then((stream) => {
            recorder.current = new MediaRecorder(stream, /* { mimeType: getMimeTypeByBrowser(BrowserName) } */);
            // Set record to <audio> when recording will be finished
            recorder.current.addEventListener("dataavailable", handleRecordAvailable);
        }).catch((err) => {
            console.log(err, 'err');
        });
        
    }
    useEffect(() => {
        resatrtRecord()
    }, []);

    const recordAgain = () => {
        // resatrtRecord()
        setDurationMill(0);
        setEnoughTime(false);
    }

    const getDuration = async (audio) => {
        if (audio.duration !== Infinity)
            return audio.duration
        return new Promise((resolve, reject) => {
            setInterval(async () => { resolve(await getDuration(audio)) }, 200)
        })
    }

    //will be called when user finishes recording(on touch end)
    const handleRecordAvailable = (recordEv) => {
        const audio = new Audio();
        audio.src = URL.createObjectURL(recordEv.data)
        audio.onloadedmetadata = (e) => {
            (async () => {
                const recordedChunks = recordEv.data.size > 0 ? [recordEv.data] : [];
                const duration = await getDuration(audio)
                if (duration >= 2 && duration <= 120) {
                    // record is long enough
                    const audioBlob = new Blob(recordedChunks);
                    setRelativeAnswer((prev) => ({ ...prev, audioUploader: audioBlob }));
                    setDurationMill(duration);
                    setEnoughTime(true);
                    setAudioRecord(audio);
                } else {
                    await setIsRecording(false);
                    openGenAlert({ text: duration < 2 ? 'זמן הקלטה קצר מדי' : 'זמן הקלטה ארוך מדי', warning: 'אזהרה', noTimout: false, isPopup: false });
                }
            })()
        };




    }

    const startRecord = async () => {
        try {
            // Start recording 
            if (recorder.current) {
                try {
                    recorder.current.start(120000);
                    await setIsRecording(true);

                } catch (err) {
                    console.log('recording err', err);
                }
            }
        }
        catch (err) {
            openGenAlert({ text: err + ' אנא אשרו בהגדרות את השימוש במיקרופון', warning: 'אזהרה', noTimout: false, isPopup: false })
            console.log("err", err);
        }
    }

    const finishRecord = async () => {
        if (recorder.current) {
            await setIsRecording(false);
            recorder.current.stop();
            recorder.current.stream.getTracks().forEach((i) => i.stop());
        }
    }

    //move to EnterDetails page
    const uploadImage = async () => {

        if (existingRelative && idRegex(relativeAnswer.userId) && idRegex(relativeAnswer.imageId) && idRegex(relativeAnswer.relativeId)) {
            try {
                const audioDetails = audioUploader.upload(relativeAnswer.audioUploader);
                setRelativeAnswer((prev) => { return { ...prev, responseAudioId: audioDetails.id } })
                const result = await audioUploader.post("/api/letter-image/change-status-letter",
                    JSON.stringify({ ...relativeAnswer, responseAudioId: audioDetails.id }));

                if (result && result.data) {
                    localStorage.setItem(`${relativeAnswer.imageId}`, relativeAnswer.imageId);
                    setCurrStep(MESSAGE_SENT);
                } else {
                    setCurrStep(TRY_AGAIN);
                }
            } catch (err) {
                console.log('relativeRes catched: ', err)
                openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
            }
        } else {
            setCurrStep(ENTER_DETAILS)
        }
    }

    if (rotateScreen !== 0) return <RotateScreenPage />

    return (
        <div className="recordingContainer">
            {!enoughTime ?
                <div className="textsContainer">
                    <div className="recordingText">לחצו על כפתור הרמקול והקליטו את תגובתכם על האות</div>
                    <div className="recordingText2">החזיקו את הכפתור לאורך כל זמן ההקלטה ושחררו את הכפתור בסיום</div>
                </div>
                : <div className="textsContainer"><div className="recordingText">הפעילו ובידקו את ההקלטה שלכם</div></div>}
            {isRecording ? <img src={recording} alt='recording gif' className="recordingGif" /> : null}
            {!enoughTime
                ? <img src={'/images/RecordingSymbol.svg'} onTouchStart={startRecord} onTouchEnd={finishRecord} onContextMenu={(e) => e.preventDefault()} className="recordingSymbol" alt="Recording icon"></img>
                : <PlayAudio recordAgain={recordAgain} durationMill={durationMill} audioRecord={audioRecord} uploadImage={uploadImage} />
            }
        </div >
    )
}
export default RecordingPage
