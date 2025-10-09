'use client';
import { useState } from "react";

interface CardProps {
  name: string;
  image: string;
  description: string;
  childrenFront: React.ReactNode;
}

export function FlipCard({ name, image, description, childrenFront }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true);
      setFlipped(true);
    } else {
      setExpanded(false);
      setFlipped(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: expanded ? "80vw" : "240px",
        height: expanded ? "80vh" : "300px",
        position: expanded ? "fixed" : "relative",
        top: expanded ? "50%" : undefined,
        left: expanded ? "50%" : undefined,
        transform: expanded
          ? "translate(-50%, -50%)"
          : flipped
          ? "rotateY(180deg) scale(1.05)"
          : "rotateY(0deg) scale(1)",
        zIndex: expanded ? 9999 : 1,
        perspective: "1000px",
        cursor: "pointer",
        margin: expanded ? 0 : "1rem",
        borderRadius: "20px",
        transition: "all 0.6s ease",
        overflow: "hidden",
        backgroundColor: expanded ? "#232323" : undefined,
        boxShadow: expanded ? "0 0 40px rgba(0,0,0,0.8)" : undefined,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Face avant */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "20px",
            opacity: expanded ? 0 : 1,
            overflow: "hidden",
          }}
        >
          {childrenFront}
        </div>

        {/* Face arrière / modale */}
        {expanded && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "20px",
              color: "#fff",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            {/* Image en haut */}
            <div style={{ width: "200px", height: "200px", marginBottom: "1rem", overflow: "hidden", borderRadius: "15px" }}>
              <img
                src={image}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Nom */}
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
              {name}
            </h2>

            {/* Description */}
            <p style={{ fontSize: "1.2rem", lineHeight: "1.5", maxWidth: "600px" }}>
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
