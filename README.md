# tap2tell

### !important notes to yourself:
~ Umm, ok. Commits done by a "shalvaeisenberg" --> it's most likely me ("shanike"), from Hilma's Mac laptop...


### The real important stuff:
1) clone our project - git clone https://github.com/hilma-tech/tap2tell.git

2) Do ```$ git submodule update --init --recursive``` to clone the code of ```client-child``` (React Native - Expo project) to our project 

3) Do ```$ npm install``` in client-child, server and client-relative directories


4) Use the dump that is in ```./dumps/dump.sql``` to clone the database to your computer (sql). Dont forget to create tap2tell database. In case of cant connect to database try drop the database and create it again. 

5) And finallty, install expo *globally* if you haven't before ```$ npm install --g expo-cli```

6) Add ```.env``` file in server folder(copy the info from .production.env and change the info to be local and HOST=exp://your local address:19000/--
REACT_APP_DOMAIN=http://your local address:8080)

7) To run the project:
    * To start the child side do: 
        ```cd client-child, npm start``` (expo project - react native)
    * To start the relative side do:
        ```cd client-relative, npm start``` (react.js project)
    * To start the server do:
        ```cd server, npm run start``` (to watch mode run: ```npm run start:dev```)

8) To use email verification, open in server folder .env file and write: SEND_EMAIL_PASS=zfhcnkpgwpyfqoce
SEND_EMAIL_ADDR=tap2tellhilma@gmail.com
Email password: tap2tell

9)For google login:
GOOGLE_CLIENT_ID: 222361604434-rd0n3msciqkg5cmnglqt092kiketgnn4.apps.googleusercontent.comclient 

IOS_CLIENT_ID : 222361604434-pk2e8ho9h51pj33o9cm8aq7d8f7vargl.apps.googleusercontent.com
ANDROID_CLIENT_ID : 222361604434-s076h4v9ph4t79df8p70olohhqu0fe2l.apps.googleusercontent.com
GOOGLE_SECRET:4XbwwWllxC6m5av23I1yGSLI


project id firebase - tap2tell-401ab
