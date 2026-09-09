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

                // Lectura segura: intenta convertir a JSON, si falla obtiene el texto plano
                let resultado;
                const textoRespuesta = await respuesta.text();
                try {
                    resultado = JSON.parse(textoRespuesta);
                } catch (e) {
                    resultado = textoRespuesta;
                }

                // Si las credenciales son válidas (HTTP 200/201)
                if (respuesta.ok && (resultado.email || resultado.id)) {
                    
                    const datosUsuario = {
                        id: resultado.id,
                        correo: resultado.email || correoInput,
                        email: resultado.email || correoInput,
                        nombre: resultado.nombre || 'Cliente',
                        direccion: resultado.direccion || '',
                        logueado: true
                    };

                    // Guardar compatibilidad para el perfil
                    localStorage.setItem('sake_sesion', JSON.stringify(datosUsuario));
                    localStorage.setItem('usuario_actual', JSON.stringify(datosUsuario));
                    localStorage.setItem('usuarioCorreo', resultado.email || correoInput);

                    alert('✅ Inicio de sesión correcto.');

                    // REDIRECCIÓN DIRECTA A TU PERFIL
                    window.location.href = 'perfil.html';

                } else {
                    // Muestra el mensaje devuelto por el backend o un mensaje por defecto si falla el login
                    const mensajeError = (typeof resultado === 'object' && resultado !== null)
                        ? (resultado.mensaje || resultado.message || 'El correo o la contraseña son incorrectos.')
                        : (resultado || 'El correo o la contraseña son incorrectos.');

                    alert('❌ Error: ' + mensajeError);
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                alert('⚠️ No se pudo conectar con el servidor. Revisa que la aplicación en el puerto 8081 esté en ejecución.');
            }
        });
    }
});