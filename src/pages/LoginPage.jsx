import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    try {
      const response = await fetch("http://localhost:8081/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.text();
      let result;
      try {
        result = body ? JSON.parse(body) : {};
      } catch {
        result = { mensaje: body };
      }
      if (!response.ok || !(result.email || result.id)) {
        throw new Error(result.mensaje || result.message || "El correo o la contraseña son incorrectos.");
      }
      const user = {
        id: result.id,
        correo: result.email || email,
        email: result.email || email,
        nombre: result.nombre || "Cliente",
        direccion: result.direccion || "",
        region: result.region || "",
        comuna: result.comuna || "",
        logueado: true,
      };
      localStorage.setItem("sake_sesion", JSON.stringify(user));
      localStorage.setItem("usuario_actual", JSON.stringify(user));
      localStorage.setItem("usuarioCorreo", user.email);
      const returnTo = location.state?.from === "/tienda/checkout" ? location.state.from : "/";
      navigate(returnTo, { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Tu cuenta</span>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <label className="form-field"><span>Correo electrónico</span><input name="email" type="email" placeholder="ejemplo@duoc.cl" autoComplete="email" required /></label>
          <label className="form-field"><span>Contraseña</span><input name="password" type="password" minLength="4" maxLength="10" autoComplete="current-password" required /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="store-button" type="submit" disabled={busy}>{busy ? "Ingresando..." : "Ingresar"}</button>
        </form>
        <p className="auth-card__links"><Link to="/tienda/registro">Crear una cuenta</Link><Link to="/">Volver a la tienda</Link></p>
      </div>
    </section>
  );
}
