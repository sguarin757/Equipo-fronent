// =============================================
//  Sistema de Gestión Académica – script.js
//  CRUD + DOM + localStorage + Login
// =============================================

const STORAGE_KEY = 'sga_usuarios';
const SESSION_KEY = 'sga_session';

// Usuario administrador por defecto (primera entrega)
const ADMIN_DEFAULT = { usuario: 'admin', password: 'admin123' };

// ---- Helpers localStorage ----

function cargarUsuarios() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarUsuarios(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function sesionActiva() {
    return localStorage.getItem(SESSION_KEY) === 'true';
}

// ---- Elementos del DOM ----

const pantallaLogin   = document.getElementById('pantalla-login');
const app             = document.getElementById('app');
const loginUsuario    = document.getElementById('login-usuario');
const loginPassword   = document.getElementById('login-password');
const loginError      = document.getElementById('login-error');
const btnLogin        = document.getElementById('btn-login');
const btnLogout       = document.getElementById('btn-logout');

const formUsuario     = document.getElementById('form-usuario');
const inputDocumento  = document.getElementById('documento');
const inputNombre     = document.getElementById('nombre');
const inputUsuario    = document.getElementById('usuario');
const inputCorreo     = document.getElementById('correo');
const inputPassword   = document.getElementById('password');
const selectRol       = document.getElementById('rol');
const btnGuardar      = document.getElementById('btn-guardar');
const listaUsuarios   = document.getElementById('lista-usuarios');

const modalEdicion         = document.getElementById('modal-edicion');
const editNombre           = document.getElementById('edit-nombre');
const editRol              = document.getElementById('edit-rol');
const btnGuardarEdicion    = document.getElementById('btn-guardar-edicion');
const btnCancelarEdicion   = document.getElementById('btn-cancelar-edicion');

let documentoEnEdicion = null;

// =============================================
//  LOGIN
// =============================================

function mostrarApp() {
    pantallaLogin.style.display = 'none';
    app.style.display = 'block';
    renderizarLista();
}

function mostrarLogin() {
    app.style.display = 'none';
    pantallaLogin.style.display = 'flex';
    loginUsuario.value  = '';
    loginPassword.value = '';
    loginError.textContent = '';
}

function validarLogin(usuarioInput, passwordInput) {
    // Validar contra admin por defecto
    if (usuarioInput === ADMIN_DEFAULT.usuario && passwordInput === ADMIN_DEFAULT.password) {
        return true;
    }
    // Validar contra usuarios registrados en localStorage
    const usuarios = cargarUsuarios();
    return usuarios.some(u => u.usuario === usuarioInput && u.password === passwordInput);
}

btnLogin.addEventListener('click', function () {
    const usr = loginUsuario.value.trim();
    const pwd = loginPassword.value;

    if (!usr || !pwd) {
        loginError.textContent = 'Por favor complete todos los campos.';
        return;
    }

    if (validarLogin(usr, pwd)) {
        localStorage.setItem(SESSION_KEY, 'true');
        loginError.textContent = '';
        mostrarApp();
    } else {
        loginError.textContent = 'Usuario o contraseña incorrectos.';
        loginPassword.value = '';
    }
});

// Permitir Enter en el campo de contraseña
loginPassword.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') btnLogin.click();
});

btnLogout.addEventListener('click', function () {
    localStorage.removeItem(SESSION_KEY);
    mostrarLogin();
});

// =============================================
//  RENDER – mostrar lista de usuarios
// =============================================

function renderizarLista() {
    const usuarios = cargarUsuarios();
    listaUsuarios.innerHTML = '';

    if (usuarios.length === 0) {
        const p = document.createElement('p');
        p.className = 'mensaje-vacio';
        p.textContent = 'No hay usuarios registrados aún.';
        listaUsuarios.appendChild(p);
        return;
    }

    usuarios.forEach(function (u) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-usuario';
        tarjeta.setAttribute('data-doc', u.documento);

        const info = document.createElement('div');
        info.className = 'info-usuario';
        info.innerHTML =
            '<strong>' + u.nombre + '</strong>' +
            '<p>Usuario: ' + u.usuario + '</p>' +
            '<p>Doc: ' + u.documento + ' &nbsp;|&nbsp; Correo: ' + u.correo + '</p>' +
            '<span class="badge-rol ' + u.rol + '">' + u.rol + '</span>';

        const acciones = document.createElement('div');
        acciones.className = 'acciones-usuario';

        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn-editar';
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', function () {
            abrirEdicion(u.documento);
        });

        const btnDel = document.createElement('button');
        btnDel.className = 'btn-eliminar';
        btnDel.textContent = 'Eliminar';
        btnDel.addEventListener('click', function () {
            eliminarUsuario(u.documento);
        });

        acciones.appendChild(btnEdit);
        acciones.appendChild(btnDel);
        tarjeta.appendChild(info);
        tarjeta.appendChild(acciones);
        listaUsuarios.appendChild(tarjeta);
    });
}

// =============================================
//  CREATE – registrar nuevo usuario
// =============================================

formUsuario.addEventListener('submit', function (e) {
    e.preventDefault();

    const doc  = inputDocumento.value.trim();
    const nom  = inputNombre.value.trim();
    const usr  = inputUsuario.value.trim();
    const cor  = inputCorreo.value.trim();
    const pwd  = inputPassword.value;
    const rol  = selectRol.value;

    if (!doc || !nom || !usr || !cor || !pwd) return;

    const usuarios = cargarUsuarios();

    // Verificar documento duplicado
    if (usuarios.some(u => u.documento === doc)) {
        alert('Ya existe un usuario con ese documento de identidad.');
        return;
    }

    // Verificar nombre de usuario duplicado
    if (usuarios.some(u => u.usuario === usr)) {
        alert('Ese nombre de usuario ya está en uso.');
        return;
    }

    if (pwd.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    const nuevoUsuario = { documento: doc, nombre: nom, usuario: usr, correo: cor, password: pwd, rol: rol };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    formUsuario.reset();
    renderizarLista();
});

// =============================================
//  DELETE – eliminar usuario
// =============================================

function eliminarUsuario(documento) {
    if (!confirm('¿Eliminar el usuario con documento ' + documento + '?')) return;

    let usuarios = cargarUsuarios();
    usuarios = usuarios.filter(function (u) { return u.documento !== documento; });
    guardarUsuarios(usuarios);
    renderizarLista();
}

// =============================================
//  UPDATE – editar nombre y rol
// =============================================

function abrirEdicion(documento) {
    const usuarios = cargarUsuarios();
    const usuario  = usuarios.find(function (u) { return u.documento === documento; });
    if (!usuario) return;

    documentoEnEdicion   = documento;
    editNombre.value     = usuario.nombre;
    editRol.value        = usuario.rol;
    modalEdicion.style.display = 'flex';
}

btnGuardarEdicion.addEventListener('click', function () {
    const nuevoNombre = editNombre.value.trim();
    const nuevoRol    = editRol.value;

    if (!nuevoNombre) {
        alert('El nombre no puede estar vacío.');
        return;
    }

    const usuarios = cargarUsuarios();
    const idx = usuarios.findIndex(function (u) { return u.documento === documentoEnEdicion; });
    if (idx === -1) return;

    usuarios[idx].nombre = nuevoNombre;
    usuarios[idx].rol    = nuevoRol;
    guardarUsuarios(usuarios);

    cerrarModal();
    renderizarLista();
});

btnCancelarEdicion.addEventListener('click', cerrarModal);

function cerrarModal() {
    modalEdicion.style.display = 'none';
    documentoEnEdicion = null;
}

// Cerrar modal al hacer clic fuera de él
modalEdicion.addEventListener('click', function (e) {
    if (e.target === modalEdicion) cerrarModal();
});

// =============================================
//  INIT – verificar sesión al cargar
// =============================================

if (sesionActiva()) {
    mostrarApp();
} else {
    mostrarLogin();
}
