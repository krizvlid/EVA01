document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se borre/recargue

            const correoInput = document.getElementById('login-email').value.trim();
            const contrasenaInput = document.getElementById('login-password').value;

            try {
                const respuesta = await fetch('http://localhost:8081/api/usuarios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: correoInput,
                        password: contrasenaInput
                    })
                });

                const resultado = await respuesta.json();

                if (respuesta.ok && resultado.email) {
                    localStorage.setItem('sake_sesion', JSON.stringify({
                        id: resultado.id,
                        correo: correoInput,
                        nombre: resultado.nombre,
                        direccion: resultado.direccion || '',
                        logueado: true
                    }));
                    localStorage.setItem('usuarioCorreo', resultado.email);
                    alert('✅ Inicio de sesión correcto.');

                    if (document.referrer && !document.referrer.includes('Login.html')) {
                        window.location.href = document.referrer;
                    } else {
                        window.location.href = 'Inicio.html';
                    }

                } else {
                    alert('❌ Error: ' + (resultado.mensaje || resultado || 'Credenciales inválidas.'));
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                alert('⚠️ No se pudo conectar con el servidor. Revisa que la aplicación esté en ejecución.');
            }
        });
    }
});