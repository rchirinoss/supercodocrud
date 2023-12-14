console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        apellido:"",
        correo:"",
        password:"",
        rol:"",        
        url:'https://rchirinoss.pythonanywhere.com/usuarios/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.apellido = data.apellido;
                    this.correo = data.correo;
                    this.password=data.password                    
                    this.rol=data.rol                                        
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },        

        modificar() {
            let usuario = {
                nombre:this.nombre,
                apellido:this.apellido,
                correo:this.correo,
                password:this.password,
                rol: this.rol
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./usuarios.html"; // navega a usuarios.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
