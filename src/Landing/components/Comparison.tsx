import React from 'react';
import { motion } from 'framer-motion';
import { MinusCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const Comparison = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            See the Difference
          </h2>
          <p className="text-lg text-slate-600">
            Stop sounding like a template. Start sounding like a leader.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center max-w-5xl mx-auto">
          
          {/* Before Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 border border-slate-200 px-4 py-1 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
                The Old Way
              </div>
              
              <div className="flex items-start gap-4 mb-6 opacity-60">
                <MinusCircle className="w-6 h-6 text-slate-400 flex-shrink-0 mt-1" />
                <p className="font-serif text-xl text-slate-500 leading-relaxed italic">
                  "Thank you for reaching out. I will review the information and respond accordingly."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium">Generic</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium">Distant</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium">Slow</span>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center text-slate-300">
            <ArrowRight className="w-8 h-8" />
          </div>

          {/* After Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="bg-white rounded-2xl p-8 border border-indigo-100 shadow-xl shadow-indigo-900/5 relative ring-1 ring-indigo-50">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-indigo-500/30">
                SmartReply
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="bg-indigo-100 rounded-full p-1 mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="font-sans text-xl md:text-2xl text-slate-900 leading-relaxed font-semibold">
                  "Thanks for reaching out. I will review this and get back to you today."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                 <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">Clear</span>
                 <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">Confident</span>
                 <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold">Human</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
