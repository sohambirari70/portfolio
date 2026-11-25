import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Cpu, Wrench } from 'lucide-react';
import { SkillCategory, SkillItem, SkillStatus } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface SkillsSectionProps {
  skills: SkillItem[];
}

const CATEGORIES: { key: SkillCategory; icon: typeof Code2; accent: string }[] = [
  { key: 'Programming', icon: Code2, accent: 'text-cyan-500 dark:text-cyan-400' },
  { key: 'Core Concepts', icon: Cpu, accent: 'text-violet-500 dark:text-violet-400' },
  { key: 'Tools', icon: Wrench, accent: 'text-blue-500 dark:text-blue-400' },
];

const STATUS_META: Record<
  SkillStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  practicing: {
    label: 'Practicing',
    badgeClass:
      'border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    dotClass: 'bg-cyan-400',
  },
  using: {
    label: 'Using',
    badgeClass:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    dotClass: 'bg-emerald-400',
  },
  learning: {
    label: 'Currently Learning',
    badgeClass:
      'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    dotClass: 'bg-violet-400',
  },
  editable: {
    label: 'Editable / Confirm',
    badgeClass:
      'border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    dotClass: 'bg-amber-400',
  },
};

type StatusFilter = 'all' | 'known' | 'learning' | 'editable';

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const reduceMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (filter === 'all') return skills;
    if (filter === 'known') {
      return skills.filter((s) => s.status === 'practicing' || s.status === 'using');
    }
    if (filter === 'learning') {
      return skills.filter((s) => s.status === 'learning');
    }
    return skills.filter((s) => s.status === 'editable');
  }, [skills, filter]);

  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 / Skills & Stack"
            title="Honest snapshot of my toolkit."
            subtitle="Clear distinction between fundamentals I actively practice, tools I use daily, topics I am learning, and editable slots."
          />

          {/* Interactive Status Filter */}
          <div
            role="group"
            aria-label="Filter skills by status"
            className="mb-12 flex flex-wrap gap-2"
          >
            {(
              [
                { id: 'all', label: 'All Skills' },
                { id: 'known', label: 'Practicing & Using' },
                { id: 'learning', label: 'Currently Learning' },
                { id: 'editable', label: 'Editable Slots' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-cyan-400 dark:text-slate-950'
                    : 'border border-slate-200 bg-white/75 text-slate-600 hover:border-cyan-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Skill Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {CATEGORIES.map((cat, catIdx) => {
            const Icon = cat.icon;
            const items = filteredSkills.filter((s) => s.category === cat.key);

            return (
              <motion.div
                key={cat.key}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: catIdx * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-5 flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.05]">
                      <Icon className={`h-4 w-4 ${cat.accent}`} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                      {cat.key}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {items.length}
                  </span>
                </div>

                {items.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    No skills match this filter in {cat.key}.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map((skill) => {
                      const meta = STATUS_META[skill.status];
                      return (
                        <motion.div
                          key={skill.id}
                          layout={!reduceMotion}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          className="group rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:border-cyan-500/40 hover:bg-white dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-cyan-400/35 dark:hover:bg-white/[0.05]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                              {skill.name}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${meta.badgeClass}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
                              {meta.label}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {skill.note}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
