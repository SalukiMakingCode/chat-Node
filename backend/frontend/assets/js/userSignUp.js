// * ========================== | Setup Variable | ==========================
const signUpForm        = document.querySelector('.signUpForm');
const signInForm        = document.querySelector('.signInForm');
let profilePicture      = document.getElementById('urlProfilePicture');
const pseudo            = document.getElementById('userPseudo');
const firstName         = document.getElementById('userFirstName');
const lastName          = document.getElementById('userLastName');
const gender            = document.getElementById('userGender');
const email             = document.getElementById('userEmail');
const password          = document.getElementById('userPassword');
const errorMsgEmail     = document.getElementById('errorMsgEmail');
const errorMsgPassword  = document.getElementById('errorMsgPassword');
const errorMsgPseudo    = document.getElementById('errorMsgPseudo');
const errorMsgFirstName = document.getElementById('errorMsgFirstName');
const errorMsgLastName  = document.getElementById('errorMsgLastName');
const errorMsgGender    = document.getElementById('errorMsgGender');
const errorMsgProfilePicture = document.getElementById('errorMsgProfilePicture');


const regexMail      = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let ok = "ok";

// * ========================== | Function | ==========================
//test le email si il est valide ou non en live
email.onkeydown = () => email.value.match(regexMail) ? setSuccess(email) : setErrorFor(email, 'no');

function setErrorFor(input,validEmail){
    input.classList.remove('successField');
    input.classList.add('errorField');

    if(input === email) {
        errorMsgEmail.innerText = 'Email is required';
        ok = "notok";
    }
    if(input === password) {
        errorMsgPassword.innerText = 'Password is required';
        ok = "notok";
    }
    if(input === pseudo) {
        errorMsgPseudo.innerText = 'Pseudo is required';
        ok = "notok";
    }
    if(input === firstName) {
        errorMsgFirstName.innerText = 'FirstName is required';
        ok = "notok";
    }
    if(input === lastName) {
        errorMsgLastName.innerText = 'LastName is required';
        ok = "notok";
    }
    if(input === gender) {
        errorMsgGender.innerText = 'Gender is required';
        ok = "notok";
    }
    if(input === profilePicture) {
        errorMsgProfilePicture.innerText = 'Profile picture is required';
        ok = "notok";
    }
    if(validEmail === 'no'){
        errorMsgEmail.innerText = 'Please enter a valid email';
        ok = "notok";
    }
}

function setSuccess(input){
    input.classList.remove('errorField');
    input.classList.add('successField');

    if(input === email) {
        errorMsgEmail.innerText = '';
        ok = "ok";
    }


    // let inputTocheck = [
    //     {id : "password", param : 'errorMsgPassword'},
    //     {id : "firstName", param : 'errorMsgFirstName'},
    //     {id : "lastName", param : 'errorMsgLastName'},
    //     {id : "pseudo", param : 'errorMsgPseudo'},
    //     {id : "gender", param : 'errorMsgGender'},
    //     {id : "profilePicture", param : 'errorMsgProfilePicture'},
    // ];
    //
    // inputTocheck.forEach((element) => {
    //     if (input === document.getElementById(element.id)) {
    //         document.getElementById(element.param).innerText='';
    //     }
    // });


    if(input === password) {
        errorMsgPassword.innerText = '';
    }
    if(input === pseudo) {
        errorMsgPseudo.innerText = '';
    }
    if(input === firstName) {
        errorMsgFirstName.innerText = '';
    }
    if(input === lastName) {
        errorMsgLastName.innerText = '';
    }
    if(input === gender) {
        errorMsgGender.innerText = '';
    }
    if(input === profilePicture) {
        errorMsgProfilePicture.innerText = '';
    }
}

function addElement (input) {
    const parentDiv = document.querySelector('.container');
    const newDiv = document.createElement('div');
    newDiv.classList.add('testDiv','loginCard');
    const newContent = '<h2>'+input+'</h2><button id="toSignIn"><a href="index.html">SignIn</a></button>';
    newDiv.innerHTML = newContent.trim();
    const currentDiv = document.querySelector('.signUpCard');
    parentDiv.insertBefore(newDiv, currentDiv);
    currentDiv.remove();
}

// * ========================== | Add Event Listener |  ==========================

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
     // * ===================| Test Email |===================
     if(email.value === '' || email.value === null) setErrorFor(email);
     if(email.value) email.value.match(regexMail) ? setSuccess(email) : setErrorFor(email, 'no');

     let array = [password, firstName, lastName, pseudo, gender, profilePicture];

     for (let elem of array) {
         if(elem.value === '' || elem.value == null) setErrorFor(elem);
         if(elem.value) setSuccess(elem);
     }

    //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    let form = {
        "email": email.value,
        "password": password.value,
        "pseudo" : pseudo.value,
        "firstname" : firstName.value,
        "lastname" : lastName.value,
        "urlProfilePicture" : profilePicture.value,
        "gender" : gender.value,
    }
    fetch("http://localhost:3000/api/auth/signup", {
        cache: "reload", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(form)
    })
        .then(response => response.json())
        .then(saveData => {
            // affiché inscription réussie OU ratée     saveData.error === "noerror"
            // * ===================| IF ALL IS OK |===================
            if(ok === "ok" && saveData.error !== "error"){
                //~~~~~~~~~~~~~~~~~~| tu envois les datas a la DB |~~~~~~~~~~~~~~~~~~
                console.log('data ok: '+ ok);
                addElement('User create');
            }
            if (saveData.error === "error"){
                addElement('Error');
            }

            console.log(saveData);
        })
        .catch(err => console.log(err));
});

id('choosePicture').addEventListener('click', ()=> {
 id('myModal').style.display="flex";
});

document.querySelectorAll('.pictureChoose').forEach((element) =>
    element.addEventListener('click', () => {
        id('myModal').style.display="none";
        let numId=element.id .substring(3, 5);
        id('choosePicture').innerHTML="<img src='assets/images/" + numId + ".png'><input type='hidden' id='urlProfilePicture' value='" + numId + "'/>";
        profilePicture = document.getElementById('urlProfilePicture');
    }));