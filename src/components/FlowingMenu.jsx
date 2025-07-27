import React from 'react';
import { gsap } from 'gsap';


function FlowingMenu({ items = [] }) {
  return (
    <div className="w-full h-full bg-transparent text-black">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const marqueeAnimRef = React.useRef(null); // For GSAP infinite loop

  const animationDefaults = { duration: 0.6, ease: 'expo.out' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // Slide in the marquee
    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });

    // Start infinite scroll animation
    marqueeAnimRef.current = gsap.to(marqueeInnerRef.current, {
      x: '-50%',
      duration: 10,
      ease: 'linear',
      repeat: -1,
    });
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // Slide out the marquee
    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });

    // Kill marquee loop animation
    if (marqueeAnimRef.current) {
      marqueeAnimRef.current.kill();
      marqueeAnimRef.current = null;
      gsap.set(marqueeInnerRef.current, { x: '0%' }); // reset position
    }
  };

  const repeatedMarqueeContent = Array.from({ length: 6 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
        {text}
      </span>
      <div
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div
      ref={itemRef}
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#000]"
    >
      <a
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh] hover:text-[#060010] focus:text-[#060010]"
      >
        {text}
      </a>
      <div
        ref={marqueeRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
      >
        <div ref={marqueeInnerRef} className="h-full flex w-max min-w-full">
          <div className="flex items-center relative h-full will-change-transform px-4">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
