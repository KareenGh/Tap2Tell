import React, { useContext, useState } from 'react';
import { GeneralAlert } from '../components/generic-components/generalAlerts';


const GenAlertContext = React.createContext()

export const useGenAlert = () => useContext(GenAlertContext)

export const GenAlertProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false)

    /**
     * @param {string} text 
     * @param {boolean} isPopup if true, will render a popup
     */
    const openGenAlert = async ({text, isPopup}) => {
        setShowAlert(false)
        if (typeof text !== "string") return;
        setShowAlert({ text: text, isPopup: isPopup })

    }

    const ctxValue = {
        openGenAlert
    }

    return <GenAlertContext.Provider value={ctxValue} >
        {children}
        {showAlert ? <GeneralAlert setShowAlert={setShowAlert} text={showAlert.text} isPopup={showAlert.isPopup} /> : null}
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
// let answer = await genAlertCtx.openGenAlert({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } });