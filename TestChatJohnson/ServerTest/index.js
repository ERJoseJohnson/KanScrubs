// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");
let express = require("express");
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var username;
var pwd;
var customerIncomingMessage;

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
//     next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/send', (req, res) => {
    var data = req.body;
    username = data.username;
    pwd = data.password;
    console.log(`Username: ${username} Password: ${pwd}`);
    res.status(200).send({ success: "POST Success!!" });
    res.end();
});

//app.options('*', cors());
app.post('/customerMessage', cors(), (req, res) => {
    var data = req.body;
    console.log('This is what we get', data);
    customerIncomingMessage = data.incomingMessage;
    console.log(`Message: ${customerIncomingMessage}`);
    rainbowSDK.im.sendMessageToJid(customerIncomingMessage, 'e887cc4d73c1483eba4e2214798d196c@sandbox-all-in-one-rbx-prod-1.rainbow.sbg');
    res.status(200).send({ success: "POST Success!!" });
    res.end();
});

// app.get('/send', (req, res) => {
//     var data = req.query;
//     username = data.username;
//     pwd = data.password;
//     console.log(`Username: ${username} Password: ${pwd}`);
//     res.status(200).send({ success: "GET Success!!" });
//     res.end();
// });

app.listen(8080);
/*
    In the event too many node tasks are running:
    Taskkill /IM node.exe /F
*/


// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "JohnDoe@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "IAmJohnDoes1!" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "d97f6d505a4d11eabf7e77d14e87b936",
        appSecret: "PnUdSynzoXiaNB5zalaM4SdITGLK6M33VgdnohO7FDXjMEHuzGZ4pZ6aM4oBXnwO"
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
            zippedArchive: false/*,
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


rainbowSDK.events.on('rainbow_onready', function () {
    // do something when the SDK is connected to Rainbow
    console.log("HELLO, Rainbow on ready.");

});

rainbowSDK.events.on('rainbow_onerror', function (err) {
    // do something when something goes wrong
    console.log("HELLO, Rainbow on error.");
});

//Spongebob
rainbowSDK.events.on("rainbow_onmessagereceived", (message) => {
    // Check if the message is not from you
    // TODO: Change this statememt to check for message from you.
    if (!message.fromJid.includes(rainbowSDK.connectedUser.jid_im)) {
        // Check that the message is from a user and not a bot
        if (message.type === "chat") {
            // Answer to this user
            $.ajax({
                url: "/incomingMessage",
                data: { message: message.content },
                type: "GET",
                success: function (data) {
                    console.log(data.success);
                }
            });
            // rainbowSDK.im.sendMessageToJid("Hello! How may I help you? This is Spongebob" + username + pwd, message.fromJid);
            // Do something with the message sent
            console.log(message);
        }
    }
});

// // Get process.stdin as the standard input object.
// var standard_input = process.stdin;

// // Set input character encoding.
// standard_input.setEncoding('utf-8');

// // Prompt user to input data in console.
// console.log("Please input text in command line.");

// // When user input data and click enter key.
// standard_input.on('data', function (data) {

//     // User input exit.
//     if(data === 'exit\n'){
//         // Program exit.
//         console.log("User input complete, program exit.");
//         process.exit();
//     }else
//     {
//         // Print user input in console.
//         console.log('User Input Data : ' + data);
//         rainbowSDK.im.sendMessageToJid(data, "767c85aa34f24257936f224d3c6f266d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");
//     }
// });
