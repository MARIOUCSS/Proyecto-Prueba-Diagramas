import { useEffect, useState } from "react";

const SimpleCarousel = ({
  images,
  autoPlay = false,
  autoPlayInterval = 900,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    //si es la cantidad de imagenes es menor a 1 o igual a 1 return
    if (!autoPlay || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Imagen actual */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Imagen anterior"
      >
        ‹
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Siguiente imagen"
      >
        ›
      </button>

      {/* Indicadores de puntos */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
