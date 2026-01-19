import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe } from 'lucide-react';

export const ExtensionSection = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Replies where conversations actually happen.</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Most tools pull you out of context. SmartReply stays where you're already talking.
                Select the message → generate reply → send. No copying. No tab switching.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['WhatsApp Web', 'LinkedIn', 'Gmail', 'Other web apps'].map((app) => (
                  <li key={app} className="flex items-center text-slate-700 font-medium">
                    <Globe className="w-5 h-5 text-indigo-500 mr-3" />
                    {app}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Browser mockup */}
              <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="bg-slate-900 text-slate-400 text-xs px-3 py-1 rounded-md ml-4 w-64">
                    gmail.com
                  </div>
                </div>
                <div className="p-8 bg-white min-h-[300px] relative">
                   {/* Mock UI Overlay */}
                   <div className="absolute right-8 bottom-8 bg-white shadow-xl rounded-lg p-4 border border-indigo-100 w-64 z-10 animate-bounce-slow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                          <Zap className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-bold text-sm text-slate-800">SmartReply</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded w-full mb-2"></div>
                      <div className="h-2 bg-slate-100 rounded w-2/3"></div>
                      <button className="mt-3 w-full bg-indigo-600 text-white text-xs py-1.5 rounded font-medium">Insert Reply</button>
                   </div>
                   
                   <div className="space-y-4 opacity-20">
                     <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                     <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                     <div className="h-32 bg-slate-100 rounded border border-slate-200"></div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
};
