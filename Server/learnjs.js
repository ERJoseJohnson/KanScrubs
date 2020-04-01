let RainbowSDK = require("rainbow-node-sdk");
let express = require("express");
var app = express();
var username;
var pwd;



let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "spongebob@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "Kr@bbyP@tty69" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "82246ae05a3611eabf7e77d14e87b936",
        appSecret: "OLt1Qpu7fsCDNvT0r42waj0l4EeLe1Wb2nox0vpWGrpuqg4uunxwztDbJFAJKfwD"
    },
    // Logs options
    logs: {
        enableConsoleLogs: false,
        enableFileLogs: false,
        "color": true,
        "level": 'debug',
        "customLabel": "vincent01",
        "system-dev": {
            "internals": false,
            "http": false,
        }, 
        file: {
            path: "/var/tmp/rainbowsdk/",
            customFileName: "R-SDK-Node-Sample2",
            level: "debug",
            zippedArchive : false/*,
            maxSize : '10m',
            maxFiles : 10 // */
        }
    },
    // IM options
    im: {
        sendReadReceipt: true
    }
};
// Upon pressing Login button, send a dictionary(logindict) to backend, backend updates newcreds, and subsequently options (both done in updateBoth).

logindict = {login: "123333", password: "456"};

newcreds = {credentials: {
    login: "patrickstar@mymail.sutd.edu.sg", // To replace by your developer credendials
    password: "Under@R0ck" // To replace by your developer credentials
}}

function updateBoth(dictfromReact) {
    newcreds = {credentials: {
        login: dictfromReact["login"],
        password: dictfromReact["password"]
    }}
    
    options = Object.assign(options, newcreds);
    console.log(newcreds);
}

updateBoth(logindict);

console.log(`This is login: ${options.credentials.login}, and this is password: ${options.credentials.password}`);