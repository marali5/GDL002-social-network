var config = {
  apiKey: "AIzaSyAmISmi21LAwLNUF7jc0FyUvc3IJTSAbyo",
  authDomain: "red-social-9e474.firebaseapp.com",
  databaseURL: "https://red-social-9e474.firebaseio.com",
  projectId: "red-social-9e474",
  storageBucket: "red-social-9e474.appspot.com",
  messagingSenderId: "84890795146"
};
firebase.initializeApp(config);
entrar.addEventListener("click", function(){

document.getElementById("screen1").style.display = "block";
document.getElementById("screen0").style.display = "none";
});


function checkIn() {
  let textEmail = document.getElementById("email").value;
  let textPassword = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(textEmail, textPassword)
    .then(function(){
      verific()
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });
}

function validarEmail( textEmail ) {
  expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ( !expr.test(textEmail ) )
      alert("Error: La dirección de correo " + textEmail  + " es incorrecta.");
}

let emailCorrect = document.getElementById("email").value;
validarEmail( email );

function singIn() {
  let textEmail1 = document.getElementById("email").value;
  let textPassword1 = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(textEmail1, textPassword1)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });
}
function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("screen2").style.display = "block"
      document.getElementById("screen1").style.display = "none"
      document.getElementById("screen0").style.display = "none"
      console.log("existe usuario");
      // User is signed in.
     // console.log(user);
    //  var displayName = user.displayName;
     // var email = user.email;
     // var emailVerified = user.emailVerified;
      //var photoURL = user.photoURL || 'https://st2.depositphotos.com/1005091/10267/v/950/depositphotos_102676744-stock-illustration-silhouette-of-leafy-tree-theme.jpg';
     // var isAnonymous = user.isAnonymous;
     // var uid = user.uid;
      //var providerData = user.providerData;
      //document.getElementById("img").innerHTML ="<img src='" +photoURL + "'class='pik'>";
      //document.getElementById("nombre").innerHTML =displayName 
      // ...
      
    } else {
      console.log ("no existe usuario");
    }
  });
}
observer();



function verific(){
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
  console.log("enviando correo..");
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
}
const btnClose= document.getElementById("close");
btnClose.addEventListener("click", function(){
  firebase.auth().signOut().then(function() {
    location.reload();
    // Sign-out successful.
    console.log("listo");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
});

const btnGoogle= document.getElementById("google");
 btnGoogle.addEventListener("click", function(){

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    //This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
   //  The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
  //  Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
   // The email of the user's account used.
    var email = error.email;
    //The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    //...
  }); 
 
 });
 
var db = firebase.firestore();
//Agregar comentario
function guardar(){
  console.log("guardar")
  let nombre = document.getElementById('nombre').value;
  var fecha=(formatDate(new Date())); 
  let comentario = document.getElementById('comentario').value;
  console.log(nombre, fecha, comentario)
  db.collection("users").add({
    first: nombre,
    last: fecha,
    born: comentario
    })
    .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    // Refrescar pantalla por medio de strin limpios
      document.getElementById("nombre").value = " ";
      document.getElementById(fecha);
      document.getElementById("comentario").value = " ";
    })
    .catch(function(error) {
    console.error("Error adding document: ", error);
    });
}

//Leer documentos
var newPost = document.getElementById('newPost');
db.collection("users").onSnapshot((querySnapshot) => {
    newPost.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
    newPost.innerHTML += `
    <div id="sub-menu">
  <div id="left-bar">
    <div class="heading">
      Notifications
    </div>
  </div>
  <div id="right-bar">
  
  </div>
</div>
<div id="main-window">
  <div class="post">
    <div class="user">
      <div class="user-img"></div>
      <div class="user-info">
        <div class="user-name">${doc.data().first}</div>
        <span class="post-date">${doc.data().last}</span>
      </div>
      <div class="actions">
        <span class="heart"></span>
        <span class="comment" onclick="confirmDelete('${doc.id}')"></span>
        <span class="share" onclick="editar('${doc.id}','${doc.data().born}')"></span>
      </div>
    </div>
    <div class="content">
      <div class="user-name">${doc.data().born}</div>
      
    </div>
  </div>
  `
    });
});
//borrar documentos
function eliminar(id){
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

//editar documentos

function editar(id,comentario){

	document.getElementById('comentario').value=comentario;
	var boton=document.getElementById('boton');
	boton.innerHTML = 'Editar';

	boton.onclick = function(){
	var washingtonRef = db.collection("users").doc(id);	
var comentario=document.getElementById('comentario').value;

return washingtonRef.update({
    
    born: comentario
})
.then(function() {
    console.log("Document successfully updated!");
    boton.innerHTML = 'guardar';
    
	document.getElementById('comentario').value= "";
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});	
}
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
var fecha=(formatDate(new Date())); 
console.log(fecha);


//borrar documentos
function confirmDelete(id){
  var respuesta = confirm ("¿Estas seguro que deseas borrar el comentario?");
  if (respuesta ==true){
    eliminar(id);
  }
  else{
    return false;
  }
}