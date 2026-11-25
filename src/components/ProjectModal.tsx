import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Github, Pencil, X } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEditProject: () => void;
}

export function ProjectModal({ project, onClose, onEditProject }: ProjectModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-white/15 dark:bg-[#0d111a]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-cyan-500/12 px-2.5 py-0.5 font-mono text-xs font-medium text-cyan-700 dark:text-cyan-300">
                    {project.category}
                  </span>
                  <span className="rounded-md border border-slate-200 px-2.5 py-0.5 font-mono text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
                    {project.status}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white"
                >
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {project.isPlaceholder && (
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                This card is an editable sample placeholder. It is intentionally marked so it is never mistaken for a completed real-world project.
              </div>
            )}

            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {project.fullDescription}
            </p>

            {project.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Notes & Key Details
                </h4>
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <h4 className="font-mono text-xs tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Technologies
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-white/10">
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Live Demo</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-xl border border-slate-200 px-3.5 py-2 font-mono text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    No live demo URL set yet
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditProject();
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-3.5 py-2 text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-500/20 dark:text-cyan-300"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit Project</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
