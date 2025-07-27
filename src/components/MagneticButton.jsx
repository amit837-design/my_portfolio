import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const textTop = textTopRef.current;
    const textBottom = textBottomRef.current;

    gsap.set(textBottom, { yPercent: 100, opacity: 0 });

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        ease: 'power2.out',
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(textTop, { yPercent: -100, opacity: 0, duration: 0.4, ease: 'power3.out' });
      gsap.to(textBottom, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
    };

    const reset = () => {
      gsap.to(textTop, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
      gsap.to(textBottom, { yPercent: 100, opacity: 0, duration: 0.5, ease: 'power3.out' });

      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', reset);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className="group relative inline-flex items-center justify-center w-36 h-14 overflow-hidden font-semibold tracking-wide text-black bg-white border border-black rounded-full shadow-md transition-colors duration-300 hover:text-white hover:bg-black"
    >
      {/* Text layers for sliding effect */}
      <div
        ref={textTopRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {children}
      </div>
      <div
        ref={textBottomRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {children}
      </div>

      
    </div>
  );
};

export default MagneticButton;
