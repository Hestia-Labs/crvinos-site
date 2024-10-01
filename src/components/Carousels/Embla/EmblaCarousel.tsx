'use client';
import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import "@/styles/embla.css";

interface Slide {
  image: string;
  title: string;
  text: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options }) => {
  const autoplayOptions = { delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('reInit', () => {});
  }, [emblaApi]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="embla__slide flex flex-col justify-center items-center space-y-4"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className="w-full flex flex-col justify-center items-center px-4 sm:px-10 md:px-20 space-y-4">
                <h3 className=" text-xl md:text-4xl  text-crred">{slide.title}</h3>
                <p className=" text-[12px] md:text-lg cormorant-garamond   text-crred">{slide.text}</p>
              </div>
              <div className="flex w-full md:pt-8 px-4 sm:px-10 md:px-20 pb-8">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-72 sm:h-96 lg:h-144 object-cover"
                  typeof='image/webp'
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="embla__controls ">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
