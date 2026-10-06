import { Link } from "react-router-dom";
import { articles, imageUrl } from "../data/storefrontData.js";

export default function BlogsPage() {
  return (
    <section className="page-shell">
      <header className="intro">
        <span className="eyebrow">BLOGS / 01</span>
        <h1>Ideas para vestir la vida diaria.</h1>
        <p className="lead">Historias, materiales y claves para construir un estilo personal.</p>
      </header>
      <div className="blog-grid">
        {articles.map((article) => (
          <article className="blog-card" key={article.id}>
            <Link to={`/tienda/blogs/${article.id}`}><img src={imageUrl(article.image)} alt="" /></Link>
            <div className="blog-card-content"><span className="eyebrow">{article.category}</span><h2>{article.title}</h2><p>{article.summary}</p><Link className="text-link" to={`/tienda/blogs/${article.id}`}>Leer artículo</Link></div>
          </article>
        ))}
      </div>
    </section>
  );
}
