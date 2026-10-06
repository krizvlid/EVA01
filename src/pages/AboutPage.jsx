export default function AboutPage() {
  return (
    <section className="page-shell">
      <header className="intro">
        <span className="eyebrow">Nuestra casa</span>
        <h1>Vestir con intención, vivir con estilo.</h1>
        <p className="lead">SAKE D. BINKS nace para reunir piezas honestas, versátiles y cuidadosamente elegidas. Creemos que la moda cotidiana puede tener carácter sin perder comodidad.</p>
      </header>
      <div className="split-grid">
        <section><span className="eyebrow">Misión</span><h2>Elegir mejor</h2><p>Ofrecer una selección contemporánea que acompañe la identidad de cada persona, con una experiencia de compra simple y una mirada atenta a la calidad.</p></section>
        <section><span className="eyebrow">Visión</span><h2>Un armario con historia</h2><p>Construir una comunidad que compre menos, elija con más intención y encuentre en cada prenda una forma propia de expresarse.</p></section>
      </div>
      <section className="team">
        <span className="eyebrow">El equipo</span><h2>Personas detrás de cada elección</h2>
        <div className="team-grid">
          <article className="team-card"><strong>Joaquin Inostroza</strong><p>Dirección creativa y curaduría de colecciones.</p></article>
          <article className="team-card"><strong>Edison Riffo</strong><p>Contenido, comunidad y narrativas de marca.</p></article>
        </div>
      </section>
    </section>
  );
}
