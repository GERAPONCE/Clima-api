const container = document.querySelector('.card-body')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima)
})


function buscarClima(e){
    e.preventDefault()
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios')
    }
    
    consultarAPI(ciudad,pais)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.alert-danger')
    if(!alerta){
        const alerta = document.createElement('div')
        alerta.classList.add('alert', 'alert-danger')
        alerta.innerHTML= `<strong>Error!</span>
        <span class="block"> ${mensaje} </span>`
        container.appendChild(alerta)

        setTimeout(()=>{
            alerta.remove()
        },5000)
    }
}

function consultarAPI(ciudad,pais){
    const appId = 'a2123b1a389ebeac9957d0732e5ce57d'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
    // usamos fetch
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos =>{
            limpiarHTML()
            if(datos.cod==="404"){
                mostrarError('Ciudad no encontrada')
                    return
            }
            mostrarClima(datos)
        
        })
    
}

function mostrarClima(datos){
    const{main:{temp} } = datos

    const centigrados = kelvinAcentigrados(temp)
    
    const actual = document.createElement('p')
    actual.innerHTML= `${centigrados} &#8451`
    actual.classList.add('fw-bold', 'fs-1')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(actual)

    resultado.appendChild(resultadoDiv)
}

const kelvinAcentigrados = grados => parseInt(grados-273.15)


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
