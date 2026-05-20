import Image from "next/image";

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "#999" }}>404</h1>
      
      <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
        {/* Le composant Image de Next.js va chercher 404.png dans le dossier public/ */}
        <Image
          src="/404.png"
          alt="Page introuvable"
          width={280}
          height={180}
          priority
        />
      </div>
      
      <p>Cette page n'existe pas ou a ete deplacee.</p>
      <a href="/dashboard" style={{ color: "#1B8C3E", textDecoration: "none", fontWeight: "bold" }}>
        Retourner au Dashboard
      </a>
    </div>
  );
}
