"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import Image from "next/image";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <div className="perspective-container">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-full h-full z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.9) rotateX(5deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
            backgroundColor:
              current === index ? "transparent" : "rgb(20, 20, 22)",
          }}
        >
          <Image
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 360px, 400px"
            priority={index === current}
            onLoad={imageLoaded as any}
          />
          {current === index && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-4 transition-opacity duration-1000 ease-in-out flex flex-col items-center justify-end h-full ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl font-bold relative mb-2">
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="px-4 py-2 text-xs md:text-sm text-white bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] rounded-full hover:shadow-lg transition-all">
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-8 h-8 md:w-10 md:h-10 flex items-center mx-2 justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:ring focus:ring-primary/40 focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-white w-4 h-4 md:w-6 md:h-6" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      ref={carouselRef}
      className="carousel-wrapper relative w-full h-full mx-auto flex flex-col"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <style jsx global>{`
        .carousel-wrapper {
          perspective: 1200px;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .carousel-slides {
          position: absolute;
          display: flex;
          transition: transform 1s ease-in-out;
          height: 100%;
          width: 100%;
        }

        .perspective-container {
          perspective: 1200px;
          transform-style: preserve-3d;
          width: 280px;
          height: 280px;
          margin: 0 15px;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .perspective-container {
            width: 320px;
            height: 320px;
          }
        }

        @media (min-width: 1024px) {
          .perspective-container {
            width: 360px;
            height: 360px;
          }
        }

        @media (min-width: 1280px) {
          .perspective-container {
            width: 400px;
            height: 400px;
          }
        }
      `}</style>

      <div
        className="carousel-slides"
        style={{
          transform: `translateX(calc(50% - ${current * 310}px - 140px))`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </div>

      <div className="absolute flex justify-center w-full bottom-[-3rem] z-10">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
