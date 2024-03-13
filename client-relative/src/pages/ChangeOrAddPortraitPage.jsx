//react
import React from 'react';
import Resizer from "react-image-file-resizer";

//style
import '../components/changeOrAddPortrait/ChangeOrAddPortrait.scss';

//hilma
import { FileInput } from '@hilma/fileshandler-client';

import { useGenStore } from '../context/generalStore';
import { useGenAlert } from '../context/generalAlertContext';

function ChangeOrAddPortraitPage(props) {
    let { setRelativeAnswer } = useGenStore();
    let { relativeImage } = useGenStore();
    let { setRelativeImage } = useGenStore();
    const { openGenAlert } = useGenAlert();


    const goBack = () => {
        props.setSizeMB(0);
        props.setButtonWasPressed(false);
    }
    const handleImageChange = async (value) => {
        if (props.filesUploader.uploadedFiles[0] && value.link) {
            let img = value;

            if (value.file.size > 5000000) {
                //resize image to smaller size
                const imgType = value.type.split('/')[1];
                const resizedImg = await resizeFile(value.file, imgType);
                console.log('value.file: ', value.file);
                console.log('resizedImg: ', resizedImg);

                //delete from files handler the file because we want to add the resized one:
                props.filesUploader.deleteAll();
                //and then upload the resized image to files handler
                img = props.filesUploader.upload(resizedImg);
            }

            props.setSizeMB(0)
            props.setPath(img.link)
            setRelativeAnswer((prev) => { return { ...prev, relativeImage: img.fileName, relativeImageId: img.id } })
            setRelativeImage({ ...relativeImage, imageLink: img.link, changeImageStyle: 'relativeImage' })
        }
    };
    const handleUploadError = err => {
        if (err.type === 'wrong-type') {
            openGenAlert({ text: `היית אמור להעלות תמונה אבל במקום זה העלאת קובץ מסוג ${err.mimeType}`, warning: 'אזהרה', noTimout: false, isPopup: false })
            return;
        } else if (err.type === 'file-size') {
            props.setSizeMB(5);
            props.setPath('/images/LittleManIcon.svg');
            setRelativeImage((prev) => { return { ...prev, imageLink: undefined } })
        }
    }

    const resizeFile = (file, mimeType) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                3000,
                3000,
                mimeType,
                90,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    return (
        <>
            <div className='changeOrAddPortraitContainer'>
                <div className="changeOrAddPortraitBackground" onClick={goBack}>
                </div>
                <div className="mainContainer">
                    <img src={relativeImage.imageLink === '/images/LittleManIcon.svg' || relativeImage.imageLink === undefined ? '/images/LittleManIcon.svg' : relativeImage.imageLink} className='littleManWithoutCircle' alt="Man icon" ></img>
                    <div className="optionContainer">
                        <div>
                            <div>
                                <label htmlFor="image-input" >
                                    <img src={'/images/PencilIcon.svg'} className="PencilIcon" alt="Pencil icon" onClick={(e) => handleImageChange(e)} />
                                </label>
                            </div>
                            <FileInput sizeLimit={15000} type="image" filesUploader={props.filesUploader} onChange={(e) => handleImageChange(e)} onError={handleUploadError} id="image-input" ></FileInput>
                            <div className="editText">{props.path === '/images/LittleManIcon.svg' ? 'אנא הוסיפו תמונה' : 'שנו תמונה'} </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                {props.sizeMB !== 0 && <div className="bigImage">{props.sizeMB !== 1 ? 'תמונה כבדה מדי, אנא בחרו תמונה אחרת' : 'התמונה כבדה,ייקח כמה שניות לטעון אותה'} </div>}
            </div>
        </>
    )
}

export default ChangeOrAddPortraitPage