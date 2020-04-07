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

// Upon pressing Login button, send a dictionary(logindict) to backend, backend updates newcreds, and subsequently options (both done in updateBoth).

logindict = {login: "patrickstar@sutd.mymail.sutd.edu.sg", password: "Under@R0ck", user: "Patrick"};

function updateBoth(dictfromReact) {
    newcreds = {credentials: {
        login: dictfromReact["login"],
        password: dictfromReact["password"]
    }}
    
    options = Object.assign(options, newcreds);
    console.log(newcreds);
}

updateBoth(logindict);

// Instantiating and starting SDK should be in a function?????

var asdf = "rainbowSDK" + logindict["user"];

console.log(`This is asdf: ${asdf}`);

function instantiatingandStart(rainbowSDKname) {
    
    rainbowSDKname = new RainbowSDK(options);
    
    rainbowSDKname.start();
}

instantiatingandStart(asdf);

// console.log(`This is login: ${options.credentials.login}, and this is password: ${options.credentials.password}`);


// Dictionary is to keep track who is logged to which SDK.
dictionary = {'Spongebob': "RainbowSDKSpongebob", 'Krabs': "RainbowSDKKrabs", 'Sandy': "RainbowSDKSandy" };

// dictionary = {};
dictionary[logindict["user"]] = asdf;
// console.log(dictionary);

var keys = Object.keys(dictionary);


// for(var i = 0; i < keys.length;i++){
//     //keys[i] for key
//     //dictionary[keys[i]] for the value
//  }

// When I update the dictionary outside, will the while loop take into account the new entry???? #TODO
while (true) {
    for (var i = 0; i < keys.length; i++) {
        // For each user currently logged in,
        dictionary[keys[i]].events.on("rainbow_onmessagereceived", (message) => {
        // Check if the message is not from you
        if(!message.fromJid.includes(dictionary[keys[i]].connectedUser.jid_im)) {
            // Check that the message is from a user and not a bot
            if(message.type === "chat") {
                // Answer to this user
                dictionary[keys[i]].im.sendMessageToJid("Hello! How may I help you? This is Spongebob" + username + pwd, message.fromJid);
                // Do something with the message sent
                console.log(message);
            }
        }
    });
    }
}





// rainbowSDK.events.on('rainbow_onready', function() {
//     // do something when the SDK is connected to Rainbow
//     console.log("HELLO, Rainbow on ready.");
// });

// rainbowSDK.events.on('rainbow_onerror', function(err) {
//     // do something when something goes wrong
//     console.log("HELLO, Rainbow on error.");
// });




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
        rainbowSDKPatrick.im.sendMessageToJid(data, "767c85aa34f24257936f224d3c6f266d@sandbox-all-in-one-rbx-prod-1.rainbow.sbg");

    }
});
