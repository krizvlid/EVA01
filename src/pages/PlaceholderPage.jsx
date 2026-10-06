import { useLocation } from "react-router-dom";

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const pageName = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) ?? "")
    .replaceAll("-", " ");

  return (
    <section className="container py-5">
      <h1 className="h2 text-capitalize">{pageName}</h1>
      <p className="text-secondary">Esta sección se implementará en una etapa posterior.</p>
    </section>
  );
}
