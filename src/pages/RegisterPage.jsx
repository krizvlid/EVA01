import { useState } from "react";
import { createRecord, listRecords } from "../data/mockStore.js";

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
      if (!listRecords("usuarios").some((user) => user.email === email)) {
        createRecord("usuarios", { nombre: name, email, direccion: address, rol: "cliente", estado: "Activo" });
      }
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
        <header className="intro">
          <span className="eyebrow">Tu cuenta</span>
          <h1>Hazlo tuyo.</h1>
          <p className="lead">Regístrate para guardar tus datos y seguir de cerca tus próximas compras.</p>
        </header>
        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="form-group"><label htmlFor="register-name">Nombre completo</label><input id="register-name" name="nombre" autoComplete="name" required /></div>
          <div className="form-group"><label htmlFor="register-run">RUT</label><input id="register-run" name="rut" maxLength="10" placeholder="ej: 12345678-9" required /></div>
          <div className="form-group"><label htmlFor="register-email">Correo electrónico</label><input id="register-email" name="email" type="email" maxLength="100" autoComplete="email" required /></div>
          <div className="form-group"><label htmlFor="register-address">Dirección</label><input id="register-address" name="direccion" maxLength="200" autoComplete="street-address" required /></div>
          <div className="form-group"><label htmlFor="register-password">Contraseña</label><input id="register-password" name="password" type="password" minLength="4" maxLength="10" autoComplete="new-password" required /></div>
          <div className="form-group"><label htmlFor="register-confirm">Confirmación de contraseña</label><input id="register-confirm" name="confirm" type="password" autoComplete="new-password" required /></div>
          {message && <p className={error ? "form-error" : "form-success"} role={error ? "alert" : "status"}>{message}</p>}
          <button className="btn-submit" type="submit" disabled={busy}>{busy ? "Creando cuenta..." : "Crear cuenta"}</button>
        </form>
      </div>
    </section>
  );
}
