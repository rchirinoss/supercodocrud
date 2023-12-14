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
        rol:"Usuario",
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
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            if (validarRegistroCompleto()== true){         
            let usuario = {
                nombre:this.nombre,
                apellido:this.apellido,
                correo:this.correo,
                password:this.password,
                rol:this.rol
            }
            var options = {
                body:JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {                                     
                    alert("Registro grabado")
                    window.location.href = "./iniciarsesion.html";  // recarga productos.html                    
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })
            }                
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')

  
  
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


//validar Registro
function validarNombre(){
    let nombre=document.getElementById("nombre");
    let errorMessage = "";
    
    if(nombre.value==""){
        errorMessage += "Debe ingresar un nombre.";
    }
    document.getElementById("validarNombre").innerHTML = errorMessage;

if(errorMessage != ""){
    // nombre.focus();
}
}

function validarApellido(){
    let apellido=document.getElementById("apellido");
    let errorMessage = "";
    
    if(apellido.value==""){
        errorMessage += "Debe ingresar un apellido.";
    }
    document.getElementById("validarApellido").innerHTML = errorMessage;

if(errorMessage != ""){
    // apellido.focus();
}
}

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

function validarRegistroCompleto(){
    validarNombre();
    validarApellido();
    validarCorreo();
    validarPassword();
    
    let nombre=document.getElementById("nombre");
    let apellido=document.getElementById("apellido");
    let correo=document.getElementById("correo");
    let password=document.getElementById("password");
    let error=false;
    
    if(nombre.value==""){
        document.getElementById("validarNombre").innerHTML="Debe ingresar un nombre.";
        error=true;
        nombre.focus();
    }
    if(apellido.value==""){
    document.getElementById("validarApellido").innerHTML="Debe ingresar un apellido.";
    error=true;
    apellido.focus();
    }
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
      document.getElementById("nombre").value=""
      document.getElementById("validarNombre").innerHTML="&nbsp;";
      document.getElementById("apellido").value=""
      document.getElementById("validarApellido").innerHTML="&nbsp;";
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