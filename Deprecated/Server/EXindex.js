var express = require('express');
var app = express();
app.get('usr', function(req, res){ 
    var myText = req.query.testing; //mytext is the name of your input box
    res.send('Your Text:' +myText); 
    console.log(myText);
}); 

// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "peiyuan_tiang@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "P>4zGxC+Ma{1" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "82246ae05a3611eabf7e77d14e87b936",
        appSecret: "OLt1Qpu7fsCDNvT0r42waj0l4EeLe1Wb2nox0vpWGrpuqg4uunxwztDbJFAJKfwD"
    },
    // Logs options
    logs: {
        enableConsoleLogs: true,
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
// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.start();



rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("HELLO, Rainbow on ready.");
});

rainbowSDK.events.on('rainbow_onerror', function(err) {
    // do something when something goes wrong
    console.log("HELLO, Rainbow on error.");
});

// //Spongebob
// rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
//     // Check if the message is not from you
//     if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
//         // Check that the message is from a user and not a bot
//         if( message.type === "chat") {
//             // Answer to this user
//             rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Spongebob", message.fromJid);
//             // Do something with the message sent
//             console.log(message);
//         }
//     }
// });


// // Sandy
// rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
//     // Check if the message is not from you
//     if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
//         // Check that the message is from a user and not a bot
//         if( message.type === "chat") {
//             // Answer to this user
//             rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Sandy", message.fromJid);
//             // Do something with the message sent
//             console.log(message);
//         }
//     }
// });