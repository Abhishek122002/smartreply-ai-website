import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Zap, Search, Settings, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenEditor: () => void;
}

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-slate-100 rounded animate-pulse ${className}`} />
);

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.5
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-1.5"
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
        className="w-0.5 h-5 bg-indigo-600 inline-block align-middle ml-0.5"
      />
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenEditor }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax logic based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 5; 
      const y = (clientY / innerHeight - 0.5) * 5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-white pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center mb-16"
        >
          {/* Micro Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm hover:bg-slate-100 transition-colors cursor-default">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Fast, context-aware AI replies</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Reply in Seconds. <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Sound Like Yourself.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            No more staring at a blank screen. SmartReply writes clear, natural replies based on what you're responding to.
          </p>
          
          {/* CTAs */}
        
            
            
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
  {/* Open Editor – FIRST */}
  <Button
    size="lg"
    className="w-full sm:w-auto h-12 px-8 text-white bg-[rgb(79,71,230)] hover:bg-[rgb(69,61,210)]"
    onClick={() => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      localStorage.removeItem("sr_auth_token");
      window.location.href = "/app";
    }}
  >
    Open Editor <ArrowUpRight className="ml-2 w-4 h-4" />
  </Button>

  {/* Download Extension – SECOND */}
  <Button
    variant="secondary"
    size="lg"
    className="w-full sm:w-auto h-12 px-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
  >
    <Download className="mr-2 w-4 h-4 text-slate-400" />
    Download Extension
  </Button>
</div>

        </motion.div>

        {/* Product Preview - Cut in half with gradient */}
        <div className="relative w-full max-w-6xl pb-0"> 
            <motion.div 
            style={{ rotateX: mousePosition.y * 0.5, rotateY: mousePosition.x * 0.5 }}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="perspective-1000 relative"
            >
            {/* Glow behind product */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full -z-10 pointer-events-none">
                <div 
                    className="absolute inset-0"
                    style={{
                    background: 'radial-gradient(circle at top, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0.02) 40%, transparent 60%)',
                    filter: 'blur(40px)',
                    }}
                />
            </div>

            {/* The Interface Mockup Container - Fixed Height for "Cut" effect */}
            <div className="bg-white rounded-t-xl md:rounded-t-2xl shadow-[0_25px_60px_-15px_rgba(79,70,229,0.3)] border-x border-t border-slate-200/60 overflow-hidden ring-1 ring-slate-900/5 flex flex-col h-[500px] relative">
                
                {/* Browser Header */}
                <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-4 flex-shrink-0 z-20 relative">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex-1 max-w-xl mx-auto bg-white border border-slate-200 rounded-md h-7 flex items-center px-3 shadow-sm">
                        <div className="w-3 h-3 text-slate-400 mr-2"><Search className="w-3 h-3" /></div>
                        <div className="text-[10px] text-slate-400 flex-1">app.smartreply.ai/editor</div>
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                </div>

                {/* App Body */}
                <div className="flex flex-1 bg-slate-50/50">
                    <div className="w-full h-full p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        
                        {/* Left Column: Input & Config */}
                        <div className="flex flex-col gap-5">
                            {/* Top Card: Inputs */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-0 overflow-hidden flex flex-col flex-shrink-0">
                                {/* Tabs */}
                                <div className="flex border-b border-slate-100">
                                    <div className="flex-1 py-3 text-center text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30">Existing</div>
                                    <div className="flex-1 py-3 text-center text-sm font-medium text-slate-500 hover:bg-slate-50 cursor-pointer">New</div>
                                </div>
                                
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-slate-900">Reply for</label>
                                            <Skeleton className="w-12 h-3" />
                                        </div>
                                        {/* Dashed Border Input Box */}
                                        <div className="w-full p-6 bg-indigo-50/30 border-2 border-dashed border-indigo-300 rounded-xl text-sm text-slate-600 min-h-[120px] flex flex-col justify-center relative overflow-hidden text-left">
                                            <div className="relative z-10 font-medium leading-relaxed">
                                                <p className="mb-2">Hi,</p>
                                                <p className="mb-2">Can you share the updated timeline for the project?</p>
                                                <p>Thanks</p>
                                            </div>
                                            {/* Subtle Shimmer Overlay on Input */}
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-900">Points to include</label>
                                        <div className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 shadow-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            Ask for expected date
                                        </div>
                                    </div>

                                    <div className="relative group mt-1">
                                        <div className="absolute -inset-0.5 bg-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                                        <button className="relative w-full py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md flex items-center justify-center gap-2">
                                            <span className="relative flex h-3 w-3 mr-1">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                            </span>
                                            Generating...
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Card: Configuration (Skeleton heavy) */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4 opacity-70">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                        <Settings className="w-4 h-4 text-slate-500" />
                                        Configuration
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Tone</div>
                                        <div className="flex gap-2">
                                            <div className="h-8 w-24 bg-indigo-50 border border-indigo-100 rounded-md flex items-center justify-center">
                                                <span className="text-xs font-semibold text-indigo-700">Professional</span>
                                            </div>
                                            <Skeleton className="h-8 w-20" />
                                            <Skeleton className="h-8 w-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Output */}
                        <div className="flex flex-col h-full">
                            <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-200 flex-1 flex flex-col overflow-hidden relative">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        <span className="font-bold text-slate-900 text-sm">Generated Reply</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="w-8 h-4" />
                                        <Skeleton className="w-8 h-4" />
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex-1 bg-slate-50/30">
                                    <div className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm h-full font-mono text-sm md:text-base leading-relaxed text-slate-700 relative overflow-hidden">
                                        
                                        {/* Metadata Skeletons */}
                                        <div className="flex flex-col gap-2 mb-6 pb-4 border-b border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-400 w-12">Subject:</span>
                                                <Skeleton className="h-4 w-48" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-400 w-12">To:</span>
                                                <Skeleton className="h-4 w-32" />
                                            </div>
                                        </div>

                                        <div className="font-sans relative z-10">
                                            <TypewriterText text="Hi [Recipient's Name], Thank you for your inquiry regarding the project timeline. I will gather the latest updates and share the revised timeline with you shortly. Best regards, [Your Name]" />
                                        </div>

                                        {/* Background decoration for the output area */}
                                        <div className="absolute bottom-4 right-4 opacity-5">
                                            <Zap className="w-24 h-24" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions (Partially hidden by cut) */}
                                <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 bg-indigo-50 h-10 rounded-lg animate-pulse" />
                                    <div className="flex-1 bg-green-50 h-10 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Gradient Divider - The "Cut" */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent z-30 pointer-events-none" />
            </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
};