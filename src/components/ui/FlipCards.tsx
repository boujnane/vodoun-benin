'use client';
import { useState } from "react";
import Image from "next/image";

interface CardProps {
  name: string;
  image: string;
  description: string;
  childrenFront: React.ReactNode;
}

export function FlipCard({ name, image, description, childrenFront }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
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
        transform: expanded ? "translate(-50%, -50%) scale(1)" : "scale(1)",
        zIndex: expanded ? 9999 : 1,
        cursor: "pointer",
        margin: expanded ? 0 : "1rem",
        borderRadius: "20px",
        transition: "all 0.6s ease",
        overflow: "hidden",
        backgroundColor: expanded ? "#232323" : undefined,
        boxShadow: expanded ? "0 0 40px rgba(0,0,0,0.8)" : undefined,
        perspective: "1000px",
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
        {!expanded && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "20px",
              overflow: "hidden",
              transition: "opacity 0.3s ease",
            }}
          >
            {childrenFront}
          </div>
        )}

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
              transform: "rotateY(0deg)", // garde tout droit
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Image */}
            <div style={{ width: "200px", height: "200px", marginBottom: "1rem", overflow: "hidden", borderRadius: "15px", position: "relative" }}>
              <Image
                src={image}
                alt={name}
                fill
                style={{ objectFit: "cover", borderRadius: "15px" }}
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
