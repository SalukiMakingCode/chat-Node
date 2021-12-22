const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        let form = {
            "message" : input.value,
            "userId" : "3",  //a récupérer dans le token en le déhashant
        }
        console.log(form);
        fetch("http://localhost:3000/api/message", {cache: "reload",headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, method: "POST", body: JSON.stringify(form)})
            .then(response => response.text())
            .then(saveData => {
                console.log(saveData);
            })
            .catch(err => console.log(err))
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});