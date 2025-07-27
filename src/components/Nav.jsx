import React, { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import TextCursor from './TextCursor'; 

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Nav = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const lettersRef = useRef([]);

  const addMagneticEffect = (ref) => {
    const el = ref.current;
    if (!el) return () => {};

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power2.out',
        duration: 0.3,
      });
    };

    const reset = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', reset);
    };
  };

  useEffect(() => {
    const cleanAbout = addMagneticEffect(aboutRef);
    const cleanContact = addMagneticEffect(contactRef);

    return () => {
      cleanAbout && cleanAbout();
      cleanContact && cleanContact();
    };
  }, []);

  useEffect(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });
  }, []);

  useEffect(() => {
    if (!lettersRef.current.length) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const speedsFloat = speeds.map(Number);
    const maxSpeed = Math.max(...speedsFloat);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    tl.to(
      lettersRef.current,
      {
        yPercent: (i) => {
          const speed = speedsFloat[i];
          return -20 * (speed / maxSpeed);
        },
        ease: 'none',
        stagger: 0,
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  const mallickLetters = 'MALLICK'.split('');
  const speeds = ['900', '0.8', '10', '600', '0.9', '900', '0.5'];

  return (
    <header className="w-full px-10 py-8 flex justify-between items-start flex-wrap text-[#1F232B]">
      {/* Left Side */}
      <div className="max-w-[400px]">
        <Link to="/" className="text-[120px] font-extrabold leading-none">
          AMIT
        </Link>
        <p className="mt-4 uppercase font-medium text-lg leading-snug">
          Creative Front-End Developer
          <br />
          Building Unique Digital Experiences
          <br />
          One Pixel At A Time!
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end gap-8 text-right max-w-[600px]">
        {/* Buttons row */}
        <div className="flex items-center gap-6">
          <div className="flex items-center text-white px-4 py-1.5 rounded-full text-sm font-medium cursor-default">
            <MagneticButton>
              AVAILABLE
              <span className="ml-2 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            </MagneticButton>
          </div>

          <nav className="flex gap-6 text-lg font-medium">
            <Link ref={aboutRef} to="/about" className="relative inline-block">
              <MagneticButton>About</MagneticButton>
            </Link>
            <Link ref={contactRef} to="/contact" className="relative inline-block">
              <MagneticButton>Contact</MagneticButton>
            </Link>
          </nav>
        </div>

        {/* MALLICK big letters */}
        <h1
          className="text-[120px] font-extrabold leading-none flex flex-nowrap"
          style={{ fontFeatureSettings: "'kern'" }}
        >
          {mallickLetters.map((char, index) => (
            <span
              key={index}
              ref={(el) => (lettersRef.current[index] = el)}
              data-speed={speeds[index]}
              style={{
                display: 'inline-flex',
                whiteSpace: 'nowrap',
                margin: 0,
                padding: 0,
                lineHeight: 1,
                verticalAlign: 'bottom',
                transform: 'translateY(0%)',
                userSelect: 'none',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </header>
  );
};

export default Nav;
