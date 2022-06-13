
const formulario = document.querySelector('#formulario');
const mostrar = document.querySelector('#mostrar');
const template = document.querySelector('#template');

// console.log(alerta);

let todo = [];

formulario.addEventListener('submit', e => {

    e.preventDefault();

    const data = new FormData(formulario)
    const [datico] = [...data.values()]

    if(!datico.trim()){

        Swal.fire({
            title: 'Error!',
            text: 'No se permiten espacios vacios',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
          });
        return
    };

    agregarTodo(datico)
    pintarTodo()
    
    formulario.reset()
})

const agregarTodo = datico => {
    let objeto = {
        nombre: datico,
        id: `${ Date.now()}`
    };

    todo.push(objeto)
}

const pintarTodo = () => {

    localStorage.setItem('local', JSON.stringify(todo))

    mostrar.textContent = '';
    const fragment = document.createDocumentFragment();

    todo.forEach(e => {
        let clone = template.cloneNode(true).content;
        clone.querySelector('.lead').textContent = e.nombre;

        clone.querySelector('.btn').dataset.a = e.id;

        fragment.appendChild(clone);
    })

    mostrar.appendChild(fragment);
}

document.addEventListener('click', e => {
    // console.log(e.target.dataset.a);
    // console.log(e.target.matches('.btn-danger'));

    if(e.target.matches('.btn-danger')){
        // console.log(e.target.dataset.a);

        todo = todo.filter(item => item.id !== e.target.dataset.a)
        pintarTodo()
    }
})

document.addEventListener('DOMContentLoaded', c => {

    if(localStorage.getItem('local')){
        todo = JSON.parse(localStorage.getItem('local'));
        pintarTodo()
    }
})

