import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground';
import { useGenAlert } from '../contexts/generalAlertContext';
import { useAuth } from '@hilma/auth-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useLetterImageStoreContext } from '../stores/index.store';
import { Entypo } from '@expo/vector-icons';
import { TextInputConst } from '../components/sign/InputText';

const passwordRegex = new RegExp(/^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/);
const sameNumbers = new RegExp(/(\d)\1{2}/);
const consecutiveNumbers = [1234, 2345, 3456, 4567, 5678, 6789, 78910];

function ChangePass(props) {
    let { openGenAlert } = useGenAlert();
    const letterStore = useLetterImageStoreContext();
    const auth = useAuth();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideconfPassword, setHideconfPassword] = useState(true)
    const passwordsValidation = async () => {
        if (currentPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0) {
            await openGenAlert({ text: 'אנא מלאו את כל הפרטים', isPopup: false });
            return false;
        };
        if (currentPassword.length < 8 || newPassword.length < 8 || confirmNewPassword.length < 8) {
            await openGenAlert({ text: 'סיסמה צריכה להיות בעלת לפחות 8 תווים', isPopup: false });
            return false;
        };
        if (currentPassword.length > 16 || newPassword.length > 16 || confirmNewPassword.length > 16) {
            await openGenAlert({ text: 'סיסמה צריכה להיות עד 16 תווים', isPopup: false });
            return false;
        };
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(newPassword)) {
            await openGenAlert({ text: 'הסיסמה חייבת להכיל מספר, תו מיוחד, אות גדולה ואות קטנה באנגלית', isPopup: false })
            return;
        };
        for (let i = 0; i < consecutiveNumbers.length; i++) {
            const consecutiveNumbersReg = new RegExp(`(?=${consecutiveNumbers[i]}).{4,}$`);
            if (consecutiveNumbersReg.test(newPassword)) {
                await openGenAlert({ text: 'בסיסמה אין לכלול מספרים עוקבים', isPopup: false })
                return;
            };
        };
        if (sameNumbers.test(newPassword)) {
            await openGenAlert({ text: 'חוזק סיסמה חלש, אנא שנו את רצף המספרים השווים', isPopup: false });
            return;
        };
        if (!passwordRegex.test(currentPassword)) {
            await openGenAlert({ text: 'סיסמה אינה תקינה', isPopup: false });
            return false;
        };
        if (!passwordRegex.test(newPassword)) {
            await openGenAlert({ text: 'סיסמה חדשה אינה תקינה', isPopup: false });
            return false;
        };
        if (newPassword !== confirmNewPassword) {
            await openGenAlert({ text: 'סיסמאות לא שוות', isPopup: false });
            return false;
        };
        return true;
    };

    const changePass = async () => {
        const validation = await passwordsValidation();
        if (validation) {
            try {
                const res = await auth.login(`/api/child/change-child-password`, { username: letterStore.userDetails.email, newPassword: newPassword, currentPass: currentPassword });
                if (res && res.user === 'PassNotCorrect') {
                    await openGenAlert({ text: 'סיסמה נוכחית לא נכונה', isPopup: false });
                    return;
                }
                if (res && res.user === 'googleLogin') {
                    await openGenAlert({ text: 'משתמש רשום כחשבון גוגל, אין באפשרותך לשנות סיסמה', isPopup: false });
                    return;
                }
                letterStore.setLetter(null);
                props.navigation.navigate('letters-page');
                await openGenAlert({ text: 'סיסמתך שונתה בהצלחה', isPopup: false });
                return;
            } catch (err) {
                console.log('child/change-child-password err: ', err);
                await openGenAlert({ text: 'אירעה שגיאה', isPopup: false });
            };
        };

    };
    const textInput = () => {
        return (
            <View style={styles.inputContainer}>
                {TextInputConst(currentPasswordRef, styles.input, currentPassword, null, null, null, 'סיסמה נוכחית', true, /^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,16}$/, setCurrentPassword)}
                <View>
                    {TextInputConst(newPasswordRef, styles.input, newPassword, null, null, null, 'סיסמה חדשה', hidePassword, /^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,16}$/, setNewPassword)}
                    <TouchableOpacity onPress={() => setHidePassword((prev) => !prev)} style={styles.hidePassContainer}><Entypo color='#8e918f' name={hidePassword ? "eye-with-line" : 'eye'} style={styles.hidePass} size={vw(6)} /></TouchableOpacity>
                </View>
                <View>
                    {TextInputConst(confirmNewPasswordRef, styles.input, confirmNewPassword, null, null, null, 'אימות סיסמה חדשה', hideconfPassword, /^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,16}$/, setconfirmNewPassword)}
                    <TouchableOpacity onPress={() => setHideconfPassword((prev) => !prev)} style={styles.hidePassContainer}><Entypo color='#8e918f' name={hideconfPassword ? "eye-with-line" : 'eye'} style={styles.hidePass} size={vw(6)} /></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            <View style={{ flex: 1, position: 'absolute' }}>
                <TopBarAndBackground navigation={props.navigation} />
            </View>
            <Text allowFontScaling={false} style={styles.mainText}>שינוי סיסמה</Text>
            <KeyboardAwareScrollView>

                {textInput()}
                <TouchableOpacity onPress={changePass} style={styles.signUpButton} >
                    <Text allowFontScaling={false} style={styles.signUpButtonText}>שנה סיסמה</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    input: {
        backgroundColor: "#F7FDDC",
        opacity: 0.75,
        borderRadius: 21,
        borderColor: "#FF8000",
        borderWidth: 1,
        height: vh(5.5),
        width: vw(75),
        color: "#FF8000",
        marginTop: vh(4),
        fontFamily: 'MPLUS1pRegular',
        paddingRight: vw(3),
        fontSize: vh(2)
    },
    inputContainer: {
        marginTop: vh(4),
        flex: 1,
        // backgroundColor:'red',
        alignItems: 'center',
        // justifyContent:'center'
    },
    mainText: {
        marginTop: vh(12),
        textAlign: "center",
        fontSize: vw(13),
        color: '#FF8000',
        fontFamily: 'MPLUS1pBold',
        zIndex: 10,
    },
    signUpButtonText: {
        textAlign: "center",
        fontSize: vh(3),
        color: 'white',
        fontFamily: 'MPLUS1pBold'
    },
    signUpButton: {
        backgroundColor: "#FF8000",
        borderRadius: 21,
        height: vh(5.5),
        width: vw(75),
        alignSelf: "center",
        // marginTop: vh(10),
        textAlign: "center",
        // top: vh(-15)
        marginTop: vh(10)
    },
    hidePass: {
        paddingLeft: vw(2),
    },
    hidePassContainer: {
        position: 'absolute',
        top: vh(5),
        justifyContent: 'center',

    },
})

export default ChangePass