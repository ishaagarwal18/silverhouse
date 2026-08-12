import React from 'react';
import { TESTIMONIALS } from '../../data/products';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#AA820A] tracking-widest uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full inline-block mb-3">
            VERIFIED CUSTOMER REVIEWS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Loved by 50,000+ Devotees Across India
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3 mb-4" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-silver-50 border border-silver-200 silver-card-shadow flex flex-col justify-between relative group hover:border-[#D4AF37] transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D4AF37]/30 mb-2" />
                
                {/* Rating */}
                <div className="flex items-center space-x-1 text-[#D4AF37] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-[#1A1A1A] ml-2">{review.date}</span>
                </div>

                <p className="text-xs text-silver-700 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-silver-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-[#1A1A1A]">{review.name}</h4>
                    <span className="text-[10px] text-silver-500">{review.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
