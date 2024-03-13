import React from 'react';
import { styles } from './Sign.styles';
import { Entypo } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { vw, vh } from 'react-native-expo-viewport-units';


export const useInputText = (signType, emailRef, email, setEmail, namedRef, name, setName, passwordRef, password, setPassword, hidePassword, setHidePassword, MoveToForgotPass, confirmPasswordRef, confirmPassword, hideConfirmPassword, setConfirmPassword, setHideConfirmPassword) => {
    return (
        <>
            {signType !== 'changePass' && signType !== 'googleSignUp' ? TextInputConst(emailRef, styles.input, email, 'email', 'email-address', 'emailAddress', 'אימייל', false, /^[a-zA-Z@.-_]{0,130}$/, setEmail) : null}
            {(signType === 'signUp' || signType === 'googleSignUp') ? TextInputConst(namedRef, styles.input, name, null, null, null, 'שם הילד', false, /^[a-zA-Z\u0590-\u05EA0-9\s'",.-]{0,16}$/, setName) : null}
            {signType === 'moveTochange' || signType === 'googleSignUp' ? null :
                <View>
                    {TextInputConst(passwordRef, styles.input, password, null, null, null, (signType === 'changePass') ? 'סיסמה חדשה' : 'סיסמה', (signType === 'signIn' ? true : hidePassword), /^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,16}$/, setPassword)}
                    {(signType === 'signIn') ? null : <TouchableOpacity onPress={() => setHidePassword((prev) => !prev)} style={styles.hidePassContainer}><Entypo color='#8e918f' name={hidePassword ? "eye-with-line" : 'eye'} style={styles.hidePass} size={vw(6)} /></TouchableOpacity>}
                </View>
            }
            {signType === 'signIn' ? <TouchableOpacity onPress={MoveToForgotPass}><Text allowFontScaling={false} style={styles.changePass}>שחזור סיסמה</Text></TouchableOpacity> : null}
            {(signType === 'signIn' || signType === 'moveTochange' || signType === 'googleSignUp') ? null :
                <View>
                    {TextInputConst(confirmPasswordRef, styles.input, confirmPassword, null, null, null, (signType === 'changePass') ? 'אימות סיסמה חדשה' : 'אימות סיסמה', hideConfirmPassword, /^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,16}$/, setConfirmPassword)}
                    <TouchableOpacity onPress={() => setHideConfirmPassword((prev) => !prev)} style={styles.hidePassContainer}><Entypo color='#8e918f' name={hideConfirmPassword ? "eye-with-line" : 'eye'} style={styles.hidePass} size={vw(6)} /></TouchableOpacity>
                </View>
            }
        </>
    )
}

export const TextInputConst = (ref, style, value, autoCompleteType, keyboardType, textContentType, placeholder, secureTextEntry, regex, setValue) => {
    return (
        <TextInput allowFontScaling={false} ref={ref} style={style} required value={value} autoCompleteType={autoCompleteType} secureTextEntry={secureTextEntry} keyboardType={keyboardType} textContentType={textContentType} placeholder={placeholder} textAlign={'right'} placeholderTextColor={"#FF8000"}
            onChangeText={(value) => {
                if (regex.test(value)) {
                    setValue(value)
                }
            }} />
    )
}