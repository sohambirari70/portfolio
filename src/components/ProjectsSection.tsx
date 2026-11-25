import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FolderGit2, Github, Layers, Sparkles } from 'lucide-react';
import { ProjectCategory, ProjectItem, ProjectStatus } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenEditor: () => void;
}

const PROJECT_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Python Projects',
  'Web Development',
  'AI/ML Experiments',
  'College Projects',
];

const STATUS_STYLE: Record<ProjectStatus, string> = {
  'Sample Placeholder':
    'border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  'In Progress':
    'border-cyan-500/35 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  'Learning Build':
    'border-violet-500/35 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  Completed:
    'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
};

export function ProjectsSection({
  projects,
  onSelectProject,
  onOpenEditor,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="03 / Projects"
          title="Selected Builds & Experiments"
          subtitle="Starter sample cards are clearly marked as editable placeholders until replaced with my completed real builds via Edit Portfolio."
        />

        {/* Category Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:text-sm ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'border border-slate-200 bg-white/75 text-slate-600 hover:border-cyan-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-cyan-500/45 px-3.5 py-2 font-mono text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>+ Add / Edit Projects</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center dark:border-white/15 dark:bg-white/[0.02]">
            <Layers className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 font-display text-base font-semibold text-slate-800 dark:text-slate-200">
              No projects in "{selectedCategory}" yet.
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Use Edit Portfolio to add a project to this category.
            </p>
          </div>
        ) : (
          <motion.div
            layout={!reduceMotion}
            className="grid gap-6 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md transition-colors hover:border-cyan-500/45 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <FolderGit2 className="h-3.5 w-3.5 text-cyan-500" />
                        {project.category}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${STATUS_STYLE[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {project.isPlaceholder && (
                      <div className="mb-3 rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-1.5 font-mono text-[11px] text-amber-700 dark:text-amber-300">
                        Editable sample template — customize with your real project details.
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.09]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/15 px-3 py-1.5 text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
