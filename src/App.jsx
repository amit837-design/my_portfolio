import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import About from './components/About';
import Contact from './components/Contact';
import FlowingMenu from './components/FlowingMenu';
import TextCursor from './components/TextCursor';
import Footer from './components/Footer';
import RippleGrid from './components/RippleGrid';

const demoItems = [
  { link: 'https://recipe-voult.vercel.app/', text: 'RecipeHub', image: 'https://picsum.photos/600/400?random=1' },
  { link: 'https://react-productivity-dashboard.vercel.app/', text: 'Productivity Dashboard', image: 'https://picsum.photos/600/400?random=2' },
  { link: 'https://amit837-design.github.io/-Luxeliving/', text: 'Luxeliving', image: 'https://picsum.photos/600/400?random=3' },
  { link: 'https://amit837-design.github.io/GitHub-Finder/', text: 'GitHub-Finder', image: 'https://picsum.photos/600/400?random=4' },
  { link: 'https://amit837-design.github.io/portfolio1/', text: 'Portfolio', image: 'https://picsum.photos/600/400?random=5' },
  { link: 'https://amit837-design.github.io/Sheryians/', text: 'Heavy Design', image: 'https://picsum.photos/600/400?random=6' },
  { link: 'https://amit837-design.github.io/zenfy/', text: 'Zenfy', image: 'https://picsum.photos/600/400?random=7' },
  { link: 'https://to-do-app-react-green.vercel.app/', text: 'Todo App', image: 'https://picsum.photos/600/400?random=8' }
];

const Home = () => (
  <div className="p-10 text-2xl">
    <h2 className="font-bold text-3xl mb-4">Welcome to My Portfolio</h2>
    <div style={{ height: '600px', position: 'relative' }}>
      <FlowingMenu items={demoItems} />
    </div>
  </div>
);

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <RippleGrid
        enableRainbow={false}
        gridColor="#000"
        rippleIntensity={3}
        gridSize={30}
        gridThickness={15}
        mouseInteraction={true}
        mouseInteractionRadius={1.2}
        opacity={0.3}
        />
      </div>
    <TextCursor>
      <Nav />
      </TextCursor>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
