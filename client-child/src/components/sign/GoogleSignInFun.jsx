import * as GoogleSignIn from 'expo-google-sign-in';
import { useLetterImageStoreContext } from '../../stores/index.store';
import { useAuth } from '@hilma/auth-native';



export const useSignWithGoogle = () => {
    const letterStore = useLetterImageStoreContext();
    const auth = useAuth();

    const registerFun = async (email, password, name) => {
        const res = await auth.login(`/api/child/register`, { email: email, password: password, name: name, emailVerified: 1 })
        if (res && res.success) {
            letterStore.setUserDetails({ name: res.user.fullName, id: res.user.id, email: res.user.username, googleLogin: true });
            return 'letters-page';
        } else {
            GoogleSignIn.disconnectAsync();
            return 'Error';
        };
    }

    return async (signType, name, password, setLoginLoaded, setGoogleType, googleType, setEmail, email) => {
        try {
            if (email && signType === 'googleSignUp' && googleType) {
                return registerFun(email, password, name);
            };
            //Move to google login
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                //check if the user signed up. If so, get access to Private Screens
                setLoginLoaded(false);
                setGoogleType(true)
                const res = await auth.login(`api/child/google-login`, { email: user.email });
                setLoginLoaded(true);
                if (res && res.user === 'NotGoogleSignIn') {
                    return 'NotGoogleSignIn';
                }
                if (signType === 'signIn') {
                    if (res && res.success && res.user) {
                        letterStore.setUserDetails({ name: res.user.fullName, id: res.user.id, email: user.email, googleLogin: true })
                        return 'letters-page';
                    }
                    else {
                        setEmail(user.email);
                        GoogleSignIn.disconnectAsync();
                        return 'NotExist';
                    }
                } else {
                    if (res && res.success && res.user) {
                        GoogleSignIn.disconnectAsync();
                        return 'Exist';
                    }
                    else {
                        return registerFun(user.email, password, name);
                    };
                };
            } else {
                setGoogleType(false);
            }
        } catch ({ message }) {
            setGoogleType(false);
            alert('login: Error:' + message);
        };
    };
};
