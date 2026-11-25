import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Pencil } from 'lucide-react';
import { JourneyMilestone } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface JourneySectionProps {
  journey: JourneyMilestone[];
  onOpenEditor: () => void;
}

export function JourneySection({ journey, onOpenEditor }: JourneySectionProps) {
  const [activeId, setActiveId] = useState<string>(journey[0]?.id ?? '');
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="05 / My Journey"
            title="How I'm Growing Into Engineering"
            subtitle="An authentic, editable timeline of the milestones I'm working through right now — no inflated claims."
          />

          <button
            type="button"
            onClick={onOpenEditor}
            className="mb-12 inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2 font-mono text-xs font-medium text-slate-700 transition-colors hover:border-cyan-500/40 hover:text-cyan-600 md:self-auto dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:text-cyan-300"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Update Milestones</span>
          </button>
        </div>

        <div className="grid gap-4">
          {journey.map((step, index) => {
            const isSelected = activeId === step.id;
            return (
              <motion.div
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(step.id)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:p-6 ${
                    isSelected
                      ? 'border-cyan-500/50 bg-gradient-to-r from-cyan-500/[0.08] via-blue-500/[0.05] to-violet-500/[0.08] shadow-sm dark:border-cyan-400/45'
                      : 'border-slate-200/80 bg-white/80 hover:border-cyan-500/35 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300'
                            : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400">
                          {step.phase}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600 sm:self-center dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                      <Compass className="h-3 w-3 text-violet-500" />
                      {step.focusTag}
                    </span>
                  </div>

                  <p className="mt-3 pl-0 text-sm leading-relaxed text-slate-600 sm:pl-12 dark:text-slate-400">
                    {step.description}
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
