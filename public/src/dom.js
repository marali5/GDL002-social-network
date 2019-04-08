function registro(){

let textEmail = document.getElementById("email").value;
    let textPassword = document.getElementById("password").value;
    window.main.checkIn(textEmail,textPassword);
}
const buttonCheckIn=document.getElementById("buttonCheckIn");
buttonCheckIn.addEventListener("click", registro);