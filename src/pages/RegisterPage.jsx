import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setMessage("");
    setError(false);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("nombre")).trim();
    const run = String(form.get("rut")).trim();
    const email = String(form.get("email")).trim();
    const address = String(form.get("direccion")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!/^[0-9]{8}-[0-9]$/.test(run)) {
      setError(true);
      setMessage("Ingresa el RUT con 8 números, guion y dígito verificador (ej.: 12345678-9).");
      return;
    }
    if (password.length < 4 || password.length > 10 || password !== confirm) {
      setError(true);
      setMessage(password !== confirm ? "Las contraseñas no coinciden." : "La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("http://localhost:8081/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, email, password, direccion: address }),
      });
      const body = await response.text();
      let result;
      try {
        result = body ? JSON.parse(body) : {};
      } catch {
        result = { mensaje: body };
      }
      if (!response.ok) throw new Error(result.mensaje || `Error del servidor (${response.status}).`);
      setMessage(result.mensaje || "Cuenta creada correctamente.");
      formElement.reset();
    } catch (requestError) {
      setError(true);
      setMessage(requestError instanceof Error ? requestError.message : "No se pudo completar el registro.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page-shell">
      <div className="register-layout">
        <header className="store-intro">
          <span className="eyebrow">Tu cuenta</span>
          <h1>Hazlo tuyo.</h1>
          <p className="lead">Regístrate para guardar tus datos y seguir de cerca tus próximas compras.</p>
          <p className="register-login">¿Ya tienes cuenta? <Link to="/tienda/login">Inicia sesión</Link></p>
        </header>
        <form className="form-panel" onSubmit={handleSubmit}>
          <label className="form-field"><span>Nombre completo</span><input name="nombre" autoComplete="name" required /></label>
          <label className="form-field"><span>RUT</span><input name="rut" maxLength="10" placeholder="12345678-9" required /></label>
          <label className="form-field"><span>Correo electrónico</span><input name="email" type="email" maxLength="100" autoComplete="email" required /></label>
          <label className="form-field"><span>Dirección</span><input name="direccion" maxLength="200" autoComplete="street-address" required /></label>
          <label className="form-field"><span>Contraseña</span><input name="password" type="password" minLength="4" maxLength="10" autoComplete="new-password" required /></label>
          <label className="form-field"><span>Confirmación de contraseña</span><input name="confirm" type="password" autoComplete="new-password" required /></label>
          {message && <p className={error ? "form-error" : "form-success"} role={error ? "alert" : "status"}>{message}</p>}
          <button className="store-button" type="submit" disabled={busy}>{busy ? "Creando cuenta..." : "Crear cuenta"}</button>
        </form>
      </div>
    </section>
  );
}
