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
      if (email.toLowerCase() === "admin" && password === "123") {
        const user = {
          id: "admin-demo",
          correo: "admin@sake.cl",
          email: "admin@sake.cl",
          nombre: "Admin",
          rol: "admin",
          logueado: true,
        };
        localStorage.setItem("sake_sesion", JSON.stringify(user));
        localStorage.setItem("usuario_actual", JSON.stringify(user));
        localStorage.setItem("usuarioCorreo", user.email);
        navigate("/admin", { replace: true });
        return;
      }

      if (email.toLowerCase() === "usuario 1" && password === "123") {
        const user = {
          id: "usuario-demo-1",
          correo: "usuario1@sake.cl",
          email: "usuario1@sake.cl",
          nombre: "Usuario 1",
          rol: "cliente",
          logueado: true,
        };
        localStorage.setItem("sake_sesion", JSON.stringify(user));
        localStorage.setItem("usuario_actual", JSON.stringify(user));
        localStorage.setItem("usuarioCorreo", user.email);
        const returnTo = location.state?.from === "/tienda/checkout" ? location.state.from : "/";
        navigate(returnTo, { replace: true });
        return;
      }

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
        rol: result.rol || result.role || "cliente",
        logueado: true,
      };
      localStorage.setItem("sake_sesion", JSON.stringify(user));
      localStorage.setItem("usuario_actual", JSON.stringify(user));
      localStorage.setItem("usuarioCorreo", user.email);
      const returnTo = location.state?.from === "/tienda/checkout"
        ? location.state.from
        : ["admin", "administrador"].includes(String(user.rol).toLowerCase())
          ? "/admin"
          : "/";
      navigate(returnTo, { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="login-card">
        <h2>Sake D. Binks</h2>
        <form id="form-login" onSubmit={handleSubmit}>
          <div className="form-group"><label htmlFor="login-email">Usuario o correo electrónico</label><input id="login-email" name="email" type="text" placeholder="admin o ejemplo@duoc.cl" autoComplete="username" required /></div>
          <div className="form-group"><label htmlFor="login-password">Contraseña</label><input id="login-password" name="password" type="password" minLength="3" maxLength="10" placeholder="Ingresa tu contraseña" autoComplete="current-password" required /></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" disabled={busy}>{busy ? "Ingresando..." : "Ingresar"}</button>
        </form>
        <p className="login-links"><Link to="/tienda/registro">Crear una cuenta</Link> | <Link to="/">Volver a la tienda</Link></p>
      </div>
    </section>
  );
}
