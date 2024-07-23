
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Slide {
  image: string;
  title: string;
  text: string;
}

interface AboutCarouselProps {
  slides: Slide[];
  options?: any;
}

const AboutCarousel: React.FC<AboutCarouselProps> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="embla__slide"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <Image src={slide.image} alt={slide.title} width={0} height={0} sizes="100vw" className="w-full h-96 object-cover" />
            <h3 className="text-2xl font-bold">{slide.title}</h3>
            <p className="text-sm cormorant-garamond-bold text-center">{slide.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="embla__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`embla__dot ${index === selectedIndex ? 'is-selected' : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutCarousel;
