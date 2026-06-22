'use client';

import { useState, useEffect } from 'react';

interface Slide {
  title: string;
  subtitle: string;
  gradient: string;
}

const slides: Slide[] = [
  { title: 'iPhone 15', subtitle: 'El nuevo estándar de innovación', gradient: 'from-[#1a1a1a] to-[#3a3a3a]' },
  { title: 'MacBook Air', subtitle: 'Potencia y portabilidad en un solo lugar', gradient: 'from-[#1e293b] to-[#475569]' },
  { title: 'AirPods 4', subtitle: 'Sonido envolvente, sin cables', gradient: 'from-[#292524] to-[#57534e]' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white transition-opacity duration-700 overflow-hidden ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-12 -left-8 w-36 h-36 bg-white/5 rounded-full" />
          <div className="text-center px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-gray-300">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition ${index === current ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}