const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
let bearer = 'Bearer ' + localStorage.getItem('tokenChat');
let userId = localStorage.getItem('userId');

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
        socket.emit('chat message', input.value, userId);
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

socket.on('chat message', function(msg, user) {
  putOneLineChat(msg, user);
});


function putOneLineChat (msg, user) {
    const timespan = new Date().getTime();

    const item = document.createElement('div');
    if (user === userId) item.classList.add('bubbleMsg', 'me');
    else item.className = "bubbleMsg other";
    item.id = "bubble" + timespan;
    document.getElementById('chatDiv').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    if (user !== userId) {
        const profilePictureOther = document.createElement('img');
        profilePictureOther.src = "assets/images/4.png";   //catcher le chiffre de l'image
        profilePictureOther.alt = "";
        document.getElementById("bubble" + timespan).appendChild(profilePictureOther);
    }

    const item2 = document.createElement('span');
    item2.id = "span" + timespan;
    document.getElementById("bubble" +timespan).appendChild(item2);

    const item3 = document.createElement('p');
    item3.textContent = msg;
    document.getElementById("span" +timespan).appendChild(item3);

    const item4 = document.createElement('small');
    item4.className="yourTimeMsg";
    const d = new Date();
    item4.textContent = d.getHours() + ":" + d.getMinutes();
    document.getElementById("span" +timespan).appendChild(item4);

    if (user === userId) {
        const profilePictureMe = document.createElement('img');
        profilePictureMe.src = "assets/images/4.png";   //catcher le chiffre de l'image
        profilePictureMe.alt = "";
        document.getElementById("bubble" + timespan).appendChild(profilePictureMe);
    }
    //document.getElementById('chatDiv').scrollHeight
    document.getElementById('chatDiv').scrollTo=(0, document.getElementById('chatDiv').scrollHeight);
   // alerte(document.getElementById('chatDiv').scrollTop);
}



function getAllMessage() {
    fetch("http://localhost:3000/api/message", {cache: "reload",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }, method: "GET"})
        .then(response => response.json())
        .then(saveData => {
            let i=100;
            for (let elem of saveData) {
                setTimeout(() => {
                    putOneLineChat(elem.message, elem.userId)}
                    , i) ;
                i+=70;
            }
        })
        .catch(err => console.log(err))
}
getAllMessage();






// source for scrool:
// https://www.codegrepper.com/code-examples/javascript/auto+scroll+down+when+new+messages+come+in+css
// https://stackoverflow.com/questions/36606570/scroll-down-to-bottom-when-new-message-is-sent