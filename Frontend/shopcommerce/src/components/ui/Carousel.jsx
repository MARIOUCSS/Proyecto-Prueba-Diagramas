import React, { useState, useEffect, useRef } from "react";
import { CarouselContext } from "../context/CarouselContext";
import { useCarousel } from "../../hooks/useCarousel";

// Proveedor del carousel
const CarouselProvider = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  // ... (código del provider se mantiene igual)
};

// Componente principal del Carousel
const Carousel = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = "",
}) => {
  return (
    <CarouselProvider autoPlay={autoPlay} autoPlayInterval={autoPlayInterval}>
      <div className={`relative ${className}`}>{children}</div>
    </CarouselProvider>
  );
};

// --- DEFINIR TODOS LOS SUBCOMPONENTES PRIMERO ---

// Contenedor de slides
const CarouselContent = ({ children, className = "" }) => {
  const { currentIndex, setTotalSlides } = useCarousel();
  const slides = React.Children.toArray(children);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, [slides.length, setTotalSlides]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

// Slide individual
const CarouselItem = ({ children, className = "" }) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

// Botón anterior
const CarouselPrevious = ({ className = "", children }) => {
  const { goPrev } = useCarousel();

  return (
    <button
      onClick={goPrev}
      className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${className}`}
      aria-label="Slide anterior"
    >
      {children || "‹"}
    </button>
  );
};

// Botón siguiente
const CarouselNext = ({ className = "", children }) => {
  const { goNext } = useCarousel();

  return (
    <button
      onClick={goNext}
      className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${className}`}
      aria-label="Slide siguiente"
    >
      {children || "›"}
    </button>
  );
};

// Indicadores de puntos
const CarouselDots = ({ className = "" }) => {
  const { currentIndex, totalSlides, goToSlide } = useCarousel();

  return (
    <div className={`flex justify-center space-x-2 mt-4 ${className}`}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-colors ${
            currentIndex === index
              ? "bg-blue-500"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Ir al slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

// --- AHORA SÍ PUEDES ASIGNAR LOS SUBCOMPONENTES ---

// Asignar subcomponentes (DESPUÉS de definirlos)
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;
Carousel.Dots = CarouselDots;

export default Carousel;
