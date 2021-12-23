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
    // crée un nouvel élément div
    const newDiv = document.createElement('div');
    // crée ses class
    newDiv.classList.add('testDiv','loginCard');
    // contenu
    const newContent = '<h2>'+input+'</h2><button class="case4" id="signIn"><a href="index.html">SignIn</a></button>';
    // insertion du contenu
    // help source: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    newDiv.innerHTML = newContent.trim();
    // ajoute le nouvel élément créé et son contenu dans le DOM
    const currentDiv = document.querySelector('.signUpCard');
    parentDiv.insertBefore(newDiv, currentDiv);
    // enlève le form
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
            if(ok === 2 && saveData.error != "error"){
                //~~~~~~~~~~~~~~~~~~| tu envois les datas a la DB |~~~~~~~~~~~~~~~~~~
                console.log('data ok: '+ ok);
                addElement('Data Send');
            }
            if (saveData.error === "error"){
                addElement('Error');
            }

            console.log(saveData);
        })
        .catch(err => console.log(err));
});