import React from 'react';
import { Briefcase, TrendingUp, HeartHandshake, Settings, Laptop, Clock, ArrowRight, Download } from 'lucide-react';
import { Button } from './Button';

const audienceData = [
  {
    role: "Founders & CEOs",
    useCases: "Investor updates · Team check-ins · Partnership emails",
    description: "Sound decisive and clear without spending 20 minutes on a 3-line email.",
    icon: Briefcase
  },
  {
    role: "Sales Teams",
    useCases: "Follow-ups · Proposals · Client objections",
    description: "Every reply is a chance to close or lose. Get the tone right the first time.",
    icon: TrendingUp
  },
  {
    role: "Support Teams",
    useCases: "Ticket responses · Bug reports · Feature requests",
    description: "Turn frustrated customers into happy ones with replies that feel personal, not templated.",
    icon: HeartHandshake
  },
  {
    role: "Operators & PMs",
    useCases: "Status updates · Vendor coordination · Internal comms",
    description: "Keep projects moving with replies that are clear, professional, and straight to the point.",
    icon: Settings
  },
  {
    role: "Freelancers",
    useCases: "Client proposals · Project updates · Invoice follow-ups",
    description: "Sound professional with every client—even when juggling 10 projects at once.",
    icon: Laptop
  },
  {
    role: "Busy Professionals",
    useCases: "LinkedIn DMs · Slack threads · Email chains",
    description: "If your inbox never sleeps, neither should your ability to reply well under pressure.",
    icon: Clock
  }
];

interface AudienceProps {
  onOpenEditor: () => void;
}

export const Audience: React.FC<AudienceProps> = ({ onOpenEditor }) => {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Built for People Who Reply All Day
          </h2>
          <p className="text-xl text-slate-600">
            If words shape your work, this tool matters.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {audienceData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.role}</h3>
                
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-4">
                    {item.useCases}
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-slate-200">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">
              Whether you're closing deals or putting out fires SmartReply keeps your replies clear and confident.
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               {/* Fixed button: using variant secondary ensures correct text/bg contrast */}
               <Button 
                variant="secondary"
                size="lg" 
                className="w-full sm:w-auto border-0 shadow-lg shadow-indigo-900/20"
               >
                  <Download className="mr-2 w-4 h-4" />
                  Download Extension <span className="ml-1 text-amber-500"></span>
               </Button>
               <Button 
                
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto !text-white !border-slate-600 hover:!bg-white/10 hover:!border-white"
                onClick={() => {
    // Ensure user is logged out
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("sr_auth_token"); // if extension token exists

    // Navigate to main website
    window.location.href = "/app";
  }}
                
               >
                  Open Editor <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
