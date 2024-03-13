import Constants from 'expo-constants';
import { Platform } from 'react-native';

const { manifest } = Constants;

let localIP = Platform.select({
	web: () => `127.0.0.1`,
	default: () => `${manifest && manifest.debuggerHost && manifest.debuggerHost.split(':').shift()}`
})();

const ENV = {
	development: {
		apiUrl: `http://${localIP}:8080`,
		socketUri: `ws://${localIP}:8080`,
		domain: `exp://${localIP}:19000/--/`
	},
	production: {
		apiUrl: "https://tap2tell.carmel6000.com",
		socketUri: "wss://tap2tell.carmel6000.com",
		domain: 'tap2tell://'
	}
};

const variables = !!__DEV__ ? ENV.development : ENV.production;

export default variables;
