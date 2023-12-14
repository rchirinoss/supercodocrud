let allContainerCart = document.querySelector('.modal-items');

loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);    
}

function addProduct(e){
    console.log(e.target);
}