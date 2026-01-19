import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, Wand2, X } from 'lucide-react';
import { Button } from './Button';
import { generateReply } from '../services/geminiService';
import { Tone, Length } from '../types';

interface EditorProps {
  onClose: () => void;
}

export const Editor: React.FC<EditorProps> = ({ onClose }) => {
  const [context, setContext] = useState('');
  const [points, setPoints] = useState('');
  const [tone, setTone] = useState<Tone>('Professional');
  const [length, setLength] = useState<Length>('Medium');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!points.trim()) return;
    
    setIsLoading(true);
    const result = await generateReply({ context, points, tone, length });
    setOutput(result);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones: Tone[] = ['Professional', 'Formal', 'Friendly'];
  const lengths: Length[] = ['Short', 'Medium', 'Long'];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">SmartReply Editor</h2>
            <p className="text-slate-500">Draft your perfect response in seconds.</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5 mr-2" />
            Close
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 h-full">
          
          {/* Input Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Context Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Context (Optional)
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Paste the email or message you received here..."
                className="w-full h-32 p-3 bg-slate-50 border-0 rounded-lg text-slate-700 placeholder-slate-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* Points Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex-grow flex flex-col">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                What do you want to say?
              </label>
              <textarea
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="e.g., I'll look into it and reply by 5pm. Thanks for waiting."
                className="w-full h-32 p-3 bg-slate-50 border-0 rounded-lg text-slate-700 placeholder-slate-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm mb-6"
              />

              {/* Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Tone</span>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          tone === t 
                            ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Length</span>
                  <div className="flex flex-wrap gap-2">
                    {lengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          length === l
                            ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!points.trim() || isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Reply
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Output Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
             <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 h-full flex flex-col overflow-hidden relative">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-700">Result</h3>
                  {output && (
                    <button
                      onClick={handleCopy}
                      className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy Text'}
                    </button>
                  )}
                </div>

                <div className="p-6 flex-grow overflow-auto relative">
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                      <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                    </div>
                  ) : output ? (
                     <textarea
                      readOnly
                      value={output}
                      className="w-full h-full resize-none border-0 outline-none text-slate-800 text-lg leading-relaxed bg-transparent"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Wand2 className="w-12 h-12 mb-4 opacity-20" />
                      <p>Your generated reply will appear here.</p>
                    </div>
                  )}
                </div>
                
                {/* Decorative bottom fade */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
