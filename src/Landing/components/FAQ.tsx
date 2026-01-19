import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is SmartReply free to use?",
    answer: "Yes, SmartReply is currently free to use. You can access the Web Editor immediately without creating an account. The Browser Extension is also free to download."
  },
  {
    question: "Do I need to sign up or log in?",
    answer: "No. We believe in removing friction. You can start generating replies instantly. We don't require your email or personal details to use the core features."
  },
  {
    question: "How does the browser extension work?",
    answer: "The extension adds a small SmartReply button inside compatible web apps like Gmail, LinkedIn, and WhatsApp Web. When you select a message, you can click the button to generate a reply contextually, without leaving the page."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. SmartReply processes the text you input to generate a response and then discards it. We do not store your messages, emails, or personal data on our servers."
  },
  {
    question: "Can I customize the tone of the replies?",
    answer: "Yes. You can choose between 'Professional', 'Formal', and 'Friendly' tones to ensure the reply matches your personal style and the context of the conversation."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-indigo-900' : 'text-slate-800 group-hover:text-indigo-600'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
            <div className="md:col-span-5 lg:col-span-4">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Everything you need to know about SmartReply. Can't find the answer you're looking for? 
                </p>
                <div className="hidden md:block p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                    <p className="font-semibold text-indigo-900 mb-2">Need support?</p>
                    <p className="text-sm text-slate-600 mb-4">Our team is happy to help with any issues.</p>
                    <a href="#" className="text-indigo-600 font-medium text-sm hover:underline">Contact Support &rarr;</a>
                </div>
            </div>
            <div className="md:col-span-7 lg:col-span-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-2 sm:px-8">
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === index}
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                  ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};