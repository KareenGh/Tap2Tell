//react
import React, { useState, useEffect, useRef } from 'react';

//style
import '../components/enterDetails/EnterDetails.scss';

//hilma
import { useFiles } from '@hilma/fileshandler-client';

//components
import { MESSAGE_SENT, TRY_AGAIN } from '../consts/FormSteps.js';
import ChangeOrAddPortrait from './ChangeOrAddPortraitPage';
import { useGenAlert } from '../context/generalAlertContext'
import { NO_SPECIAL_CHARS_REGEX } from '../consts/regexes';
import { useGenStore } from '../context/generalStore';
import RotateScreenPage from './RotateScreenPage';

function EnterDetailsPage(props) {
    let { setRelativeAnswer, relativeAnswer, relativeImage, childImage, idRegex } = useGenStore();
    const { openGenAlert } = useGenAlert();

    const [loadingInformation, setLoadingInformation] = useState(false);//if fetching the answer right now
    const [buttonWasPressed, setButtonWasPressed] = useState(false);
    const [path, setPath] = useState('/images/LittleManIcon.svg')
    const [changeText, setChangeText] = useState('');
    const [newValue, setNewValue] = useState('')
    const [sizeMB, setSizeMB] = useState(0)

    const filesUploader = useFiles();
    const audioUploader = useFiles();//audio uploader instance

    const inputElement = useRef(null);


    useEffect(() => {
        const isNameValid = NO_SPECIAL_CHARS_REGEX.test(changeText);
        if (isNameValid) {
            setNewValue(changeText)
        }
    }, [changeText, newValue])

    const FilledDetails = async () => {
        if (loadingInformation) return;//if loading the relative answer

        //if the relative doesn't have user id or it is not valid this means he is new and we need to validate his details
        if (!relativeAnswer.userId || idRegex(relativeAnswer.userId)) {
            //if the relative didn't choose a picture
            if (relativeImage.imageLink === '/images/LittleManIcon.svg') {
                openGenAlert({ text: 'אנא הוסף תמונה', warning: 'אזהרה', noTimout: false, isPopup: false })
                return;
            }

            //if the relative didn't enter his name
            if (!relativeAnswer.relativeName.length) {
                openGenAlert({ text: 'אנא הוסף שם', warning: 'אזהרה', noTimout: false, isPopup: false })
                return;
            }
        }

        setSizeMB(1)
        await setRelativeAnswer((prev) => { return { ...prev, relativeName: newValue } })
        setLoadingInformation(true)
        const isValid = Validations() //Check validation

        if (!isValid) return;

        //Update image status and isNewResponse at letter_image
        try {
            const { relativeImageId, relativeName, imageId, relativeUuid, imageStatus, userId } = relativeAnswer;
            const relativeBody = JSON.stringify({ relativeImageId, relativeName, imageId, relativeUuid });

            const relativeRes = await filesUploader.post("/api/relative/add-new-relative", relativeBody)
            const relativeId = relativeRes.data
            if (!relativeId && !idRegex(relativeId)) {
                if (props.currStep !== MESSAGE_SENT) {
                    props.setCurrStep(TRY_AGAIN)
                    return;
                }
                return;
            } else {
                try {
                    const audioDetails = audioUploader.upload(relativeAnswer.audioUploader);
                    await audioUploader.post("/api/letter-image/change-status-letter",
                        JSON.stringify({
                            imageId,
                            imageStatus,
                            responseAudioId: audioDetails.id,
                            relativeId: relativeId,
                            imagePath: childImage.imagePath,
                            letter: childImage.letter,
                            userId
                        }))
                    localStorage.setItem(`device-uuid`, relativeAnswer.relativeUuid);

                    localStorage.setItem(`${relativeAnswer.imageId}`, relativeAnswer.imageId);
                    props.setCurrStep(MESSAGE_SENT);
                } catch (err) {
                    console.log('relativeRes catched: ', err)
                    openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
                }
            }
        }
        catch (err) {
            console.log('changeStatusLetter catched: ', err)
            openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
        }
    }

    const Validations = () => {
        //Relative name validation 
        const nameValid = NO_SPECIAL_CHARS_REGEX.test(relativeAnswer.relativeName);
        if (!nameValid) {
            openGenAlert({ text: 'שם זה אינו תקין', warning: 'אזהרה', noTimout: false, isPopup: false })
            return false;
        }

        //Image id and device uuid validation
        if (!idRegex(relativeAnswer.imageId) && !idRegex(relativeAnswer.relativeUuid)) {
            return false;
        }
        return true;
    }

    const PressToHandlePortrait = () => {
        if (!loadingInformation) {
            setButtonWasPressed(true);
        }
    }
    const handlePaste = (e) => {
        e.clipboardData.items[0].getAsString(text => {
            const pasteText = newValue + text
            setNewValue(pasteText)
            relativeAnswer = { ...relativeAnswer, relativeName: newValue }
        });
    }
    const handleChange = (e) => {
        const name = e.target.value;

        const isNameValid = NO_SPECIAL_CHARS_REGEX.test(name);
        if (isNameValid) {
            setChangeText(name)
            setRelativeAnswer((prev) => { return { ...prev, relativeName: name } })

            setNewValue(name)
            relativeAnswer = { ...relativeAnswer, relativeName: newValue }
        }
    }
    if (props.rotateScreen !== 0) {
        return (
            <RotateScreenPage />
        )
    }
    return (
        <div className="enterDetailsContainer">
            <img src={path} onClick={PressToHandlePortrait} className="littleIconMan" alt="a little icon of a man"></img>
            <div className="enterDetailsText">{path === '/images/LittleManIcon.svg' ? 'לחצו כדי להוסיף תמונה' : 'לחצו כדי לשנות תמונה'}</div>
            <div className="enterDetailsText2">הכניסו את שמכם ביחס ל{childImage.fullName}</div>
            <div className="enterDetailsText3">למשל 'דוד חיים' או 'סבתא רחל'</div>
            <input ref={inputElement}
                id='name' type="text" name="name" placeholder="שם" autoComplete='off' value={newValue} onPaste={handlePaste} onChange={handleChange}></input>
            <img style={{ opacity: loadingInformation ? 0.5 : 1 }} src={'/images/EnvelopeIcon.svg'} className="envelopeIcon" onClick={FilledDetails} alt="an icon of an envelope"></img>
            {buttonWasPressed && sizeMB !== 1 ? <ChangeOrAddPortrait sizeMB={sizeMB} setSizeMB={setSizeMB} path={path} setPath={setPath} setButtonWasPressed={setButtonWasPressed} filesUploader={filesUploader} /> : null}
            {(sizeMB !== 0 && !buttonWasPressed) && <div className="bigImageEnter">{sizeMB !== 1 ? 'תמונה כבדה מדי, אנא בחר תמונה אחרת' : 'תגובתך בטעינה, אנא הישאר בעמוד זה'} </div>}


        </div>
    )
}

export default EnterDetailsPage
