import { motion, useReducedMotion } from 'framer-motion';
import { BookOpenCheck, BrainCircuit, GitBranch, Globe, Terminal } from 'lucide-react';
import { LearningTopic } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface CurrentlyLearningSectionProps {
  topics: LearningTopic[];
}

const ICONS = [Terminal, GitBranch, BookOpenCheck, Globe, BrainCircuit];

export function CurrentlyLearningSection({ topics }: CurrentlyLearningSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="learning" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="06 / Currently Learning"
          title="What I'm Actively Exploring"
          subtitle="As a first-year student, my edge comes from daily curiosity and consistent deliberate practice."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => {
            const Icon = ICONS[index % ICONS.length];
            const isFeatured = index === topics.length - 1 && topics.length % 3 === 2;

            return (
              <motion.div
                key={topic.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md transition-colors hover:border-cyan-500/45 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40 ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-600 dark:text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active Focus
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                  {topic.title}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-cyan-600 dark:text-cyan-400">
                  {topic.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {topic.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
