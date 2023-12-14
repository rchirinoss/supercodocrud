const { createApp } = Vue
  createApp({
    data() {
      return {
        usuarios:[],
        //url:'http://localhost:5000/usuarios', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://rchirinoss.pythonanywhere.com/usuarios',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"",
        apellido:"",
        correo:"",
        password:"", 
        rol:"",
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        login() {
          correo=this.correo
          sessionStorage.setItem("adm",0)
          var i=0
          while ( i < this.usuarios.length && this.usuarios[i].correo != this.correo  ){
              i++
          }
          if (i<(this.usuarios.length)){
              if (this.usuarios[i].password==this.password ){
                  if (this.usuarios[i].rol=="Administrador"){
                      sessionStorage.setItem("adm","Administrador")
                                            
                  window.location.href = "./productos_lista.html"; 
                  }
                  else {  
                    ocultarEnlace('adminlogueado');                
                
                window.location.href = "./index.html";
              }
              }else{
                  alert('Clave erronea')
              }
          }else{
              alert('Usuario erronea')
          }
  }

    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')

// Funcion Mostrar Nav
function ocultarEnlace(id) {
  var enlace = document.getElementById(id);
  if (enlace) {
      enlace.style.display = 'none';
  }
}

// Función para mostrar un enlace por su ID
function mostrarEnlace(id) {
  var enlace = document.getElementById(id);
  if (enlace) {
      enlace.style.display = 'inline-block';
  }
}
// Ejemplos de cómo usar las funciones
//ocultarEnlace('link2'); // Ocultar el enlace con ID 'link2'
//mostrarEnlace('link3'); // Mostrar el enlace con ID 'link3'



  
// Función para manejar el cambio de tipo de campo de entrada
function mostrarContraseña() {
    var checkbox = document.getElementById("mostrar-contraseña");
    var password = document.getElementById("password");
    var cambiartexto = document.getElementById("cambiartexto");

    // Si el checkbox está marcado, cambia a tipo texto
    if (checkbox.checked) {
    password.type = "text";
    cambiartexto.textContent = "Ocultar Contraseña"
    } else {
    // Si el checkbox no está marcado, cambia a tipo password
    password.type = "password";
    cambiartexto.textContent = "Mostrar Contraseña"
    }
}
// Asocia la función al evento de cambio del checkbox
var checkbox = document.getElementById("mostrar-contraseña");
checkbox.addEventListener("change", mostrarContraseña);


// Función login
function validarCorreo(){
    let correo=document.getElementById("correo");
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(correo.value=="" || !emailRegex.test(correo.value)){
      document.getElementById("validarCorreo").innerHTML="Debe ingresar un correo electrónico.";
      // correo.focus();
    } else {
      document.getElementById("validarCorreo").innerHTML="";
    }
  }

function validarPassword(){
let password=document.getElementById("password");
let errorMessage = "";

if(password.value==""){
    errorMessage += "Debe ingresar una contraseña.";
}
// if(password.value.length<8){
//     errorMessage += "• La contraseña debe tener al menos 8 caracteres.<br>";
// }
// if(!/[A-Z]/.test(password.value)){
//     errorMessage += "• La contraseña debe tener al menos una mayúscula.<br>";
// }
// if(!/[a-z]/.test(password.value)){
//     errorMessage += "• La contraseña debe tener al menos una minúscula.<br>";
// }
// if(!/\d/.test(password.value)){
//     errorMessage += "• La contraseña debe tener al menos un número.<br>";
// }
// if(!/[@$!%*?&,.#]/.test(password.value)){
//     errorMessage += "• La contraseña debe tener al menos un carácter especial.<br>";
// }

document.getElementById("validarPassword").innerHTML = errorMessage;

if(errorMessage != ""){
    // password.focus();
}
}

function validarLogin(){
    validarCorreo();
    validarPassword();
  
    let correo=document.getElementById("correo");
    let password=document.getElementById("password");
    let error=false;
    
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(correo.value=="" || !emailRegex.test(correo.value)){
      document.getElementById("validarCorreo").innerHTML="Debe ingresar un correo electrónico.";
      error=true;
      correo.focus();
    } 
    if(password.value==""){
      document.getElementById("validarPassword").innerHTML="Debe ingresar una contraseña.";
      error=true;
      password.focus();
    }
    // if(password.value.length<8){
    //   document.getElementById("validarPasswordLength").innerHTML="• La contraseña debe tener al menos 8 caracteres";
    //   error=true;
    //   password.focus();
    // }
    // if(!/[A-Z]/.test(password.value)){
    //   document.getElementById("validarPasswordUpper").innerHTML="• La contraseña debe tener al menos una mayúscula";
    //   error=true;
    //   password.focus();
    // }
    // if(!/[a-z]/.test(password.value)){
    //   document.getElementById("validarPasswordLower").innerHTML="• La contraseña debe tener al menos una minúscula";
    //   error=true;
    //   password.focus();
    // }
    // if(!/\d/.test(password.value)){
    //   document.getElementById("validarPasswordNumber").innerHTML="• La contraseña debe tener al menos un número";
    //   error=true;
    //   password.focus();
    // }
    // if(!/[@$!%*?&]/.test(password.value)){
    //   document.getElementById("validarPasswordSpecial").innerHTML="• La contraseña debe tener al menos un carácter especial";
    //   error=true;
    //   password.focus();
    // }
    if (error == false){
      document.getElementById("correo").value=""
      document.getElementById("validarCorreo").innerHTML="&nbsp;";
      document.getElementById("password").value=""
      document.getElementById("validarPassword").innerHTML="&nbsp;";
    //   document.getElementById("validarPasswordLength").innerHTML="&nbsp;";
    //   document.getElementById("validarPasswordUpper").innerHTML="&nbsp;";
    //   document.getElementById("validarPasswordLower").innerHTML="&nbsp;";
    //   document.getElementById("validarPasswordNumber").innerHTML="&nbsp;";
    //   document.getElementById("validarPasswordSpecial").innerHTML="&nbsp;";
    //   alert("login exitoso")
    }
    return !error;
  }