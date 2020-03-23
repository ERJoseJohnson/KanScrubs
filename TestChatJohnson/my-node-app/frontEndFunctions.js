let globalInput = "Hi, this is John";
let inMessage;

function sendInput() {
    globalInput = document.getElementById("messageInput").value;
    console.log(globalInput);
    console.log("Running")
    alert("This is the input from customer" + globalInput);
}
module.exports.globalInput = globalInput;
console.log(window);

function storeInMessage(inputMessage) {
    inMessage = inputMessage;
}
module.exports.inputMessage = inMessage;