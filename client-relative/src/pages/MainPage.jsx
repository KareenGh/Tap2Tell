//react
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

//hilma
import { AsyncTools } from '@hilma/tools';

//components
import Dots from '../components/dots/Dots.jsx';
import BackAndLogo from '../components/genericComponents/BackAndLogo.jsx';
import EnterDetailsPage from './EnterDetailsPage.jsx';
import HomePage from './HomePage.jsx';
import MessageSentPage from './MessageSentPage.jsx';
// import RecordingPage from './RecordingPage.jsx';
import TryAgainPage from '../pages/TryAgainPage';
import RecordingPage from './RecordingPage'
import './MainPage.style.css';
//general store
import { useGenAlert } from '../context/generalAlertContext'
import { useGenStore } from '../context/generalStore.js';

//other
import Axios from 'axios';
// import * as Linking from 'expo-linking';

const HOME_PAGE = 0;
const RECORDING = 1;
const ENTER_DETAILS = 2;
const MESSAGE_SENT = 3;
const TRY_AGAIN = 4;

const ORANGE = "orangeDot";
const WHITE = "whiteDot";
const NO_COLOR = "noColorDot";

let deviceUuid = uuidv4()

const MainPage = (props) => {
    const uuid = localStorage.getItem(`device-uuid`);
    console.log('uuid from local storage: ', uuid);
    let { id } = useParams();
    const [currStep, setCurrStep] = useState(HOME_PAGE, WHITE, WHITE);
    let { openGenAlert } = useGenAlert();
    let { relativeAnswer } = useGenStore();
    let { setRelativeAnswer } = useGenStore();
    const [existingRelative, setExistingRelative] = useState(false)
    let { childImage } = useGenStore()
    let { setChildImage } = useGenStore()
    const { idRegex } = useGenStore()
    const [doesntExist, setDoesntExist] = useState(false)
    const [imageStatus, setImageStatus] = useState()

    const findUuid = async () => {
        const [err, res] = await AsyncTools.to(Axios.get(`/api/letter-image/find-uuid?uuid=${deviceUuid}`))
        if (err) {
            setImageStatus('err');
            console.log("find-uuid axios err", err);
            setCurrStep(TRY_AGAIN)
            await openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
            return;
        }
        if (res && !res.data) {
            setRelativeAnswer((prev) => { return { ...prev, relativeUuid: deviceUuid } })
            localStorage.setItem(`device-uuid`, deviceUuid);
        } else {
            deviceUuid = uuidv4();
            findUuid();
            return;
        }
    }

    const getCurrStepComp = () => {
        switch (currStep) {
            case TRY_AGAIN:
                return [<TryAgainPage imageStatus={imageStatus} rotateScreen={props.rotateScreen} id={id} />];
            case HOME_PAGE:
                return [<HomePage rotateScreen={props.rotateScreen} imageId={id} setCurrStep={setCurrStep} />, ORANGE, WHITE, WHITE];
            case RECORDING:
                return [<RecordingPage existingRelative={existingRelative} rotateScreen={props.rotateScreen} setCurrStep={setCurrStep} currStep={currStep} />, ORANGE, ORANGE, WHITE];
            case ENTER_DETAILS:
                return [<EnterDetailsPage rotateScreen={props.rotateScreen} setCurrStep={setCurrStep} currStep={currStep} />, ORANGE, ORANGE, ORANGE];
            case MESSAGE_SENT:
                return [<MessageSentPage rotateScreen={props.rotateScreen} setCurrStep={setCurrStep} />, NO_COLOR, NO_COLOR, NO_COLOR];
            default:
                return [<HomePage rotateScreen={props.rotateScreen} imageId={id} setCurrStep={setCurrStep} />, ORANGE, WHITE, WHITE];
        }
    }

    useEffect(() => {
        const fetchResponse = async () => {
            if (idRegex(id)) {
                const isValidUuid = idRegex(uuid);
                let imageStatus;
                // let score = 0;
                const [err, res] = await AsyncTools.to(Axios.get(`/api/letter-image/check-status-score?id=${id}&uuid=${isValidUuid ? uuid : null}`))
                console.log('res check-status-score', res);
                if (err) {
                    setImageStatus('err')
                    console.log("fetchResponse axios err", err);
                    setDoesntExist(true)
                    setCurrStep(TRY_AGAIN)
                    await openGenAlert({ text: 'אירעה שגיאה, אנא נסה/י שנית מאוחר יותר', warning: 'אזהרה', noTimout: false, isPopup: false })
                    return;
                } else {
                    if (res && res.data === false && !idRegex(res.data.userId)) {
                        setImageStatus('deleted');
                        setDoesntExist(true)
                        if (currStep !== MESSAGE_SENT) {
                            setCurrStep(TRY_AGAIN)
                            return;
                        }
                    }
                    if (res && res.data) {
                        setChildImage({
                            fullName: res.data.fullName,
                            imagePath: res.data.imagePath,
                            letter: res.data.letter
                        })
                        imageStatus = res.data.imageStatus
                        setRelativeAnswer((prev) => { return { ...prev, userId: res.data.userId } })
                        getCurrStepComp()
                    }
                    if (imageStatus === 'APPROVED' || imageStatus === 'DISAPPROVED') {
                        //Someone else answered
                        setImageStatus('answered');

                        if (currStep !== MESSAGE_SENT) {
                            setCurrStep(TRY_AGAIN)
                            return;
                        }
                        return;
                    }
                    if (res && res.data[0] !== undefined) {
                        //A relative replied, we will take his existing details
                        setExistingRelative(true)
                        setRelativeAnswer((prev) => { return { ...prev, relativeName: res.data[0].relativeName, relativeImagePath: res.data[0].relativeImagePath, relativeId: res.data[0].id } })
                    } else {
                        findUuid()
                    }
                }
            } else {
                setImageStatus('err')
                setDoesntExist(true);
                setCurrStep(TRY_AGAIN)
                return;
            }
        }
        if (!childImage.fullName && !doesntExist && id !== "email-verify" && currStep !== TRY_AGAIN) {
            fetchResponse()
        }
    }, [openGenAlert, id, relativeAnswer, uuid, childImage, doesntExist, idRegex, setChildImage, setRelativeAnswer])



    const [currStepComponent, firstDotColorVar, secondDotColorVar, thirdDotColorVar] = useMemo(getCurrStepComp, [currStep, existingRelative, id, props.rotateScreen]);

    if (id === 'email-verify') {
        return (
            <div className={'pageContainer'}>
                <BackAndLogo />
                <div className="emailtext">תודה על האישור</div>
                <div className="emailMonster">
                    <img src={'/images/MessageSentLittleMonster.svg'} alt="Little monster"></img>
                </div>
            </div>
        )
    } else if ((childImage.letter && childImage.imagePath) || doesntExist) {
        return (
            <div className={'pageContainer'}>
                <BackAndLogo />
                {currStepComponent}
                {!existingRelative && <Dots firstDotColorVar={firstDotColorVar} secondDotColorVar={secondDotColorVar} thirdDotColorVar={thirdDotColorVar} />}
            </div>
        );
    } else {
        return (
            <div className={'pageContainer'}>
                <img alt='loading' className='loadImage' src={'/gif/animation.gif'} />
                <BackAndLogo />
            </div>
        )
    }
}

export default MainPage;