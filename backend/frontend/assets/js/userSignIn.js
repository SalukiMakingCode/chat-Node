// * ========================== | Setup Variable | ==========================
const signUpForm       = document.querySelector('.signUpForm');
const signInForm       = document.querySelector('.signInForm');

const email            = document.getElementById('pseudo');
const password         = document.getElementById('password');
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

// * ========================== | Add Event Listener |  ==========================

signInForm.addEventListener('submit', (e) => {
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
    fetch("http://localhost:3000/api/auth/login", {
        cache: "reload", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(form)
    })
        .then(response => response.json())
        .then(saveData => {
            // console.log(saveData);
            if (ok === 2 && saveData.error === "noerror"){
                console.log('data ok: '+ ok);
                window.location.href = "chat.html";
            }
            if (saveData.error === "error"){
                addElement('Error');
            }
        })
        .catch(err => console.log(err));
});