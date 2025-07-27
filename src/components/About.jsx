import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10 font-sans">
      <h2 className="text-5xl font-extrabold uppercase mb-14 tracking-[0.2em]">
        About Me
      </h2>

      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[320px] sm:w-[400px] h-[480px] mySwiper"
      >
        {[
          {
            title: '🎓 Academic Background',
            content: [
              'SSC (2021) – GPA: 5.00',
              'HSC (2023) – GPA: 5.00',
            ],
          },
          {
            title: '🌐 Languages',
            content: [
              'Bangla – Native',
              'English – IELTS 6.0',
              'Hindi – Conversational',
            ],
          },
          {
            title: '📚 Currently Learning',
            content: [
              'Data Structures & Algorithms',
              'Advanced React',
              'Competitive Programming',
            ],
          },
          {
            title: '💻 Technical Skills',
            content: [
              'HTML5, CSS3, JavaScript – Expert',
              'React.js – Intermediate',
              'GSAP, Locomotive, Three.js – Medium',
            ],
          },
        ].map((slide, index) => (
          <SwiperSlide
            key={index}
            className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg px-8 py-10 text-black text-left transition-all duration-300 hover:shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-5">{slide.title}</h3>
            <ul className="space-y-3 text-[1.05rem] leading-relaxed font-medium">
              {slide.content.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default About;
