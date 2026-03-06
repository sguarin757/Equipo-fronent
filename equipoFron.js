function iniciarLogin() {
 
    const usuarioCorrecto = "student";
    const claveCorrecta = "1234";
    let intentos = 1;
    let accesoConcedido = false;

    console.log("--- Sistema de Gestión Educativa: Control de Acceso ---");

    
    while (intentos <= 3) {
        
        let user = prompt("Intento " + intentos + " de 3\nIngrese su nombre de usuario:");
        let pass = prompt("Ingrese su contraseña:");

        
        console.log("Intento " + intentos + " - Usuario ingresado: " + user);

        if (user === usuarioCorrecto && pass === claveCorrecta) {
            accesoConcedido = true;
            console.log("Resultado: Acceso permitido."); 
            alert("¡Bienvenido al sistema!");
            break; 
        } else {
            console.warn("Resultado: Credenciales incorrectas."); 
            alert("Datos incorrectos. Intento fallido " + intentos + "/3.");
            intentos++;
        }
    }

    
    if (!accesoConcedido) {
        console.error("ALERTA: Se han superado los 3 intentos permitidos."); 
        console.error("Estado del sistema: BLOQUEADO."); 
        alert("SISTEMA BLOQUEADO. Ha superado el límite de intentos fallidos.");
    }
}