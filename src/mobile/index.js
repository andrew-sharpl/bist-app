import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './App';
import initMainApi from "./api/main";
import initMockApi from "./api/mock";

// if using devUrl, replace with your local IP address
const devUrl = `http://192.168.2.197:5000/`;
const prodUrl = `http://d2.bist.spalmurray.com/`;
const url = prodUrl;
const api = initMainApi(url);
// const api = initMockApi(url);


registerRootComponent(() => <App api={api} />);