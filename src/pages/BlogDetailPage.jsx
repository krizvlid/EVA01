import { Link, useParams } from "react-router-dom";
import { articles, imageUrl } from "../data/storefrontData.js";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.id === slug);

  if (!article) {
    return <section className="page-shell"><h1>Artículo no encontrado</h1><Link className="store-text-link" to="/tienda/blogs">Volver a los blogs</Link></section>;
  }

  return (
    <section className="page-shell">
      <article className="article">
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <img src={imageUrl(article.image)} alt={article.title} />
        <div className="article-body">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <Link className="text-link" to="/tienda/blogs">Volver a los Blogs</Link>
      </article>
    </section>
  );
}
