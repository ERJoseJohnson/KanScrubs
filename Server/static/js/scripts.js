// Submit the stuff function
$(document).ready(function(){
    
    var onReady = function onReady() {
        console.log('[Hello World] :: On SDK Ready !');
    };
    
    var onLoaded = function onLoaded() {
        console.log('[Hello World] :: On SDK Loaded !');
    
        rainbowSDK
            .initialize('APPID', 'APPSECRET')
            .then(() => {
                console.log('[Hello World] :: Rainbow SDK is initialized!');
            })
            .catch(err => {
                console.log('[Hello World] :: Something went wrong with the SDK.', err);
            });
    };
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);
    
    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
    rainbowSDK.start();
    rainbowSDK.load();
});

function submitFunc(){
    var user = document.getElementById("usr").elements[0].value;
    var pwd = document.getElementById("pwd").elements[0].value;
    console.log(user);
    console.log(pwd);
    $.ajax({
        url: "/send",
        data: {username: user, password: pwd},
        type: "POST",
        success: function (data){
            console.log(data.success);
        }
    });
}