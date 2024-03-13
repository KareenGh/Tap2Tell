//react
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios';

//expo
import * as GoogleSignIn from 'expo-google-sign-in';

//image
import Arrow from '../../../assets/images/message-sent/Arrow.svg'
import GoogleIcon from '../../../assets/icon/google.svg'

//components
import SvgImage from '../generic-components/SVGImage.jsx';
import { styles } from './Sign.styles.js';
import { useGenAlert } from '../../contexts/generalAlertContext';
import { useLetterImageStoreContext } from '../../stores/index.store';
import SVGImage from '../generic-components/SVGImage.jsx';

//hilma
import { useAuth } from '@hilma/auth-native';
import { emailValidation, nameValidation, PasswordValidation, SignValidation } from '../../consts/validationReg';
import { useSignWithGoogle } from './GoogleSignInFun';
import { useInputText } from './InputText';

function Sign(props) {
    const googleSignInFunc = useSignWithGoogle()
    let { openGenAlert } = useGenAlert();
    const auth = useAuth();
    const letterStore = useLetterImageStoreContext();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [googleType, setGoogleType] = useState(false);
    let { signType } = props;
    // let { props.setSignType } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [loginLoaded, setLoginLoaded] = useState(true);
    const emailRef = useRef();
    const confirmPasswordRef = useRef();
    const passwordRef = useRef();
    const namedRef = useRef();


    useEffect(() => {
        initAsync()
    }, [])


    //Check if user exists
    const startPlay = async (e) => {
        email.trim();
        name.trim();
        password.trim();
        confirmPassword.trim();
        if (signType === 'signUp') {
            if (name.length === 0 || confirmPassword === 0) {
                await openGenAlert({ text: 'אנא מלאו את כל הפרטים', isPopup: false });
                return;
            };
        };
        const signValid = SignValidation(email, password);
        if (signValid !== 'pass validation') {
            await openGenAlert({ text: signValid, isPopup: false });
            return;
        }
        if (signType === 'signUp') {
            const nameValid = nameValidation(name);
            if (nameValid !== 'pass validation') {
                await openGenAlert({ text: nameValid, isPopup: false });
                return;
            };
            const validationPass = PasswordValidation(password, confirmPassword);
            if (validationPass === 'pass validation') {
                try {
                    setLoginLoaded(false)
                    const res = await Axios.get(`/api/child/find-user?username=${email}`);
                    setLoginLoaded(true)
                    if (res && res.data && (res.data === 'EmailNotVerified' || res.data === 'UserHasNoPassword' || res.data === 'Exist')) {
                        await openGenAlert({ text: 'משתמש כבר קיים', isPopup: false });
                        signIn();
                        return;
                    } else {
                        await letterStore.addNewUser(email, password, name, 0);
                        await openGenAlert({ text: 'אנא אשרו משתמש במייל', isPopup: true });
                        signIn();
                    }
                }
                catch (err) {
                    console.log('add new user catch: ', err);
                    props.navigation.navigate('entrance');
                    await openGenAlert({ text: 'ישנה שגיאה, נסה שנית מאוחר יותר', isPopup: false });

                }
            } else {
                await openGenAlert({ text: validationPass, isPopup: false });
                return;
            }
        }
        else {
            const emailNotVerified = await Axios.get(`/api/child/email-verified-check?email=${email}`)
            if (emailNotVerified.data === 'emailVerified') {
                setLoginLoaded(false)
                const res = await auth.login(`/api/child/login`, { username: email, password: password })
                setLoginLoaded(true)
                if (res && res.msg && res.msg.data && res.msg.data.key === 'UserBlocked') {
                    await openGenAlert({ text: `יותר מדי ניסיונות כניסה, אנא נסו שנית מאוחר יותר`, isPopup: false });
                    return;
                };
                if (res && res.msg && res.msg.data && res.msg.data.key === 'UserHasNoPassword') {
                    await openGenAlert({ text: 'משתמש רשום כחשבון גוגל, אנא התחברו דרך גוגל', isPopup: false });
                    return;
                } else if (res && res.msg && res.msg.data && res.msg.data.key === 'PassDosentMatch') {
                    await openGenAlert({ text: 'שם משתמש או הסיסמה אינם נכונים', isPopup: false });
                    return;
                } else {
                    (res && res.user) && letterStore.setUserDetails({ name: res.user.userName, id: res.user.id, email: email, googleLogin: false })
                    props.navigation.navigate('instruction');
                }
            } else if (emailNotVerified.data === 'emailNotVerified') {
                await openGenAlert({ text: 'אנא אשרו משתמש במייל', isPopup: true });
                return;
            } else {
                await openGenAlert({ text: 'משתמש לא קיים', isPopup: false });
                return;
            }
        }
    }

    const signUp = async () => {
        props.setSignType('signUp');
        props.actionToChange = 'changed';

    }

    const signIn = () => {
        props.setSignType('signIn');
        props.actionToChange = 'changed';

    }

    // const changePassType = () => {
    //     props.setSignType('changePass');
    //     props.actionToChange = 'changed';
    // };

    // const moveTochange = () => {
    //     props.setSignType('moveTochange');
    //     props.actionToChange = 'changed';
    // };

    const initAsync = async () => {
        await GoogleSignIn.initAsync({
            clientId: '209116238391-jbdr4q6nkd6c1hgaq2psqv8vdnkr86hg.apps.googleusercontent.com',
            webClientId: '209116238391-jpabe0ecrsumfoc9b7n09vk548ibq80i.apps.googleusercontent.com'
        });
    };
    const signWithGoogle = async () => {
        if (signType === 'googleSignUp') {
            const nameValid = nameValidation(name);
            if (nameValid !== 'pass validation') {
                await openGenAlert({ text: nameValid, isPopup: false });
                return;
            }
        };
        const googleRes = await googleSignInFunc(signType, name, password, setLoginLoaded, setGoogleType, googleType, setEmail, email)
        if (googleRes === 'NotGoogleSignIn') {
            await openGenAlert({ text: 'משתמש לא רשום כחשבון גוגל', isPopup: false });
            GoogleSignIn.disconnectAsync();
            return;
        }
        if (googleRes === 'letters-page') {
            props.navigation.navigate('instruction');
            setEmail('')
            setGoogleType(false);
            return;
        };
        if (googleRes === 'NotExist') {
            await openGenAlert({ text: 'משתמש לא קיים, אנא הירשמו', isPopup: false });
            props.setSignType('googleSignUp');
            return;
        };
        if (googleRes === 'Exist') {
            await openGenAlert({ text: 'משתמש קיים', isPopup: false });
            signIn();
            return;
        };
        if (googleRes === 'Error') {
            await openGenAlert({ text: 'אירעה שגיאה', isPopup: false });
            return;
        }
    }

    const changeToGoogleSignUp = () => {
        props.setSignType('googleSignUp');
        props.actionToChange = 'changed';
    }


    //Forget password 
    const MoveToForgotPass = async () => {
        setPassword('');
        setConfirmPassword('');
        props.setSignType('moveTochange');
        props.actionToChange = 'changed';
    };

    const sendChangePassMail = async () => {

        const emailValid = emailValidation(email);
        if (emailValid === 'pass validation') {
            try {
                const res = await Axios.post(`/api/child/reset-password`, { email: email })
                if (res && res.data && !res.data.validateEmail) {
                    await openGenAlert({ text: 'ישנה שגיאה בקבלת הנתונים', isPopup: false })
                    return;
                } else if (res && res.data && !res.data.verifiedEmail) {
                    await openGenAlert({ text: 'משתמש לא קיים', isPopup: false })
                    return;
                };
                props.actionToChange = 'changed';
                openGenAlert({ text: 'היכנס למייל כדי לשנות את סיסמתך', isPopup: true });
            } catch (err) {
                console.log('child/reset-password err: ', err);
                openGenAlert({ text: 'אירעה שגיאה', isPopup: false })
            }
        } else {
            await openGenAlert({ text: emailValid, isPopup: false });
            return;
        };
    }

    const changePass = async () => {
        const emailValid = emailValidation(email);
        if (emailValid === 'pass validation') {
            let validation = PasswordValidation(password, confirmPassword);
            if (validation === 'pass validation') {
                try {
                    const res = await Axios.post(`/api/child/replace-password`, { token: props.token, email: email, newPassword: password })
                    signIn()
                    setPassword('');
                    await openGenAlert({ text: 'סיסמתך שונתה בהצלחה', isPopup: false });
                    return;
                } catch (err) {
                    console.log('child/replace-password err: ', err);
                    await openGenAlert({ text: 'אירעה שגיאה', isPopup: false });
                }
            } else {
                await openGenAlert({ text: validation, isPopup: false });
                return;
            }
        } else {
            await openGenAlert({ text: emailValid, isPopup: false });
            return;
        }
    }

    const pageTitle = () => {
        if (signType === 'signIn') {
            return 'התחברות';
        }
        if (signType === 'signUp') {
            return 'הרשמה';
        }
        if (signType === 'changePass') {
            return 'שנה סיסמה';
        };
        if (signType === 'moveTochange') {
            return 'שחזור סיסמה'
        }
        if (signType === 'googleSignUp') {
            return 'הרשמה דרך גוגל'
        }
    }

    const buttonText = () => {
        if (signType === 'signIn') {
            return 'התחברו';
        }
        if (signType === 'signUp') {
            return 'הרשמו';
        }
        if (signType === 'changePass') {
            return 'שנה סיסמה';
        };
        if (signType === 'moveTochange') {
            return 'שלח סיסמה חדשה'
        }
        if (signType === 'googleSignUp') {
            return 'הרשמו'
        }
    }
    const buttonFunction = async () => {
        if (signType === 'changePass') {
            changePass();
            return;
        }
        if (signType === 'moveTochange') {
            sendChangePassMail();
            return;
        }
        if (signType === 'googleSignUp') {
            signWithGoogle();
            return;
        };
        startPlay();
        return;
    };

    if (loginLoaded) {
        return (
            <View style={styles.logContainer}>
                <TouchableOpacity onPress={signIn} style={{ ...styles.toopArrow }}>
                    <SvgImage source={Arrow} style={{ ...styles.arrow, display: (signType === 'signIn') ? "none" : "flex" }}></SvgImage>
                </TouchableOpacity>
                <KeyboardAwareScrollView>
                    <Text allowFontScaling={false} style={{ ...styles.signUpText, fontSize: (signType === 'changePass' || signType === 'moveTochange' || signType === 'googleSignUp') ? vw(10) : vw(15), marginTop: (signType === 'changePass' || signType === 'moveTochange' || signType === 'googleSignUp') ? vh(18) : vh(0) }}>{pageTitle()}</Text>
                    <View style={{ alignItems: 'center' }}>
                        {signType !== 'changePass' && signType !== 'moveTochange' && signType !== 'googleSignUp' ?
                            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                                <View style={{ position: 'relative', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.googleConnect} onPress={signType === 'signIn' ? signWithGoogle : changeToGoogleSignUp}>
                                        <>
                                            <SVGImage style={{ width: vw(5) }} source={GoogleIcon} />
                                            <Text allowFontScaling={false} style={styles.textGoogle}>{(signType === 'signIn') ? 'התחברו' : 'הרשמו'} באמצעות Google</Text>
                                        </>
                                    </TouchableOpacity>
                                    <View style={styles.signWithEmail}>
                                        <View style={styles.line}></View>
                                        <Text allowFontScaling={false} style={styles.signWithEmailText}>{(signType === 'signIn') ? 'התחברו' : 'הרשמו'} באמצעות אימייל</Text>
                                        <View style={styles.line}></View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback> : null}
                        {useInputText(signType, emailRef, email, setEmail, namedRef, name, setName, passwordRef, password, setPassword, hidePassword, setHidePassword, MoveToForgotPass, confirmPasswordRef, confirmPassword, hideConfirmPassword, setConfirmPassword, setHideConfirmPassword)}
                        <TouchableOpacity style={{ ...styles.signUpButton, marginTop: signType === 'moveTochange' || signType === 'changePass' || signType === 'googleSignUp' ? vh(4) : vh(10) }} onPress={buttonFunction} ><Text allowFontScaling={false} style={styles.signUpButtonText}>{buttonText()}</Text></TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                {(signType === 'signIn') ?
                    <View style={styles.linkContainer}>
                        <Text allowFontScaling={false} style={styles.linkText1}>אין לך חשבון? </Text>
                        <TouchableOpacity onPress={signUp}>
                            <Text allowFontScaling={false} style={styles.linkText2}>הרשמה</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </View>

        );
    } else {
        return (
            <View style={{ height: vh(100), width: vw(100), alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: '100%', width: '100%' }}
                    source={require('../../../assets/images/MainBackground.png')} />
                <Text allowFontScaling={false} style={styles.loadingText}>בודק נתונים...</Text>
            </View>
        )
    }

}

export default Sign;