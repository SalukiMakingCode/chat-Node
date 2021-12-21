document.getElementById("pushit").addEventListener("click", ()=> {
    let form = {
        "message" : document.getElementById('message').value,
        "userId" : document.getElementById('userId').value,
    }
    fetch("http://localhost:3000/api/message", {cache: "reload", method: "POST", body: JSON.stringify(form)})
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