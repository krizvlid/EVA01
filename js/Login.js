document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se borre/recargue

            const correoInput = document.getElementById('login-email').value.trim();
            const contrasenaInput = document.getElementById('login-password').value;

            try {
                const respuesta = await fetch('http://localhost:8080/api/aut/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo: correoInput,
                        contrasena: contrasenaInput
                    })
                });

                const resultado = await respuesta.json();

                if (respuesta.ok && resultado.exito) {
                    localStorage.setItem('sake_sesion', JSON.stringify({
                        correo: correoInput,
                        logueado: true
                    }));

                    alert('✅ ' + resultado.mensaje);

                    if (document.referrer && !document.referrer.includes('Login.html')) {
                        window.location.href = document.referrer;
                    } else {
                        window.location.href = 'Inicio.html';
                    }

                } else {
                    alert('❌ Error: ' + resultado.mensaje);
                }

            } catch (error) {
                console.error('Error de conexión:', error);
                alert('⚠️ No se pudo conectar con el microservicio. Revisa que IntelliJ esté en ejecución.');
            }
        });
    }
});