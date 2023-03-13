//variable Globales
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaDeJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonTierra
let botonAgua
let botonFuego
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/64-imgs-personajes-fondo/programar/mokepon/assets/mokemap.png'
class Mokepon{
    constructor(nombre, foto, vida,fotoMapa, x = 10 , y = 10 ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        }
        pintarMokepon() {
            lienzo.drawImage(
                this.mapaFoto,
                this.x,
                this.y,
                this.ancho,
                this.alto,
            )
        }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,
'./assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,
'./assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png', 80 ,120)

let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,'./assets/capipepo.png', 150, 95)

let ratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5,'./assets/ratigueya.png',200,190)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

hipodogeEnemigo.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)
capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)
capipepoEnemigo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)
ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon)=> {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonReiniciar.style.display = 'none'
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
        alert("Debes Seleccionar una mascota")
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque)=> {
        ataquesMokepon = `
        <button id=${ataque.id} class="botones-ataques BAtaque">${ataque.nombre} </button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })
        botonTierra = document.getElementById('boton-tierra')
        botonAgua = document.getElementById('boton-agua')
        botonFuego = document.getElementById('boton-fuego')
        botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            console.log(boton);
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('Agua')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador);
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo = enemigo.ataques
        secuenciaAtaque()
}
function ataqueAleatorioEnemigo() {
     let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

     if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('Fuego')
     }else if(ataqueEnemigo == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
     }else {
        ataqueEnemigo.push('Tierra')
     }
     console.log(ataqueEnemigo);
     iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
            if(ataqueJugador[index] === ataqueEnemigo[index]){
                indexAmbosOponentes(index, index)
                crearMensaje('Empate')
            }else if(ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra'){
                indexAmbosOponentes(index, index)
                crearMensaje('Ganaste')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if(ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego'){
                indexAmbosOponentes(index, index)
                crearMensaje('Ganaste')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if(ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua'){
                indexAmbosOponentes(index, index)
                crearMensaje('Ganaste')
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else{
                indexAmbosOponentes(index, index)
                crearMensaje('Perdiste')
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
    }
    revisarVidas()
}

function revisarVidas() {
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicitaciones!! Ganaste :D")
    }else{
        crearMensajeFinal("Lo siento Perdiste :´(")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    botonReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

function pintarCanvas() {

    mascotaDeJugadorObjeto.x = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.velocidadX
    mascotaDeJugadorObjeto.y = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage (
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaDeJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if(mascotaDeJugadorObjeto.velocidadX !== 0 || mascotaDeJugadorObjeto.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverArriba() {
    mascotaDeJugadorObjeto.velocidadY = - 5
}
function moverIzquierda() {
    mascotaDeJugadorObjeto.velocidadX = - 5
}
function moverAbajo() {
    mascotaDeJugadorObjeto.velocidadY = 5
}
function moverDerecha() {
    mascotaDeJugadorObjeto.velocidadX = 5
}
function detenerMovimiento() {
    mascotaDeJugadorObjeto.velocidadX = 0
    mascotaDeJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    console.log(event.key);
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    mascotaDeJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaDeJugadorObjeto.y
    const abajoMascota = mascotaDeJugadorObjeto.y + mascotaDeJugadorObjeto.alto
    const derechaMascota = mascotaDeJugadorObjeto.x + mascotaDeJugadorObjeto.ancho
    const izquierdaMascota = mascotaDeJugadorObjeto.x
    if(
        abajoMascota< arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)