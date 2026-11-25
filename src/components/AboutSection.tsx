import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin, Pencil, User } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface AboutSectionProps {
  profile: PortfolioProfile;
  location: string;
  onOpenEditor: () => void;
}

export function AboutSection({ profile, location, onOpenEditor }: AboutSectionProps) {
  const reduceMotion = useReducedMotion();

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="01 / About Me"
          title="Curious mind, learning from first principles."
          subtitle="First-year engineering student focused on building real fundamentals before shortcuts."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Editable Profile Portrait Card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
              <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50 dark:border-white/10 dark:from-[#0e1422] dark:via-[#0b0f18] dark:to-[#131126]">
                {profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={`${profile.name} portrait`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-violet-500/20 shadow-inner">
                      <span className="font-display text-3xl font-bold tracking-tight text-cyan-600 dark:text-cyan-300">
                        {initials || <User className="h-10 w-10" />}
                      </span>
                    </div>
                    <p className="font-mono text-xs font-medium tracking-wider text-slate-600 uppercase dark:text-slate-300">
                      Editable Profile Image
                    </p>
                    <p className="mt-1.5 max-w-[230px] text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      Add your portrait URL or upload a photo anytime in the portfolio editor.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenEditor}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300"
                    >
                      <Pencil className="h-3 w-3" />
                      <span>Upload / Set Photo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Authentic quick identity bar */}
              <div className="mt-4 space-y-2.5 px-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {profile.name}
                  </span>
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    Year 1 CSE
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3.5 w-3.5 shrink-0 text-cyan-500" />
                    <span>{profile.college}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                    <span>{profile.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Natural First-Person Bio */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-6 lg:col-span-7"
          >
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-[17px] dark:text-slate-300">
                {profile.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-7 border-t border-slate-200/80 pt-6 dark:border-white/10">
                <p className="mb-3 font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Areas of Interest
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-cyan-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Honest Snapshot Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="font-mono text-xs text-cyan-600 uppercase dark:text-cyan-400">
                  Academic Track
                </p>
                <p className="mt-1.5 font-display text-base font-semibold text-slate-900 dark:text-white">
                  {profile.degree}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Specialized in {profile.specialization}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="font-mono text-xs text-violet-600 uppercase dark:text-violet-400">
                  Current Focus
                </p>
                <p className="mt-1.5 font-display text-base font-semibold text-slate-900 dark:text-white">
                  {profile.role}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Building consistency in Python, web systems, and ML concepts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
