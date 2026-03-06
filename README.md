# Proyecto académico: Sistema de Login Web

## 1. Descripción general

Este proyecto corresponde al desarrollo de una interfaz web de autenticación para un entorno educativo. La aplicación fue construida con HTML, CSS y JavaScript, y permite simular un control de acceso con validación de credenciales, conteo de intentos fallidos y bloqueo automático del formulario.

## 2. Objetivo

Implementar un prototipo funcional de inicio de sesión que permita aplicar conceptos fundamentales de desarrollo frontend, validación de formularios y manejo básico de estado en JavaScript.

## 3. Objetivos específicos

- Diseñar una interfaz visual de login con HTML y CSS.
- Validar los campos de usuario y contraseña antes de procesar el acceso.
- Comparar credenciales ingresadas contra valores definidos en el sistema.
- Limitar a 3 los intentos fallidos de autenticación.
- Bloquear el formulario al superar el número máximo de intentos.

## 4. Tecnologías utilizadas

- HTML5: estructura de la interfaz.
- CSS3: diseño visual de la tarjeta de acceso.
- JavaScript: lógica de autenticación y control de intentos.

## 5. Estructura del proyecto

- index.html: contiene el formulario de acceso y el enlace al script de validación.
- style.css: define estilos visuales, tipografía y presentación del formulario.
- equipoFron.js: implementa la lógica de validación, conteo de intentos y bloqueo.

## 6. Lógica de funcionamiento

La autenticación está basada en credenciales fijas definidas en el archivo JavaScript:

- Usuario válido: admin
- Contraseña válida: 1234
- Intentos máximos permitidos: 3

### Flujo del proceso

1. El usuario ingresa nombre y contraseña.
2. El sistema valida que ambos campos tengan contenido.
3. Si las credenciales son correctas, se concede el acceso y se deshabilita el formulario.
4. Si las credenciales son incorrectas, se incrementa el contador de intentos y se informa cuántos quedan.
5. Al tercer fallo, el sistema bloquea el acceso, deshabilita los campos y muestra mensaje de bloqueo.

## 7. Casos de prueba esperados

- Campos vacíos: muestra mensaje para completar la información.
- Credenciales correctas: acceso permitido y formulario desactivado.
- Credenciales incorrectas (1 o 2 intentos): informa intentos restantes.
- Tres intentos incorrectos: sistema bloqueado.

## 8. Instrucciones de ejecución

1. Abrir el archivo index.html en un navegador web.
2. Ingresar las credenciales en el formulario.
3. Presionar el botón Autorizar Acceso para validar.

## 9. Alcance y limitaciones

### Alcance

- Simulación funcional de login en cliente.
- Interfaz usable y respuesta inmediata en pantalla.

### Limitaciones

- No utiliza base de datos.
- No incluye backend ni autenticación real en servidor.
- Las credenciales están visibles en el código fuente.

## 10. Conclusiones

El proyecto cumple con el objetivo académico de implementar un sistema básico de autenticación en frontend. Se evidencia el uso correcto de estructuras condicionales, manipulación del DOM y control de estado para restringir intentos. Como mejora futura, se recomienda migrar la validación a un backend para garantizar seguridad real en producción.
