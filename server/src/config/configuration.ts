import { env } from "process";

export default () => ({
    auth: {
        ttl: {
            'Child': 604800
        },
        access_logger: {
            enable: true, //Set to false if you want to disable
            tries: 7,
            minutes: 10
        },

        loginTTL: 18000,
        verification_email: {
            welcome_to: "tap2tell",
            verifyPath: "/child/email-verify",
            html: `<div>כדי להמשיך בתהליך ההרשמה, אנא 
            <a href="${env.REACT_APP_DOMAIN}/api/child/email-verify?token={{token}}">לחץ כאן לאישור</a>
            <br></br>
            <p>יש לשים לב שאתם פותחים את הקישור מהטלפון ולא מהמחשב</p>
            <br></br>
            <p> אם אינכם רואים את הקישור, עדכנו את המייל כלא ספאם והוא יופיע לכם:)</p>
            </div>`,
            text: 'ברוכים הבאים! צעד אחרון ואתם רשומים',
            logoDiv: null,
            logoPath: null
        },

        // secretOrKey?: string;

        accessToken_cookie: 'kkl',
        reset_password_email: {
            welcome_to: "tap2tell",
            changePath: '/child/change-password',
            html: `<div style="direction: rtl; background-color: rgba(247, 253, 220, 0.3);">
            <div style="padding: 10px;">
            <h3 style="color: #FF8000; font-size: 17px;">ברוכים השבים לTap2tell!</h3>
            <p style="font-size: 17px; margin-top: -3px; color: black;">לחצו על הקישור <a href="${env.REACT_APP_DOMAIN}/api/child/change-password?token={{token}}">כאן</a> על מנת לשנות את סיסמתכם לאתר</p>
            <br></br>
            <p>יש לשים לב שאתם פותחים את הקישור מהטלפון ולא מהמחשב</p>
            <br></br>
            <p> אם אינכם רואים את הקישור, עדכנו את המייל כלא ספאם והוא יופיע לכם:)</p>
            <p style="font-size: 10px; color: red;">*במידה ולא ביקשתם לשנות את ססמתכם, אנא התעלמו מאימייל זה</p>
            </div>
            </div>`,
            text: `<h1>"שינוי סיסמה"</h1>`,
            subject: `שינוי סיסמה`,
        }
    },

    app_name: 'tap2tell', //english

    app_name_he: 'tap2tell', //hebrew

    roleAccess: {
        CHILD: {
            components: ['letters-page', 'entrance', 'letter-gallery', 'letter-picture', 'camera', 'confirm-image', 'message-sent', 'msg-from-relative', 'response', 'image-starts-with-letter'],
            defaultHomePage: 'entrance',
        }
    }
});
