// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");
let express = require("express");
var app = express();
var username;
var pwd;

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/send', (req, res)=>{
    var data = req.query;
    username = data.username;
    var pwd = data.password;
    console.log(`Username: ${username} Password: ${pwd}`);
    res.status(200).send({success: "OK"});
    res.end();
});

app.get('/send', (req, res) =>{
    var data = req.query;
    username = data.username;
    pwd = data.password;
    console.log(`Username: ${username} Password: ${pwd}`)
});

app.listen(5000);

// Define your configuration
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
            rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Spongebob" + username + pwd, message.fromJid);
            // Do something with the message sent
            console.log(message);
        }
    }
});

let options1 = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "mr.krabs@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "M0neyM0ney!" // To replace by your developer credentials
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
let rainbowSDK1 = new RainbowSDK(options1);

// Start the SDK
rainbowSDK1.start();


rainbowSDK1.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("HELLO, Rainbow1 on ready.");
    
});

rainbowSDK1.events.on('rainbow_onerror', function(err) {
    // do something when something goes wrong
    console.log("HELLO, Rainbow1 on error.");
});

//Krabs
rainbowSDK1.events.on("rainbow_onmessagereceived", (message) => {
    // Check if the message is not from you
    if(!message.fromJid.includes(rainbowSDK1.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if( message.type === "chat") {
            // Answer to this user
            rainbowSDK1.im.sendMessageToJid("Hello! How may I help you? This is Krabs" + username + pwd, message.fromJid);
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
        rainbowSDK1.im.sendMessageToJid(data, "767c85aa34f24257936f224d3c6f266d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");

    }
});
