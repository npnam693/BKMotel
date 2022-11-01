
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyALc3NGEJuSNjZ0rrd6lSgXgRMt_-0oYEs",
    authDomain: "bkmotel-upload.firebaseapp.com",
    projectId: "bkmotel-upload",
    storageBucket: "bkmotel-upload.appspot.com",
    messagingSenderId: "255503113968",
    appId: "1:255503113968:web:3552a73ca3db3924b92c35",
    measurementId: "G-9X5HJD4DC8"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
