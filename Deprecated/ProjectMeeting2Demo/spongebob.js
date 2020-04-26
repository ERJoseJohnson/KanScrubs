// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "spongebob@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "ABRIDGED" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "ABRIDGED",
        appSecret: "ABRIDGED"
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

//Spongebob
rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
    // Check if the message is not from you
    if(!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if( message.type === "chat") {
            // Answer to this user
            rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Spongebob", message.fromJid);
            // Do something with the message sent
            console.log(message);
        }
    }
});

// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Please input text in command line.");

// When user input data and click enter key.
standard_input.on('data', function (data) {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        console.log('User Input Data : ' + data);
        rainbowSDK.im.sendMessageToJid(data, "767c85aa34f24257936f224d3c6f266d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");
    }
});
