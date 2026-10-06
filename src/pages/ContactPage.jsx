import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    setMessage("");
  }

  return (
    <section className="page-shell">
      <div className="form-layout">
        <header className="contact-intro">
          <span className="eyebrow">Hablemos</span>
          <h1>Estamos para ayudarte.</h1>
          <p className="lead">Escríbenos y responderemos a la brevedad. Cuéntanos qué necesitas con el mayor detalle posible.</p>
        </header>
        <form className="contact-box" onSubmit={handleSubmit}>
          <label className="form-field"><span>Nombre</span><input name="nombre" type="text" maxLength="100" autoComplete="name" required /></label>
          <label className="form-field"><span>Correo</span><input name="correo" type="email" maxLength="100" autoComplete="email" required /></label>
          <label className="form-field"><span>Comentario</span><textarea name="comentario" maxLength="500" required value={message} onChange={(event) => setMessage(event.target.value)} /><small>{message.length}/500</small></label>
          <button className="store-button" type="submit">Enviar mensaje</button>
          {sent && <p className="form-success" role="status">Mensaje enviado correctamente.</p>}
        </form>
      </div>
    </section>
  );
}
