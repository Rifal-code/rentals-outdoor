import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import rawFaqData from '@/data/faq.json';

interface FaqItem {
  id: string;
  tanya: string;
  jawab: string;
}

const faqs = rawFaqData as FaqItem[];

export const Faq: React.FC = () => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([faqs[0]?.id || 'faq-01']));

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      className="w-full bg-putih text-hitam py-20 lg:py-28 select-none"
      aria-label="Section Pertanyaan yang Sering Diajukan (FAQ)"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hitam/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-api" />
              <span className="font-hud text-xs tracking-widest text-api uppercase font-bold">
                PERTANYAAN UMUM // FAQ
              </span>
            </div>
            <h2 className="headline-tight text-4xl sm:text-6xl text-hitam">
              semua hal yang perlu kamu tahu sebelum berangkat.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-hitam/70 max-w-xs leading-relaxed font-medium">
            Aturan sewa, jaminan, dan kebijakan cuaca kami susun lugas tanpa tulisan kecil yang menjebak.
          </p>
        </div>

        {/* Baris Kotak Accordion Bergaris 1px */}
        <div className="border-t border-b border-hitam/20 divide-y divide-hitam/20" role="region">
          {faqs.map((faq, idx) => {
            const isOpen = openIds.has(faq.id);

            return (
              <div key={faq.id} className="transition-colors hover:bg-black/[0.01]">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full py-6 sm:py-8 flex items-start justify-between gap-6 text-left group focus-visible:outline-2 focus-visible:outline-cyan"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-hud text-xs sm:text-sm text-hitam/40 font-bold group-hover:text-api transition-colors flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="font-sans font-extrabold text-lg sm:text-2xl text-hitam lowercase tracking-tight leading-snug group-hover:text-api transition-colors">
                      {faq.tanya}
                    </h3>
                  </div>

                  <div className="p-2 border border-hitam/30 group-hover:border-hitam flex-shrink-0 transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-hitam" />
                    ) : (
                      <Plus className="w-4 h-4 text-hitam" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="pb-8 pl-10 sm:pl-16 pr-6 sm:pr-12 animate-in fade-in duration-200"
                  >
                    <p className="text-xs sm:text-sm text-hitam/80 leading-relaxed max-w-2xl font-normal">
                      {faq.jawab}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
