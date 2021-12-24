// * ========================== | Setup Variable | ==========================
const signUpForm       = document.querySelector('.signUpForm');
const signInForm       = document.querySelector('.signInForm');

const email            = document.getElementById('userEmail');
const password         = document.getElementById('userPassword');
const errorMsgEmail    = document.getElementById('errorMsgEmail');
const errorMsgPassword = document.getElementById('errorMsgPassword');

const regexMail      = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexValidWord = /^[a-zA-Z\u00C0-\u017F]$/;
let ok = 0;


// * ========================== | Function | ==========================
//test le email si il est valide ou non en live
email.onkeydown = () => email.value.match(regexMail) ? setSuccess(email) : setErrorFor(email, 'no');

function setErrorFor(input,validEmail){
    input.classList.remove('successField');
    input.classList.add('errorField');

    if(input === email) {
        errorMsgEmail.innerText = 'Email is required';
        if(ok >= 1) ok -= 1;
    } else {
        errorMsgPassword.innerText = 'Password is required';
        if(ok >= 1) ok -= 1;
    }

    if(validEmail === 'no'){
        errorMsgEmail.innerText = 'Please enter a valid email';
        if(ok >= 1) ok -= 1;
    }
}

function setSuccess(input){
    input.classList.remove('errorField');
    input.classList.add('successField');
    
    if(input === email){
        errorMsgEmail.innerText = '';
        if(ok <= 1) ok += 1;
    }
    if(input === password){
        errorMsgPassword.innerText = '';
        if(ok <= 1) ok += 1;
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
     
     // * ===================| Test Password |===================
     if(password.value == '' || password.value == null) setErrorFor(password);
     if(password.value) setSuccess(password);
     

    //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    let form = {
        "email": email.value,
        "password": password.value,
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
            if(ok === 2 && saveData.error !== "error"){
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
    }));