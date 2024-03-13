const passwordRegex = new RegExp(/^[a-zA-Z\u0590-\u05EA0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/);
const sameNumbers = new RegExp(/(\d)\1{2}/);
const consecutiveNumbers = [1234, 2345, 3456, 4567, 5678, 6789, 78910];
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
const nameRegex = new RegExp(/^[a-zA-Z\u0590-\u05EA\s'",.-]{2,40}$/);

export const PasswordValidation = (password, confirmPassword) => {

    if (password.length === 0 || confirmPassword.length === 0) {
        return 'אנא מלאו את כל הפרטים';
    };
    if (password.length < 8) {
        return 'סיסמה צריכה להיות בעלת לפחות 8 תווים';
    };
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password)) {
        return 'הסיסמה חייבת להכיל מספר, תו מיוחד, אות גדולה ואות קטנה באנגלית';
    };
    for (let i = 0; i < consecutiveNumbers.length; i++) {
        const consecutiveNumbersReg = new RegExp(`(?=${consecutiveNumbers[i]}).{4,}$`);
        if (consecutiveNumbersReg.test(password)) {
            return 'בסיסמה אין לכלול מספרים עוקבים';
        };
    };
    if (sameNumbers.test(password)) {
        return 'חוזק סיסמה חלש, אנא שנו את רצף המספרים השווים';
    };
    if (!passwordRegex.test(password)) {
        return 'סיסמה אינה תקינה';
    };
    if (password !== confirmPassword) {
        return 'סיסמאות לא שוות';
    };
    return 'pass validation'
};

export const SignValidation = (email, password) => {
    if (email.length === 0 || password.length === 0) {
        return 'אנא מלאו את כל הפרטים';
    };
    if (!emailRegex.test(email)) {
        return 'כתובת מייל אינה תקינה';
    };
    if (password.length < 8) {
        return 'סיסמה צריכה להיות בעלת לפחות 8 תווים';
    };
    if (password.length > 16) {
        return 'סיסמה צריכה להיות עד 16 תווים';
    };
    if (!passwordRegex.test(password)) {
        return 'סיסמה אינה תקינה';
    };
    return 'pass validation';
};

export const emailValidation = (email) => {
    if (email.length === 0) {
        return 'אנא מלאו את כתובת המייל';
    } else if (!emailRegex.test(email)) {
        return 'כתובת מייל אינה תקינה';
    };
    return 'pass validation';
};

export const nameValidation = (name) => {
    if (name.length < 2) {
        return 'שם צריך להיות בעל לפחות 2 תווים';
    };
    if (!nameRegex.test(name)) {
        return 'שם זה אינו תקין';
    };
    return 'pass validation';
};