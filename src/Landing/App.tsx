import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExtensionSection } from './components/Features';
import { Comparison } from './components/Comparison';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Editor } from './components/Editor';
import { Audience } from './components/Audience';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false);

  const openEditor = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onOpenEditor={openEditor} />
      
      <AnimatePresence mode="wait">
        {showEditor ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="z-40 relative"
          >
            <Editor onClose={() => setShowEditor(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onOpenEditor={openEditor} />
            <HowItWorks />
            <Comparison />
            <Audience onOpenEditor={openEditor} />
            <ExtensionSection />
            <FAQ />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
