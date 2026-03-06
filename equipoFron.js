const usuarioCorrecto = "admin";
const claveCorrecta = "1234";
let intentos = 0;
const maxIntentos = 3;
let bloqueado = false;

function iniciarLogin() {
    if (bloqueado) {
        return;
    }

    const userInput = document.getElementById("userInput");
    const passInput = document.getElementById("passInput");
    const mensajeEstado = document.getElementById("mensajeEstado");
    const boton = document.querySelector("button");

    const user = userInput.value.trim();
    const pass = passInput.value;

    if (!user || !pass) {
        mensajeEstado.textContent = "Completa usuario y contraseña.";
        return;
    }

    console.log("Intento " + (intentos + 1) + " - Usuario ingresado: " + user);

    if (user === usuarioCorrecto && pass === claveCorrecta) {
        mensajeEstado.textContent = "Acceso permitido. ¡Bienvenido al sistema!";
        userInput.disabled = true;
        passInput.disabled = true;
        boton.disabled = true;
        console.log("Resultado: Acceso permitido.");
        return;
    }

    intentos++;
    console.warn("Resultado: Credenciales incorrectas.");

    if (intentos >= maxIntentos) {
        bloqueado = true;
        mensajeEstado.textContent = "SISTEMA BLOQUEADO. Ha superado el límite de intentos.";
        userInput.disabled = true;
        passInput.disabled = true;
        boton.disabled = true;
        console.error("ALERTA: Se han superado los 3 intentos permitidos.");
        console.error("Estado del sistema: BLOQUEADO.");
    } else {
        const restantes = maxIntentos - intentos;
        mensajeEstado.textContent = "Datos incorrectos. Intentos restantes: " + restantes + ".";
    }
}