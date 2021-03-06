document.getElementById("pushit").addEventListener("click", ()=> {
    let form = {
        "message" : document.getElementById('message').value,
        "userId" : document.getElementById('userId').value,
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
})

document.getElementById("putit").addEventListener("click", ()=> {
    let id = document.getElementById('idmes').value;
    console.log(id);
    let form = {
        "message" : document.getElementById('messageput').value,
        "userId" : document.getElementById('userIdput').value,
    }
    fetch("http://localhost:3000/api/message/" + id, {cache: "reload", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: "PUT", body: JSON.stringify(form)})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})

document.getElementById("getmessage").addEventListener("click", ()=> {
    fetch("http://localhost:3000/api/message", {cache: "reload"})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})

document.getElementById("getone").addEventListener("click", ()=> {
    let theone=document.getElementById("theone").value;
    fetch("http://localhost:3000/api/message/" + theone, {cache: "reload"})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})

document.getElementById("deleteone").addEventListener("click", ()=> {
    let theonetodel=document.getElementById("theonetodel").value;
    fetch("http://localhost:3000/api/message/" + theonetodel, {cache: "reload", method: "DELETE"})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})


document.getElementById("createUser").addEventListener("click", ()=> {
    let form = {
        "email" : document.getElementById('email').value,
        "password" : document.getElementById('password').value,
    }
    fetch("http://localhost:3000/api/auth/signup", {cache: "reload",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(form)})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})


document.getElementById("logUser").addEventListener("click", ()=> {
    let form = {
        "email" : document.getElementById('emailLogin').value,
        "password" : document.getElementById('passwordLogin').value,
    }
    fetch("http://localhost:3000/api/auth/login", {cache: "reload",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, method: "POST", body: JSON.stringify(form)})
        .then(response => response.text())
        .then(saveData => {
            console.log(saveData);
        })
        .catch(err => console.log(err))
})