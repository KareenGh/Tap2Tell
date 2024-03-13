import React, { useEffect, useMemo, useState } from 'react';
import { useFiles } from '@hilma/fileshandler-client';
import AudioAnalyser from "react-audio-analyser"

import { ENTER_DETAILS, MESSAGE_SENT, TRY_AGAIN } from '../consts/FormSteps';
import { PlayAudio } from '../components/recording/PlayAudio.jsx';
import recording from '../components/recording/animation.gif';
import { useGenAlert } from '../context/generalAlertContext';
import { getMimeTypeByBrowser } from '../components/recording/mimeTypeByBrowser';
import { useGenStore } from '../context/generalStore';
import RotateScreenPage from './RotateScreenPage';

import '../components/recording/Recording.scss';


const RecodingStatuses = { "NOTHING": null, "RECORDING": 'recording', "FINISHED": 'inactive' }

function RecordingPage({ rotateScreen, setCurrStep, existingRelative, currStep }) {
    const [recordingStatus, setRecordingStatus] = useState(RecodingStatuses.NOTHING);
    const [enoughTime, setEnoughTime] = useState(false);
    const [audioRecord, setAudioRecord] = useState()
    const [durationMill, setDurationMill] = useState(0)

    const { setRelativeAnswer, relativeAnswer, idRegex, childImage } = useGenStore();
    const audioUploader = useFiles();//audio uploader instance

    const { openGenAlert } = useGenAlert();

    const recordAgain = () => {
        setDurationMill(0);
        setEnoughTime(false);
    }
    // useEffect(() => {
    //     return () =>
    // }, [])

    //will be called when user finishes recording(on touch end)
    const handleRecordAvailable = (recordEv) => {
        const audio = new Audio(URL.createObjectURL(recordEv.data));
        audio.onloadedmetadata = (e) => {
            const recordedChunks = recordEv.data.size > 0 ? [recordEv.data] : [];
            const { duration } = e.target;
            if (duration >= 2 && duration <= 120) {
                // record is long enough
                const audioBlob = new Blob(recordedChunks);
                setRelativeAnswer((prev) => ({ ...prev, audioUploader: audioBlob }));
                setDurationMill(duration);
                setEnoughTime(true);
                setAudioRecord(audio);
            } else {
                setRecordingStatus(RecodingStatuses.FINISHED);
                openGenAlert({ text: duration < 2 ? 'זמן הקלטה קצר מדי' : 'זמן הקלטה ארוך מדי', warning: 'אזהרה', noTimout: false, isPopup: false });
            }
        };
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
                    if(currStep !== MESSAGE_SENT){
                        setCurrStep(TRY_AGAIN)
                        return;
                    }
                }
            } catch (err) {
                console.log('relativeRes catched: ', err)
                openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
            }
        } else {
            setCurrStep(ENTER_DETAILS)
        }
    }

    const startRecord = async () => {
        setRecordingStatus(RecodingStatuses.RECORDING);
    }

    const finishRecord = () => {
        setRecordingStatus(RecodingStatuses.FINISHED);
    }

    const audioProps = useMemo(() => ({
        audioType: getMimeTypeByBrowser(),
        status: recordingStatus, // Triggering component updates by changing status
        // audioSrc,
        // startCallback: (e) => {console.log("succ start", e)},
        // pauseCallback: (e) => {console.log("succ pause", e)},
        stopCallback: (e) => {
            handleRecordAvailable({ data: e })
        },
        errorCallback: (e) => { openGenAlert({ text: "סליחה, אירעה שגיאה בעת ההקלטה, נא נסו שנית" }) }
    }), [recordingStatus])

    if (rotateScreen !== 0) return <RotateScreenPage />

    return (
        <div className="recordingContainer">
            {!enoughTime ?
                <>
                    <div className="textsContainer">
                        <div className="recordingText">לחצו על כפתור הרמקול והקליטו את תגובתכם על האות</div>
                        <div className="recordingText2">החזיקו את הכפתור לאורך כל זמן ההקלטה ושחררו את הכפתור בסיום</div>
                    </div>
                </>
                : <div className="textsContainer"><div className="recordingText">הפעילו ובידקו את ההקלטה שלכם</div></div>}

            {recordingStatus === RecodingStatuses.RECORDING ? <img src={recording} alt='recording gif' className="recordingGif" /> : null}

            <AudioAnalyser {...audioProps} />

            {!enoughTime
                ? <img src={'/images/RecordingSymbol.svg'} onTouchEnd={finishRecord} onContextMenu={(e) => e.preventDefault()} onTouchStart={startRecord} className="recordingSymbol" alt="Recording icon"></img>
                : <PlayAudio recordAgain={recordAgain} durationMill={durationMill} audioRecord={audioRecord} uploadImage={uploadImage} />
            }
        </div >
    )
}
export default RecordingPage