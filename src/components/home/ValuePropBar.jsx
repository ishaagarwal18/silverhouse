import React from 'react';
import { ShieldCheck, Award, Truck, Edit3 } from 'lucide-react';

export default function ValuePropBar() {
  const PILLARS = [
    {
      icon: ShieldCheck,
      title: "100% Hallmarked Silver",
      desc: "Every piece certified 925 Sterling or 999 Fine Pure Silver by Government Approved Assay Labs."
    },
    {
      icon: Award,
      title: "Lab Certified Rudraksha",
      desc: "100% authentic 1-14 Mukhi beads complete with individual gemological testing reports."
    },
    {
      icon: Truck,
      title: "Safe & Insured Shipping",
      desc: "Tamper-proof blister seal packaging with 100% transit insurance across 26,000+ PIN codes."
    },
    {
      icon: Edit3,
      title: "Custom Engraving Available",
      desc: "Personalize coins, thalis, and lockets with custom names, dates, or sacred family gotra."
    }
  ];

  return (
    <section className="py-12 bg-silver-50 border-y border-silver-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-silver-200 shadow-xs hover:border-[#D4AF37] transition-all">
                <div className="w-12 h-12 rounded-xl bg-silver-100 border border-silver-300 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-silver-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
