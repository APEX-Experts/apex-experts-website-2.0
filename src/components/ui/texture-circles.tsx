import React from "react";

interface TextureCirclesProps {
  className?: string;
}

/**
 * TextureCircles Component
 * Renders 3 vector circles with bg-white and variable opacity to give boxes subtle texture.
 */
export const TextureCircles: React.FC<TextureCirclesProps> = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
    <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-white/3" />
    <div className="absolute -bottom-32 right-4 w-80 h-80 rounded-full bg-white/2" />
  </div>
);
