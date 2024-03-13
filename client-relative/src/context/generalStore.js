import React, { useContext, useState } from 'react';

const GenStoreContext = React.createContext()

export const useGenStore = () => useContext(GenStoreContext)

export const GenStoreProvider = ({ children }) => {
    const [relativeAnswer, setRelativeAnswer] = useState({ relativeImageId: null, relativeName: '', userId: '' });
    const [relativeImage, setRelativeImage] = useState({ imageLink: '/images/LittleManIcon.svg' })
    const [childImage, setChildImage] = useState({ imagePath: '', letter: '' })
    const idRegex = (id) => {
        const idReg = new RegExp(/^([a-z0-9]{8}\b)+-([a-z0-9]{4}\b)+-([a-z0-9]{4}\b)+-([a-z0-9]{4}\b)+-[a-z0-9]{12}$/);
        const isValid = idReg.test(id);
        return isValid;
    }
    // const relativeAnswer = { relativeImageId: null, relativeName: '', userId: '' }
    // const relativeImage = {
    //     imageLink: '/images/LittleManIcon.svg'
    // }
    // const childImage = { imagePath: '', letter: '' }
    const ctxValue = {
        relativeAnswer, relativeImage, childImage, setRelativeAnswer, setRelativeImage, setChildImage, idRegex
    }
    return <GenStoreContext.Provider value={ctxValue} >{children}</GenStoreContext.Provider>
}