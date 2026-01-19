import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, Sliders, CheckCheck, Globe, Zap, Send, Brain, MessageSquare, Clock, Shield, Download, PenTool, MousePointer2 } from 'lucide-react';

// --- Visual Mockups ---

const EditorVisuals = ({ step }: { step: number }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50">
        {/* Abstract Browser Frame */}
        <div className="absolute top-0 left-0 w-full h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
        </div>
        
        <div className="p-8 pt-20 h-full flex items-center justify-center bg-slate-50/50">
             <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div 
                        key="step0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-6 space-y-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                           <Clipboard className="w-4 h-4 text-indigo-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Context</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 h-24 text-sm text-slate-500 font-medium relative overflow-hidden leading-relaxed">
                            <span className="text-slate-800">"Hey, are you free to catch up later this week regarding the project?"</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded" />
                    </motion.div>
                )}
                {step === 1 && (
                    <motion.div 
                         key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-6"
                    >
                         <div className="flex items-center gap-2 mb-4">
                           <Sliders className="w-4 h-4 text-indigo-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Configuration</span>
                        </div>
                         <div className="space-y-6">
                            <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Tone</div>
                                <div className="flex gap-2">
                                    <div className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg shadow-sm ring-2 ring-indigo-600 ring-offset-2">Professional</div>
                                    <div className="px-4 py-2 bg-slate-50 text-slate-500 text-xs font-medium rounded-lg border border-slate-200">Friendly</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Length</div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className="w-2/3 bg-indigo-600 h-full rounded-full" />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium uppercase">
                                  <span>Short</span>
                                  <span className="text-indigo-600">Medium</span>
                                  <span>Long</span>
                                </div>
                            </div>
                         </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-slate-100 p-6 space-y-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                           <PenTool className="w-4 h-4 text-indigo-500" />
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Key Points</span>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 h-24 text-sm text-slate-500 font-medium relative overflow-hidden leading-relaxed">
                            <span className="text-slate-800">Yes, free Thursday afternoon.</span>
                            <motion.div 
                                layoutId="cursor"
                                className="inline-block w-0.5 h-4 bg-indigo-500 ml-1 align-middle animate-pulse" 
                            />
                        </div>
                        <div className="flex justify-end">
                             <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded">Added</div>
                        </div>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div 
                         key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                         className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-indigo-100 p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Generated Reply</span>
                            <div className="bg-green-100 text-green-700 p-1 rounded-full">
                                <CheckCheck className="w-3 h-3" />
                            </div>
                        </div>
                        <div className="text-base text-slate-800 leading-relaxed font-medium">
                            "I'd be happy to catch up. Does Thursday afternoon work for you to discuss the project?"
                        </div>
                        <div className="mt-6 flex justify-end">
                            <div className="px-4 py-2 bg-slate-900 text-white text-xs rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex items-center gap-2">
                                Copy Text
                            </div>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>
    </div>
  )
}

const ExtensionVisuals = ({ step }: { step: number }) => {
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-indigo-900/20">
          {/* Dark Mode Browser Frame */}
          <div className="absolute top-0 left-0 w-full h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-slate-600" />
              <div className="w-3 h-3 rounded-full bg-slate-600" />
              <div className="w-3 h-3 rounded-full bg-slate-600" />
          </div>
          
          <div className="p-8 pt-20 h-full flex items-center justify-center bg-slate-900">
               <AnimatePresence mode="wait">
                  {step === 0 && (
                      <motion.div 
                          key="ext-step0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="w-full max-w-sm flex flex-col items-center text-center space-y-4"
                      >
                          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl relative">
                              <Zap className="w-8 h-8 text-indigo-500" />
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-slate-900"
                              >
                                  <CheckCheck className="w-3 h-3 text-white" />
                              </motion.div>
                          </div>
                          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-sm">
                              Extension Installed
                          </div>
                      </motion.div>
                  )}
                  {step === 1 && (
                      <motion.div 
                          key="ext-step1"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="w-full max-w-sm bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-xl"
                      >
                         <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
                             <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                                <Globe className="w-5 h-5" />
                             </div>
                             <div>
                                 <div className="text-xs font-bold text-slate-300">Gmail</div>
                                 <div className="text-[10px] text-slate-500">mail.google.com</div>
                             </div>
                             <div className="ml-auto flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <div className="text-[10px] text-slate-400">Online</div>
                             </div>
                         </div>
                         <div className="space-y-2">
                             <div className="h-2 w-1/3 bg-slate-700 rounded" />
                             <div className="h-2 w-full bg-slate-700 rounded opacity-50" />
                             <div className="h-2 w-2/3 bg-slate-700 rounded opacity-50" />
                         </div>
                      </motion.div>
                  )}
                  {step === 2 && (
                      <motion.div 
                          key="ext-step2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="w-full max-w-sm bg-slate-800 rounded-xl p-5 space-y-3 border border-slate-700 shadow-xl"
                      >
                          <div className="relative py-1">
                            <div className="absolute inset-0 bg-indigo-500/20 -mx-2 rounded" />
                            <div className="h-2 w-1/2 bg-slate-300 rounded relative z-10" />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="absolute -right-4 -top-6 bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg z-20"
                            >
                                <Zap className="w-3 h-3 fill-current" />
                            </motion.div>
                          </div>
                          <div className="h-2 w-full bg-slate-700 rounded opacity-50" />
                          <div className="h-2 w-3/4 bg-slate-700 rounded opacity-50" />
                      </motion.div>
                  )}
                  {step === 3 && (
                      <motion.div 
                           key="ext-step3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                           className="w-full max-w-sm bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl"
                      >
                          <div className="bg-slate-900 p-3 border-b border-slate-700 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                              <div className="flex-1">
                                  <div className="h-2 w-20 bg-slate-600 rounded mb-1" />
                                  <div className="h-1.5 w-12 bg-slate-700 rounded" />
                              </div>
                          </div>
                          <div className="p-4 bg-slate-800 min-h-[100px] flex flex-col justify-between">
                              <div className="bg-slate-700/50 rounded-lg p-3 text-slate-300 text-sm border border-slate-600/50 animate-pulse">
                                   Here is the information you requested regarding the project.
                              </div>
                              <div className="mt-4 flex justify-end">
                                   <div className="bg-indigo-600 p-2 rounded-lg">
                                        <Send className="w-3 h-3 text-white" />
                                   </div>
                              </div>
                          </div>
                      </motion.div>
                  )}
               </AnimatePresence>
          </div>
      </div>
    )
  }

// --- Data ---

const steps = {
  editor: [
    {
      title: "Paste the message you received",
      description: "Copy the email or message you need to reply to and paste it into the editor. SmartReply reads the context to understand what you're responding to.",
      icon: Clipboard
    },
    {
      title: "Choose your tone and length",
      description: "Select how you want to sound Professional, Formal, or Friendly. Pick the reply length: Short, Medium, or Long.",
      icon: Sliders
    },
    {
      title: "Add key points (optional)",
      description: "Type in any specific details you want to include dates, answers, or information the recipient needs to know.",
      icon: PenTool
    },
    {
      title: "Generate and send",
      description: "Click generate to see your reply. Review it, make tweaks if needed, then copy and send with confidence.",
      icon: CheckCheck
    }
  ],
  extension: [
    {
      title: "Install the browser extension",
      description: "Download SmartReply for Chrome, Edge, or Firefox. It takes 10 seconds and works across all your messaging platforms.",
      icon: Download
    },
    {
      title: "Open your messaging app",
      description: "Navigate to WhatsApp Web, LinkedIn, Gmail, or any web-based chat. The extension activates automatically.",
      icon: Globe
    },
    {
      title: "Select the message",
      description: "Highlight the message you want to reply to. Click the SmartReply icon that appears in your toolbar or sidebar.",
      icon: MousePointer2
    },
    {
      title: "Generate reply inline",
      description: "Choose your tone and length, then click generate. Your reply appears right in the text box ready to edit or send immediately.",
      icon: Zap
    }
  ]
};

const features = [
  {
    icon: Brain,
    title: "Context Aware",
    description: "Understands the message you're responding to, ensuring relevance."
  },
  {
    icon: MessageSquare,
    title: "Tone Focus",
    description: "Focuses on tone, not verbosity. Formal, Friendly, or Professional."
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Keeps replies short, relevant, and human. No overthinking."
  },
  {
    icon: Shield,
    title: "Authentic",
    description: "Sounds like something you'd actually send. No robotic fluff."
  }
];

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'extension'>('editor');
  const [activeStep, setActiveStep] = useState(0);

  const currentSteps = steps[activeTab];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- PART 1: Why SmartReply Exists --- */}
        <div className="mb-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Why SmartReply Exists</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Most people don't struggle with what to say. They struggle with how to say it.
                    SmartReply removes the uncertainty.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>


        {/* --- PART 2: How It Works --- */}
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">How It Works</h2>
                 
                 {/* Tabs */}
                 <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative">
                    <div className="absolute inset-0 rounded-full bg-slate-100 pointer-events-none" />
                    <motion.div 
                       className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm z-0 border border-slate-200/50"
                       initial={false}
                       animate={{ 
                         x: activeTab === 'editor' ? 0 : '100%',
                         width: '50%' 
                       }}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                      onClick={() => { setActiveTab('editor'); setActiveStep(0); }}
                      className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 min-w-[140px] ${
                        activeTab === 'editor' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Web Editor
                    </button>
                    <button
                      onClick={() => { setActiveTab('extension'); setActiveStep(0); }}
                      className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 min-w-[140px] ${
                        activeTab === 'extension' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Extension
                    </button>
                  </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
                 {/* Steps Column (Left) */}
                 <div className="lg:col-span-5 space-y-4 lg:py-8">
                    {currentSteps.map((step, index) => {
                      const isActive = activeStep === index;
                      const Icon = step.icon;
                      
                      return (
                        <div 
                           key={index} 
                           className="relative pl-0 group cursor-pointer"
                           onClick={() => setActiveStep(index)}
                        >
                           <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                               isActive 
                               ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' 
                               : 'bg-transparent border-transparent hover:bg-slate-50'
                           }`}>
                               <div className="flex items-start gap-4">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                                       isActive ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-400'
                                   }`}>
                                      <Icon className="w-4 h-4" />
                                   </div>
                                   <div>
                                       <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                                           isActive ? 'text-indigo-900' : 'text-slate-600'
                                       }`}>
                                           {step.title}
                                       </h3>
                                       <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                                           isActive ? 'text-slate-700' : 'text-slate-400'
                                       }`}>
                                           {step.description}
                                       </p>
                                   </div>
                               </div>
                           </div>
                        </div>
                      );
                    })}
                 </div>

                 {/* Visuals Column (Right) */}
                 <div className="lg:col-span-7 relative hidden lg:block">
                     <div className="relative sticky top-24">
                        <div className={`absolute -inset-8 rounded-[3rem] bg-gradient-to-tr opacity-30 blur-3xl transition-all duration-1000 ${
                        activeTab === 'editor' ? 'from-indigo-200 via-purple-100 to-blue-200' : 'from-blue-200 via-indigo-100 to-slate-200'
                        }`} />
                        
                        {activeTab === 'editor' ? (
                        <EditorVisuals step={activeStep} />
                        ) : (
                        <ExtensionVisuals step={activeStep} />
                        )}
                    </div>
                 </div>
                 
                 {/* Mobile Visual */}
                 <div className="lg:hidden mt-8">
                    {activeTab === 'editor' ? (
                        <EditorVisuals step={activeStep} />
                        ) : (
                        <ExtensionVisuals step={activeStep} />
                    )}
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
};
