import * as Analytics from 'expo-firebase-analytics';


export let LettersArr = [
    'א',
    'ב',
    'ג',
    'ד',
    'ה',
    'ו',
    'ז',
    'ח',
    'ט',
    'י',
    'כ',
    'ל',
    'מ',
    'נ',
    'ס',
    'ע',
    'פ',
    'צ',
    'ק',
    'ר',
    'ש',
    'ת']
export const MaximumScore = 5;

export const AnalyticsEvent = async (value, event, valueTitle) => {
    // await Analytics.setDebugModeEnabled(true);
    await Analytics.setAnalyticsCollectionEnabled(true)
    // await Analytics.setUserProperty(valueTitle, value);

    await Analytics.logEvent(event, {
        name: `${value}`,
        contentType: `${value}`,
        itemId: `${value}`,
        value: `${value}`
    });
};

