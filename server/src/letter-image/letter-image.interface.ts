export interface LetterImage {
    userId: number,
    letter: Letters,
    imageId: number,
    imageStatus: Status
    relativeId: number,
    audioId: number,
    viewedResponse: boolean
}
export enum Letters {
    ALEF = "a",
    BEIT = "b",
    GIMEL = "c",
    DALET = "d",
    HE = "e",
    VAV = "f",
    ZAYIN = "g",
    CHET = "h",
    TET = "i",
    YOD = "j",
    CAF = "k",
    LAMED = "l",
    MEM = "m",
    NUN = "n",
    SAMECH = "o",
    AYIN = "p",
    PE = "q",
    TZADI = "r",
    KOFF = "s",
    RESH = "t",
    SHIN = "u",
    TAV = "v"
}

export const ChangeLetterServer = {
    "א": 'a',
    "ב": 'b',
    "ג": 'c',
    "ד": 'd',
    "ה": 'e',
    "ו": 'f',
    "ז": 'g',
    "ח": 'h',
    "ט": 'i',
    "י": 'j',
    "כ": 'k',
    "ל": 'l',
    "מ": 'm',
    "נ": 'n',
    "ס": 'o',
    "ע": 'p',
    "פ": 'q',
    "צ": 'r',
    "ק": 's',
    "ר": 't',
    "ש": 'u',
    "ת": 'v'
}
export const ChangeLetterClient = {
    'a': "א",
    'b': "ב",
    'c': "ג",
    'd': "ד",
    'e': "ה",
    'f': "ו",
    'g': "ז",
    'h': "ח",
    'i': "ט",
    'j': "י",
    'k': "כ",
    'l': "ל",
    'm': "מ",
    'n': "נ",
    'o': "ס",
    'p': "ע",
    'q': "פ",
    'r': "צ",
    's': "ק",
    't': "ר",
    'u': "ש",
    'v': "ת"
}

export enum Status {
    APPROVED = "APPROVED",
    DISAPPROVED = "DISAPPROVED",
    PENDING = "PENDING"
}

export interface newImageDetails {
    letter: string,
    imageId: number,
    userId: string
}

export interface newStatusDetails {
    imageId: string,
    imageStatus: Status,
    responseAudioId: number,
    relativeId: string,
    userId: string,
    imagePath: string,
    letter: string
}

export interface imageId {
    data: string
}