// Array para almacenar los nombres de los amigos
let amigos = [];
const LIMITE_AMIGOS = 10; // Límite máximo de amigos

// Referencias a los elementos del DOM
let digitarAmigo = document.getElementById("amigo");
let listaAmigos = document.getElementById("listaAmigos");
let resultado = document.getElementById("resultado");


function validarNombre(nombre) {
    // Recorrer el nombre y verificar que solo contenga letras y espacios
    for (let i = 0; i < nombre.length; i++) {
        let char = nombre.charAt(i);
        if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || char === ' ')) {
            return false;  // Si hay un carácter no válido, devuelve false
        }
    }
    return true;  // Si todos los caracteres son válidos, devuelve true
}



function asignarTextoElemento(selector, texto) {
    let elementoHTML = document.querySelector(selector);
    elementoHTML.innerHTML = texto;
}

/**
 * Agrega un amigo a la lista si es un nombre válido y no supera el límite.
 */
function agregarAmigo() {
    //La funcion trim() elimina espacios en blanco al inicio y fin del string
    let nombre = digitarAmigo.value.trim();
    
    // Validación de nombre
    if (!validarNombre(nombre)) {
        alert("El valor ingresado no es válido. Ingresa un nombre válido.");
        return;
    }
    
    // Verifica si se alcanzó el límite de nombres
    if (amigos.length >= LIMITE_AMIGOS) {
        alert("Se ha sobrepasado el límite de 10 nombres. Se reiniciará el sistema.");
        reiniciarSistema();
        return;
    }
    
    // Agregar nombre y actualizar lista
    amigos.push(nombre);
    digitarAmigo.value = "";
    resultado.innerHTML = ""; // Limpia el resultado si había un sorteo previo
    actualizarLista();
}

/**
 * Actualiza la lista de amigos en la interfaz.
 */
function actualizarLista() {
    listaAmigos.innerHTML = "";  // Limpiar el contenido de la lista

    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li");  // Crear un nuevo elemento <li>
        li.textContent = amigos[i];  // Asignar el nombre del amigo
        listaAmigos.appendChild(li);  // Añadir el <li> a la lista
    }
}


/**
 * Sortea un amigo secreto y muestra solo el nombre del elegido.
 */
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Debe agregar al menos un amigo antes de sortear.");
        return;
    }
    
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSecreto = amigos[indiceAleatorio];
    asignarTextoElemento("#resultado", "El amigo secreto es: <strong>" + amigoSecreto + "</strong>");
    
    // Borra la lista de amigos en la interfaz pero mantiene el mensaje del sorteo
    listaAmigos.innerHTML = "";
    amigos = []; // Se vacía la lista de amigos
}

/**
 * Reinicia la lista de amigos y limpia la interfaz.
 */
function reiniciarSistema() {
    amigos = [];
    listaAmigos.innerHTML = "";
    resultado.innerHTML = "";
    digitarAmigo.value = "";
}
