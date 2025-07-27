import React from 'react';
import { FaFacebookF, FaGithub, FaEnvelope } from 'react-icons/fa';
import MagneticButton from './MagneticButton';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 relative z-10 font-sans">
      <h2 className="text-5xl font-extrabold uppercase tracking-[0.2em] mb-6">
        Contact Me
      </h2>

      <div
        className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg px-8 py-10
          max-w-[400px] w-full flex flex-col items-start space-y-8 text-black"
      >
        {/* Email Section */}
        <div className="flex items-center gap-4 text-lg font-semibold">
          <FaEnvelope className="text-2xl" />
          <a
            href="mailto:amitmallick837@gmail.com"
            className="hover:underline"
          >
            amitmallick837@gmail.com
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <MagneticButton className="cursor-pointer">
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center
                         hover:scale-110 transition-transform duration-300"
            >
              <FaFacebookF className="text-xl text-black" />
            </a>
          </MagneticButton>

          <MagneticButton className="cursor-pointer">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center
                         hover:scale-110 transition-transform duration-300"
            >
              <FaGithub className="text-xl text-black" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default Contact;
