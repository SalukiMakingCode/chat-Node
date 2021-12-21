if (document.getElementById("signUp")) {
    document.getElementById("signUp").addEventListener("click", (e) => {
        e.preventDefault();
        let form = {
            "email": document.getElementById('userEmail').value,
            "password": document.getElementById('userPassword').value,
        }
        fetch("http://localhost:3000/api/auth/signup", {
            cache: "reload", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, method: "POST", body: JSON.stringify(form)
        })
            .then(response => response.text())
            .then(saveData => {
                console.log(saveData);
            })
            .catch(err => console.log(err))
    })
}

if (document.getElementById("signIn")) {
    document.getElementById("signIn").addEventListener("click", (e) => {
        e.preventDefault();
        let form = {
            "email": document.getElementById('pseudo').value,
            "password": document.getElementById('password').value,
        }
        fetch("http://localhost:3000/api/auth/login", {
            cache: "reload", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, method: "POST", body: JSON.stringify(form)
        })
            .then(response => response.text())
            .then(saveData => {
                console.log(saveData);
            })
            .catch(err => console.log(err))
    })
}