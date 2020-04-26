// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "josejohnson@mymail.sutd.edu.sg", // To replace by your developer credendials
        password: "7f*}3K]mQg!3" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "d97f6d505a4d11eabf7e77d14e87b936",
        appSecret: "PnUdSynzoXiaNB5zalaM4SdITGLK6M33VgdnohO7FDXjMEHuzGZ4pZ6aM4oBXnwO"
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
    console.log("Does this work?, not too sure what this tells me though.")
});

rainbowSDK.events.on('rainbow_onmessagereceived', (message) => {

    // Check if the message comes from a user
    if (message.type === "chat") {
        // Do something with the message       
        console.log("Recived message!")
    }
});