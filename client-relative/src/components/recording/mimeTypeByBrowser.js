import { BrowserTypes, browserName } from "react-device-detect"

const converter = {
    [BrowserTypes.Firefox]: "audio/webm",
    [BrowserTypes.Chrome]: "audio/webm",
    [BrowserTypes.Opera]: "audio/webm",
    [BrowserTypes.InternetExplorer]: "audio/webm",
}

export function getMimeTypeByBrowser() {
    try {

        const browserNameSplit = browserName.split(" ")
        const browser = browserNameSplit[browserNameSplit.length - 1]
        return converter[browser]||"audio/mp3"
    } catch (e) {
        return "audio/mp3"
    }
}
