//react
import React, { useState } from 'react';
import ContentLoader, { Facebook } from 'react-content-loader'

//style
import '../components/home/Home.scss';

//components
import { RECORDING } from '../consts/FormSteps.js';
import { useGenStore } from '../context/generalStore';
import RotateScreenPage from './RotateScreenPage';

const APPROVED = "APPROVED";
const DISAPPROVED = "DISAPPROVED";

function HomePage(props) {
    let { childImage } = useGenStore()
    let { setRelativeAnswer } = useGenStore();
    const [imageLoaded, setImageLoaded] = useState(false)
    const changeStatusLetter = async (status) => {
        setRelativeAnswer((prev) => { return { ...prev, imageStatus: status, imageId: props.imageId } })
        props.setCurrStep(RECORDING);
    }

    if (props.rotateScreen !== 0) {
        return <RotateScreenPage />
    } else {
        return (
            <div className="container1">
                {/* <ContentLoader viewBox="0 0 380 70"> */}
                {/* <rect x="0" y="0" rx="5" ry="5" width="70" height="370" /> */}
                {/* </ContentLoader> */}
                {!imageLoaded ? <div className="fade-in-image"></div> : null}
                <img onLoad={() => setImageLoaded(true)} style={{ opacity: imageLoaded ? 1 : 0, position: imageLoaded ? 'relative' : 'absolute' }} src={childImage.imagePath} className={"exampleImage"} alt="Kid's letter"></img>
                <div className="text1">האם האות ש{childImage.fullName}<br></br> יצר/ה היא {childImage.letter}?</div>
                <div className="symbolsContainer">
                    <img src={'/images/Approved.svg'} className="symbols" onClick={() => changeStatusLetter(APPROVED)} alt="Approve"></img>
                    <img src={'/images/Disapproved.svg'} className="symbols" onClick={() => changeStatusLetter(DISAPPROVED)} alt="Disapprove"></img>
                </div>
            </div>
        )
    }
}

export default HomePage
