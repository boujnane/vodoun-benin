'use client';

import { motion } from "framer-motion";
import { ModernNavbar } from "@/components/ui/ModernNavbar";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  { date: "XVe siècle", title: "Origines du Vodou", description: "Les peuples africains du Dahomey et du Bénin développent les premières pratiques animistes qui donneront naissance au Vodou." },
  { date: "XVIIe siècle", title: "Traite transatlantique", description: "Les esclaves emportent leurs croyances au Nouveau Monde, introduisant le Vodou à Haïti et dans les Caraïbes." },
  { date: "XIXe siècle", title: "Organisation rituelle", description: "Le Vodou s'organise avec ses prêtres, prêtresses, et un panthéon structuré de divinités et esprits." },
  { date: "XXe siècle", title: "Résistance culturelle", description: "Malgré les persécutions coloniales, le Vodou reste un pilier de l'identité béninoise." },
  { date: "XXIe siècle", title: "Vaudou moderne", description: "Le Vodou est célébré comme patrimoine culturel mondial et influence musique, art et spiritualité." },
];

export default function HistoryPage() {
  return (
      <div className="relative w-screen min-h-screen bg-[#0e0e0f] text-white overflow-x-hidden">

      {/* Navbar fixe et opaque */}
        <ModernNavbar />

      {/* Ligne verticale SVG avec courbes */}
    <svg
            className="absolute top-16 bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[calc(100%)] z-0"
            viewBox={`0 0 200 ${timelineData.length * 250}`} // adapte la hauteur du viewBox à ton contenu
            preserveAspectRatio="none"
            >
        <path
            d={`M100 0 C70 150 50 200 110 300 S64 450 100 600 S76 800 100 ${timelineData.length * 250}`}
            stroke="#facc15"
            strokeWidth={4}
            fill="transparent"
        />
    </svg>
      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto pt-28 pb-20 space-y-40">
        {timelineData.map((item, idx) => {
          const side = idx % 2 === 0 ? "left" : "right";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: side === "left" ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`relative w-full flex ${side === "left" ? "justify-start" : "justify-end"}`}
            >
              <div className="w-full md:w-5/12 relative">
                {/* Cercle aligné sur la ligne */}
                <div className={`absolute top-0 ${side === "left" ? "right-[-28px]" : "left-[-28px]"} w-7 h-7 bg-yellow-400 rounded-full border-2 border-white`} />

                {/* Carte */}
                <div className="bg-[#1f1f1f]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                  <span className="text-yellow-400 font-bold text-sm">{item.date}</span>
                  <h3 className="text-xl md:text-2xl font-semibold mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
