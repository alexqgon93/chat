document.getElementById("login").addEventListener("click", login);
document.getElementById("send").addEventListener("click", sendMessage);
getMessages();

function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
function sendMessage() {
    let name = firebase.auth().currentUser.displayName;
    let text = document.getElementById("text").value;

    let messageToSend = {
        nombre: name,
        mensaje: text
    };
    firebase.database().ref("messages").push(messageToSend);
}

function getMessages() {

    firebase.database().ref("messages").on("value", (data) => {
        console.log(data.val());
        document.getElementById("mensajes").innerHTML = "";
        for (let key in data.val()) {
            let element = data.val()[key];
            let p = document.createElement("p");
            p.append(element.mensaje);
            document.getElementById("mensajes").append(p);
        }
    })
    console.log("get");
} 