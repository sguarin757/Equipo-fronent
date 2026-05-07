const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-login'); 

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

   
    const inputUser = document.getElementById('usuario').value;
    const inputPass = document.getElementById('password').value;

   
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = listaUsuarios.find(u => 
        u.username === inputUser && u.password === inputPass
    );

    if (usuarioValido) {
        
        localStorage.setItem('isLoggedIn', 'true');
       
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));

       
        window.location.href = 'index.html';
    } else {
      
        errorMsg.textContent = "Credenciales incorrectas o usuario no registrado.";
        errorMsg.style.display = "block";
    }
});