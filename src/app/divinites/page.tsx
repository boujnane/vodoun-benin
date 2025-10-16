'use client';
import { FlipCard } from "@/components/ui/FlipCards";
import { ModernNavbar } from "@/components/ui/ModernNavbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const diviniteFa = { name: "Fa", slug: "fa", image: "/Fâ.png" };

const divinitesHumaines = [
  { name: "Ogun", slug: "ogun", image: "/ogun.png" },
  { name: "Legba", slug: "legba", image: "/legba.png" },
  { name: "Sakpata", slug: "sakpata", image: "/sakpata.png" },
  { name: "Heviosso", slug: "heviosso", image: "/heviosso.png" },
  { name: "Ayizan", slug: "ayizan", image: "/ayizan.png" },
  { name: "Agassou", slug: "agassou", image: "/agassou.png" },
];

const divinitesAnimales = [
  { name: "Dangbé", slug: "dangbe", image: "/dangbe.png" },
  { name: "Tohossou", slug: "tohossou", image: "/tohossou.png" },
  { name: "Ayido Hwedo", slug: "ayido", image: "/ayido.png" },
];

export default function MainPage() {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/main/${slug}`);
  };

  const renderCards = (items: { name: string; slug: string; image: string; description?: string }[]) =>
    items.map((div) => (
      <FlipCard
        key={div.slug}
        name={div.name}
        image={div.image}
        description={div.description || `Plus d’infos sur ${div.name} ici…`}
        childrenFront={
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              backgroundColor: "rgba(35, 35, 35, 0.85)",
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "100%", height: "240px", position: "relative" }}>
              <Image
                src={div.image}
                alt={div.name}
                fill
                style={{ objectFit: "cover", borderRadius: "20px" }}
              />
            </div>
            <div
              style={{
                padding: "1rem",
                color: "#ffe84b",
                fontWeight: "bold",
                fontSize: "1.3rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                background: "rgba(0, 0, 0, 0.3)",
              }}
            >
              {div.name}
            </div>
          </div>
        }
      />
    ));

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        fontFamily: '"AfricanFont", sans-serif',
        overflowX: "hidden",
        color: "#f0e130",
      }}
    >
      <ModernNavbar />
      {/* Background fixe */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          backgroundImage: 'url("/background_main.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.7)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />
      </div>

      {/* Contenu principal */}
      <div style={{ position: "relative", padding: "5rem 2rem 8rem", textAlign: "center" }}>
        {/* --- FA --- */}
        <div style={{ marginBottom: "5rem" }}>
          <h2
            style={{
              fontSize: "2.3rem",
              marginBottom: "1.5rem",
              color: "#ffe84b",
              textShadow: "0 0 20px rgba(255,255,150,0.6)",
            }}
          >
            La sagesse du FA
          </h2>
          <div
            onClick={() => handleClick(diviniteFa.slug)}
            style={{
              cursor: "pointer",
              width: "300px",
              margin: "0 auto",
              borderRadius: "25px",
              background: "radial-gradient(circle at center, rgba(240,225,48,0.9), rgba(35,35,35,0.9))",
              boxShadow: "0 0 35px rgba(240,225,48,0.6)",
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 45px rgba(255, 245, 120, 0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 35px rgba(240,225,48,0.6)";
            }}
          >
            <div style={{ width: "100%", height: "300px", position: "relative" }}>
              <Image
                src={diviniteFa.image}
                alt="Fa"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                padding: "1rem",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              {diviniteFa.name}
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <h2
          style={{
            fontSize: "2rem",
            margin: "3rem 0 1.5rem",
            color: "#ffef7a",
            textShadow: "0 0 12px rgba(255,255,200,0.3)",
          }}
        >
          Divinités principales
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            justifyItems: "center",
            padding: "0 2rem",
          }}
        >
          {renderCards(divinitesHumaines)}
        </div>

        {/* Section 2 */}
        <h2
          style={{
            fontSize: "2rem",
            margin: "4rem 0 1.5rem",
            color: "#a4e0ff",
            textShadow: "0 0 15px rgba(120,200,255,0.4)",
          }}
        >
          Esprits et divinités animales
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            justifyItems: "center",
            padding: "0 2rem 5rem",
          }}
        >
          {renderCards(divinitesAnimales)}
        </div>
      </div>
    </div>
  );
}
