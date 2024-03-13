import React, { useContext, useRef, useState } from 'react';
import { GeneralAlert } from '../components/genericComponents/generalAlerts';

const randomKey = () => Math.random().toString().substr(0, 4)

const GenAlertContext = React.createContext()

export const useGenAlert = () => useContext(GenAlertContext)

export const GenAlertProvider = ({ children }) => {
    const alertTO = useRef(null);

    const [showAlert, setShowAlert] = useState(false)

    const closeAlert = () => { setShowAlert(false) }

    const openGenAlert = async (obj) => {
        // useful for popup - you can use it as so:
        // let userAccepts = await openGenAlertSync({ text, isPopup: { okayText: "מתאים לי", cancelText: "בטל" } })
        // the other way is to pass a cb to openGenAlert

        if (typeof obj !== "object" || Array.isArray(obj)) return;
        clearTimeout(alertTO.current)
        return await new Promise((resolve, reject) => {
            const popupCb = res => { resolve(res) }
            const alertObj = { key: Number(alertTO.current) || randomKey(), key: alertTO.current, text: obj.text, warning: obj.warning || false, block: obj.block || false, noTimeout: obj.noTimeout || false }
            if (obj.isPopup) alertObj.isPopup = { ...obj.isPopup, popupCb, closeSelf: () => { setShowAlert(false) } }
            setShowAlert(alertObj)
            if (!obj.isPopup && !obj.noTimeout) alertTO.current = setTimeout(closeAlert, 5000)
        })
    }


    const ctxValue = {
        openGenAlert, closeAlert
    }

    return <GenAlertContext.Provider value={ctxValue} >
        {children}
        {showAlert && showAlert.text ? <GeneralAlert key={showAlert.key || "k"} text={showAlert.text} warning={showAlert.warning} center={showAlert.center} isPopup={showAlert.isPopup} noTimeout={showAlert.noTimeout} /> : null}
    </GenAlertContext.Provider>
}

// * example:
// / first of all get the context:
// const genAlertCtx = useGenAlert()
// open an alert: (nice text at the bottom left of the screen)
// genAlertCtx.openGenAlert({ text: "user info was updated successfully" });
// open a popup: (dialog with the use)
// genAlertCtx.openGenAlert({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } });
// / and to get the user's answer add:
// / 1:
// genAlertCtx.openGenAlert({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } }, (answer) => {  } );
// / or 2:
// let answer = await genAlertCtx.openGenAlertSync({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } });