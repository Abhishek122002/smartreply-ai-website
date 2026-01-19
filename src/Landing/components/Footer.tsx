import React from 'react';
import { Button } from './Button';
import { ArrowUpRight, Download } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          Reply Less. <span className="text-indigo-400">Sound Better.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Stop rewriting. Stop second-guessing. Let SmartReply handle the phrasing—so you can focus on the conversation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
           <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                <Download className="mr-2 w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                Download Extension
              </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={() => {
    // Ensure user is logged out
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("sr_auth_token"); // if extension token exists

    // Navigate to main website
    window.location.href = "/app";
  }}  >
            Open Editor <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SmartReply. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span>No login required</span>
            <span>No generic tone</span>
            <span>No wasted words</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
