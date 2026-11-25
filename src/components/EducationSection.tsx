import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { EducationItem } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="04 / Education"
          title="Academic Foundation"
          subtitle="Where I am studying computer science, engineering fundamentals, and artificial intelligence."
        />

        <div className="relative ml-3 border-l border-slate-200 pl-7 sm:ml-4 sm:pl-9 dark:border-white/10">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className={`relative ${idx !== education.length - 1 ? 'pb-10' : ''}`}
            >
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className={`absolute -left-[37px] top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:-left-[45px] ${
                  edu.isPlaceholder
                    ? 'border-amber-400 bg-white dark:bg-[#06070b]'
                    : 'border-cyan-400 bg-cyan-500/20 dark:bg-[#06070b]'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    edu.isPlaceholder ? 'bg-amber-400' : 'bg-cyan-400'
                  }`}
                />
              </span>

              <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md transition-colors hover:border-cyan-500/40 sm:p-7 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/35">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      <GraduationCap className="h-4 w-4" />
                      <span>{edu.status}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="mt-1 text-base font-medium text-slate-700 dark:text-slate-200">
                      {edu.degree}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 sm:items-end">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                      {edu.period}
                    </span>
                    {!edu.isPlaceholder && (
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3 w-3" />
                        Pune, India
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {edu.description}
                </p>

                <div className="mt-4 inline-flex items-center rounded-lg border border-violet-500/25 bg-violet-500/10 px-3 py-1 font-mono text-xs text-violet-700 dark:text-violet-300">
                  Specialization: {edu.specialization}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
