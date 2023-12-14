const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://rchirinoss.pythonanywhere.com/productos',
            error: false,
            productos: [],
            datosFinales: [],
            datos: [],
            tipos: [],
            id:0,
            descripcion:"",
            seccion:"", 
            imagen:"",
            stock:0,
            precio:0,
        }
    },
    methods: {
        fetchdata(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.productos=data;
                                        
                    this.datosFinales = data;
                    for (producto of this.productos) {
                        if (this.tipos.indexOf(producto.seccion) < 0)
                            this.tipos.push(producto.seccion)
                    }
                    console.log(this.tipos)
                }
                );
        },

        filtrarDatos() {
            seccion = document.querySelector("select").value
            this.productos = this.datosFinales.filter(x => x.seccion === seccion)
            console.log(this.datosFinales)
        },

        ordenarDatos() {
            if (document.querySelector("#ordenPrecioAsc").checked)
                this.productos.sort((a, b) => a.precio - b.precio)
            else if (document.querySelector("#ordenPrecioDesc").checked)
                this.productos.sort((a, b) => b.precio - a.precio)

            console.log(this.productos)
        }
    },

    created() {
        this.fetchdata(this.url)

    }

}).mount('#app')


const openModal = document.querySelector('.minicarrito');
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.modal-cerrar')
openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal-show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal-show');
});