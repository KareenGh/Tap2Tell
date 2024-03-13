import { action, computed, configure, makeObservable, observable, runInAction } from 'mobx';
import Axios from 'axios';
import { AsyncTools } from '@hilma/tools';
import { LettersArr } from '../consts/consts.js';
import { ImageStatus } from '../consts/ImageStatus'
import { observer } from 'mobx-react-lite';
import { useAuth } from '@hilma/auth-native'
import { Image } from 'react-native';
import variables from '../../variables';

Axios.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log(" request ", config.url)
    return config;
});
configure({ enforceActions: "always" });


export class LetterImageStore {
    // source = Axios.CancelToken.source();
    userDetails = {}
    selectedLetter = '';
    letterScoreArr = [];
    galleryImageDetails = [];
    newResponseDetails = [];
    stopAnimation = false;
    buttonPressed = false;
    relativeDetails = [];
    countPath = 0;
    allImageDetails;
    urlFromCamera;
    newFiveStars = false;
    goToResponseAnimation = false
    countOrder = 0;
    messageSent = false;
    confettiTimer = true;
    realPress = false; //acccept going back when its app button
    atCameraPage = false;
    constructor() {
        makeObservable(this, {
            userDetails: observable,
            setUserDetails: action,
            confettiTimer: observable,
            setTimer: action,
            stopTimer: action,
            selectedLetter: observable,
            setLetter: action,
            newResponseDetails: observable,
            pushNewResponseDetails: action,
            stopAnimation: observable,
            setStopAnimation: action,
            shiftnewResponseDetails: action,
            letterScoreArr: observable,
            pushNewLetter: action,
            letterPageDetails: action,
            addScoreToLetterArr: action,
            buttonPressed: observable,
            setButtonPressed: action,
            getFirstLetter: computed,
            relativeDetails: observable,
            relativeDetailsFun: action,
            goToResponseAnimation: observable,
            setGoToResponseAnimation: action,
            newResponseDetailsLength: computed,
            relativeName: computed
        })
    }
    setAtCameraPage(value) {
        this.atCameraPage = value;
    }
    setUrlFromCamera(value) {
        this.urlFromCamera = value
    }
    setRealPress(value) {
        this.realPress = value
    }

    setUserDetails(value) {
        //Set user details to show him his progress
        this.userDetails = value;
    }

    setTimer() {
        //set time to remove confetti from background
        runInAction(() => {
            this.confettiTimer = setTimeout(() => {
                runInAction(() => {
                    this.confettiTimer = false
                })
            }, 2500)

        })
    }

    stopTimer() {
        //If back to home page stop timer of confetti
        runInAction(() => {
            this.confettiTimer && clearTimeout(this.confettiTimer)
        })
    }

    setGoToResponseAnimation(value) {
        runInAction(() => {
            this.goToResponseAnimation = value
        })
    }

    setNewFiveStars(value) {
        this.newFiveStars = value
    }
    setButtonPressed(bool) {
        this.buttonPressed = bool;
    }

    //get first letter without 5 stars
    get getFirstLetter() {
        if (this.letterScoreArr.length === 0) {
            return LettersArr[0]
        }
        for (let j = 0; j < LettersArr.length; j++) {
            let found = false; // In the case of a letter with 5 stars there are no more letters with stars
            for (let i = 0; i < this.letterScoreArr.length; i++) {
                if (JSON.stringify(LettersArr[j]) === JSON.stringify(this.letterScoreArr[i].letter)) {
                    found = true
                    if (Number(this.letterScoreArr[i].score) < 5) {
                        return (this.letterScoreArr[i].letter)
                    }
                    break;
                }
            }
            if (!found) {
                return LettersArr[j];
            }
        }
    }

    get newResponseDetailsLength() {
        return this.newResponseDetails.length
    }

    get relativeName() {
        return this.relativeDetails.relativeName
    }

    get enoughScoreOrImages() {
        if (this.countPath >= 10) return true;
        for (let i = 0; i < this.letterScoreArr.length; i++) {
            if (this.letterScoreArr[i].letter === this.selectedLetter.letter) {
                if (Number(this.letterScoreArr[i].score) >= 5) {
                    return true
                }
            }
        }
    }
    scoreOfLetter(letter) {
        //check the total score of letter
        let score = 0
        for (let i = 0; i < this.letterScoreArr.length; i++) {
            if (this.letterScoreArr[i].letter === letter) {
                score = this.letterScoreArr[i].score
                break;
            }
        }
        for (let j = 0; j < this.newResponseDetailsLength; j++) {
            if (this.newResponseDetails[j].letter === letter && this.newResponseDetails[j].imageStatus === ImageStatus.APPROVED) {
                score++
            }
        }
        return score
    }

    //remove the first place of newResponseDetails arr to handle other response
    shiftnewResponseDetails() {
        if (this.newResponseDetailsLength !== 0) {
            this.newResponseDetails.shift()
        }
    }

    //add new response
    pushNewResponseDetails(newItem) {
        this.newResponseDetails.push(newItem)
        Image.prefetch(`${variables.apiUrl}${newItem.imagePath}`)
    }

    //add score to available letter
    addScoreToLetterArr(i) {
        runInAction(() => {
            const newScore = Number(this.letterScoreArr[i].score) + 1
            this.letterScoreArr[i].score = newScore
        })
    }

    //add new letter to the arr
    pushNewLetter(letter) {
        runInAction(() => {
            const newArr = this.letterScoreArr
            newArr.push({ letter: letter, score: 1 });
            this.letterScoreArr = newArr;
        })
    }

    //check if there is new path
    countImagePathMap() {
        this.countPath = 0
        for (let i = 0; i < this.galleryImageDetails.length; i++) {
            this.countPath++;
        }
        return this.countPath;
    }

    //details about the selected letter
    setLetter(letter, indx) {
        this.selectedLetter = { letter: letter, index: indx };
    }
    async letterPageDetails(isAuthenticated) {
        if (!isAuthenticated && this.userDetails && this.userDetails.id && this.userDetails.name && this.userDetails.email) {
            const idValid = this.idRegex(this.userDetails.id);
            if (idValid) {
                //create arr of letters with score
                const [err, res] = await AsyncTools.to(Axios.get(`/api/letter-image/letters-page?userId=${this.userDetails.id}`))
                if (err) {
                    console.log("letterPageDetails axios err", err);
                    throw Error()
                }
                else {
                    if (res && res.data) {
                        runInAction(() => {
                            this.letterScoreArr = res.data.letterArr
                            this.newResponseDetails = res.data.envelope //new response
                            Array.isArray(res.data.envelope) && res.data.envelope.forEach(newItem => {
                                Image.prefetch(`${variables.apiUrl}${newItem.imagePath}`)
                            })

                        })
                        return { ...res.data, firstLetter: this.getFirstLetter }
                    }
                }
            } else {
                console.log('letterPageDetails validation err');
                throw Error()
            }
        } else {
            const [err, res] = await AsyncTools.to(Axios.get(`/api/child/get-current-child`));
            if (err) {
                if (err.data && err.data.message !== 'Unauthorized') {
                    console.log("letterPageDetails axios err", err);
                    throw Error()
                }
            }
            if (res && res.data) {
                if (res.data) {
                    this.setUserDetails(res.data);
                    return this.letterPageDetails();
                } else {
                    return false;
                }
            }
        }
    }

    //get arr of imageStatus, imagePath, id and isNewResponse
    async getImageDetails() {
        const letterReg = new RegExp(/^[\u0590-\u05EA]$/)
        const letterValid = letterReg.test(this.selectedLetter.letter);
        const idValid = this.idRegex(this.userDetails.id);
        if (letterValid && idValid) {
            const [err, res] = await AsyncTools.to(Axios.get(`/api/letter-image/image-details?letter=${this.selectedLetter.letter}&userId=${this.userDetails.id}`))
            if (err) {
                console.log('image-details err:', err);
                throw Error()
            }
            else {
                this.galleryImageDetails = res.data;
            }
        } else {
            console.log('image-details validation err');
            throw Error();
        }
    }

    //change isNewResponse to 0 from 1 after envelope's press 
    async changeIsNewResponse(imageId) {
        const idValid = this.idRegex(imageId)
        if (idValid) {
            const [err, res] = await AsyncTools.to(Axios.post(
                `/api/letter-image/update-response`,
                { data: imageId }
            ))
            if (err) {
                console.log('changeIsNewResponse catched: ', err)
                throw Error()
            } else {
                console.log('changeIsNewResponse successful')
            }
        }
    }

    //set stopAnimation to new value
    setStopAnimation(value) {
        this.stopAnimation = value
    }

    async relativeDetailsFun() {
        let relativeId = this.newResponseDetails[0].relativeId;
        const isValid = this.idRegex(relativeId);
        if (isValid) {
            const [err, res] = await AsyncTools.to(Axios.get(`/api/relative/relative-details?relativeId=${relativeId}`))
            if (err) {
                console.log('relativeDetails catched: ', err)
                throw Error()
            } else {
                if (res.data[0] !== undefined) {
                    runInAction(() => {
                        this.relativeDetails = res.data[0]
                    })
                    try {
                        Image.prefetch(`${variables.apiUrl}${res.data[0].relativeImagePath}`)
                    }
                    catch (err) { }
                }
            }
        }
    }
    //Add new user to DB 
    async addNewUser(email, password, name, emailVerified) {
        const [err, res] = await AsyncTools.to(Axios.post(`/api/child/register`, { email, password, name, emailVerified }))
        if (err) {
            console.log('child/register err:', err);
            throw Error()
        }
    }

    async removeImage(imageId) {
        if (this.idRegex(imageId)) {
            const [err, res] = await AsyncTools.to(Axios.post(
                `/api/letter-image/remove-image`,
                { data: imageId }))
            if (err) {
                console.log('remove-image err:', err);
                throw Error()
            } else {
                this.allImageDetails = res.data
            }
        } else {
            console.log('remove-image validation err');
            throw Error();
        }
    }


    async stopReminding(imageId) {
        if (this.idRegex(imageId)) {
            const [err, res] = await AsyncTools.to(Axios.post(
                `/api/letter-image/stop-reminding`,
                { data: imageId }))
            if (err) {
                console.log('stop-reminding err:', err);
                throw Error()
            }
        } else {
            console.log('stop-reminding validation err');
            throw Error();
        }
    }

    idRegex(id) {
        const idReg = new RegExp(/^([a-z0-9]{8}\b)+-([a-z0-9]{4}\b)+-([a-z0-9]{4}\b)+-([a-z0-9]{4}\b)+-[a-z0-9]{12}$/);
        const isValid = idReg.test(id);
        return isValid;
    }
}