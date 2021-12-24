const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
let bearer = 'Bearer ' + localStorage.getItem('tokenChat');


function addElement(pseudo, mail, img, firstname, lastname){

    const profilePseudo = document.createElement('h2');
    profilePseudo.id='profilePseudo';
    profilePseudo.innerHTML = pseudo;
    document.getElementById('mainContentRight').appendChild(profilePseudo);

    const profileImage = document.createElement('img');
    profileImage.id='profileImage';
    profileImage.src = './assets/images/' + img + '.png';
    document.getElementById('mainContentRight').appendChild(profileImage);

    const profileName = document.createElement('h2');
    profileName.id='profileName';
    profileName.innerHTML = firstname + " " + lastname;
    document.getElementById('mainContentRight').appendChild(profileName);

    const profileMail = document.createElement('h2');
    profileMail.id='profileMail';
    profileMail.innerHTML = mail;
    document.getElementById('mainContentRight').appendChild(profileMail);
}

// firstname: { type: String, required:true },
// lastname: { type: String, required:true },
// gender: { type: String, required:true },

function getUserInfo() {
    fetch("http://localhost:3000/api/auth/getInfo", {cache: "reload",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }, method: "POST"})
        .then(response => response.json())
        .then(saveData => {
            addElement(saveData.pseudo, saveData.email, saveData.urlProfilePicture, saveData.firstname, saveData.lastname);
            // saveData.email
        })
        .catch(err => console.log(err))
}
getUserInfo();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        let form = {
            "message" : input.value,
        }
        console.log(form);
        fetch("http://localhost:3000/api/message", {cache: "reload",headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
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
    // item.className = "other";
   item.className = "me";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});













// source for scrool:
// https://www.codegrepper.com/code-examples/javascript/auto+scroll+down+when+new+messages+come+in+css
// https://stackoverflow.com/questions/36606570/scroll-down-to-bottom-when-new-message-is-sent