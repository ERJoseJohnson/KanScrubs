let RainbowSDK = require("rainbow-node-sdk");
// let express = require("express");
// var app = express();

// app.get('/option1', (req, res)=>{
//     res.sendFile(__dirname + "/views/index.html");
// });

function send(message){

    let contacts = rainbowSDK.contacts.getAll();
    for (let elems in contacts) {
        console.log(elems)
    }
    let options = {
        rainbow: {
            host: "sandbox"
        },
        credentials: {
            login: "johndoe@mymail.sutd.edu.sg", // To replace by your developer credendials
            password: "IAmJohnDoes1!" // To replace by your developer credentials
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
    // Instantiate the SDK
    let rainbowSDK = new RainbowSDK(options);

    // Start the SDK
    rainbowSDK.start();

    // rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
    //     // Check if the message is not from you
    //     if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
    //         // Check that the message is from a user and not a bot
    //         if( message.type === "chat") {
    //             // Answer to this user
    //             rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Spongebob" + username + pwd, message.fromJid);
    //             // Do something with the message sent
    //             console.log(message);
    //         }
    //     }
    // });
    rainbowSDK.im.sendMessageToJid(message, contacts[0].jid_im);
    rainbowSDK.stop() ; 
}