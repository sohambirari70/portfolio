import { ChangeEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  Download,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  PortfolioData,
  ProjectCategory,
  ProjectItem,
  ProjectStatus,
  SkillCategory,
  SkillItem,
  SkillStatus,
} from '../types/portfolio';

interface PortfolioEditorDrawerProps {
  isOpen: boolean;
  data: PortfolioData;
  onChange: (next: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

type EditorTab = 'profile' | 'skills' | 'projects' | 'journey' | 'links';

const TABS: { id: EditorTab; label: string }[] = [
  { id: 'profile', label: 'Profile & About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey & Learning' },
  { id: 'links', label: 'Contact & Backup' },
];

export function PortfolioEditorDrawer({
  isOpen,
  data,
  onChange,
  onReset,
  onClose,
}: PortfolioEditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('profile');
  const [importError, setImportError] = useState<string>('');
  const [confirmReset, setConfirmReset] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setImportError('Please choose an image smaller than 2 MB for local browser storage.');
      return;
    }
    setImportError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({
          ...data,
          profile: { ...data.profile, profileImageUrl: reader.result },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Skill Helpers ---
  const addSkill = () => {
    const nextSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: 'Programming',
      status: 'learning',
      note: 'Describe what you know or are exploring with this skill.',
    };
    onChange({ ...data, skills: [...data.skills, nextSkill] });
  };

  const updateSkill = (id: string, patch: Partial<SkillItem>) => {
    onChange({
      ...data,
      skills: data.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  };

  const deleteSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  // --- Project Helpers ---
  const addProject = () => {
    const nextProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      category: 'Python Projects',
      status: 'In Progress',
      isPlaceholder: false,
      shortDescription: 'Brief summary of what this project does and why you built it.',
      fullDescription: 'Detailed explanation of your architecture, tools, and what you learned.',
      technologies: ['Python', 'Git'],
      highlights: ['Key feature or takeaway'],
      githubUrl: 'https://github.com/your-username/repo',
      liveUrl: '',
    };
    onChange({ ...data, projects: [nextProject, ...data.projects] });
  };

  const updateProject = (id: string, patch: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  };

  const deleteProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  // --- Journey Helpers ---
  const addJourneyStep = () => {
    onChange({
      ...data,
      journey: [
        ...data.journey,
        {
          id: `journey-${Date.now()}`,
          phase: `Step ${String(data.journey.length + 1).padStart(2, '0')}`,
          title: 'New Learning Milestone',
          description: 'Describe what you explored or accomplished in this phase.',
          focusTag: 'Learning',
          isEditableNote: true,
        },
      ],
    });
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'soham-portfolio-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as PortfolioData;
        if (!parsed.profile || !Array.isArray(parsed.projects) || !Array.isArray(parsed.skills)) {
          setImportError('Invalid portfolio JSON structure.');
          return;
        }
        setImportError('');
        onChange(parsed);
      } catch {
        setImportError('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500';
  const labelClass =
    'mb-1 block font-mono text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit Portfolio Content"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-slate-200 bg-slate-50 shadow-2xl dark:border-white/10 dark:bg-[#090c13]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0c101a]">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Portfolio Editor
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update sections live without touching HTML
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close portfolio editor"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Honest Local/Demo Notice */}
            <div className="border-b border-amber-500/25 bg-amber-500/10 px-5 py-3 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <span className="font-semibold">Local / Demo Mode Only:</span> Changes save automatically to your browser&apos;s <code className="font-mono">localStorage</code> on this device. Authentication and a shared database are not connected yet, so edits are not published globally to other visitors. Use <strong>Export JSON</strong> under Contact &amp; Backup to save a portable copy.
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-[#0c101a]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              {importError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-300">
                  {importError}
                </div>
              )}

              {/* TAB 1: PROFILE & ABOUT */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        value={data.profile.name}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            profile: { ...data.profile, name: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Role Title</label>
                      <input
                        type="text"
                        value={data.profile.role}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            profile: { ...data.profile, role: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Hero Headline</label>
                    <input
                      type="text"
                      value={data.profile.headline}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          profile: { ...data.profile, headline: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Hero Short Introduction</label>
                    <textarea
                      rows={3}
                      value={data.profile.heroIntro}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          profile: { ...data.profile, heroIntro: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Animated Roles (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={data.profile.animatedRoles.join(', ')}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          profile: {
                            ...data.profile,
                            animatedRoles: e.target.value
                              .split(',')
                              .map((v) => v.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      About Me Paragraphs (separate with blank line)
                    </label>
                    <textarea
                      rows={6}
                      value={data.profile.aboutParagraphs.join('\n\n')}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          profile: {
                            ...data.profile,
                            aboutParagraphs: e.target.value
                              .split(/\n\s*\n/)
                              .map((p) => p.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <label className={labelClass}>Profile Image URL or Upload</label>
                    <input
                      type="url"
                      placeholder="https://example.com/your-photo.jpg"
                      value={data.profile.profileImageUrl}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          profile: { ...data.profile, profileImageUrl: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-700 hover:bg-cyan-500/20 dark:text-cyan-300">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Local Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {data.profile.profileImageUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            onChange({
                              ...data,
                              profile: { ...data.profile, profileImageUrl: '' },
                            })
                          }
                          className="rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Mark skills honestly as Practicing, Using, Learning, or Editable.
                    </p>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                          className={`${inputClass} font-semibold`}
                        />
                        <button
                          type="button"
                          onClick={() => deleteSkill(skill.id)}
                          aria-label={`Delete skill ${skill.name}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Category</label>
                          <select
                            value={skill.category}
                            onChange={(e) =>
                              updateSkill(skill.id, {
                                category: e.target.value as SkillCategory,
                              })
                            }
                            className={inputClass}
                          >
                            <option value="Programming">Programming</option>
                            <option value="Core Concepts">Core Concepts</option>
                            <option value="Tools">Tools</option>
                          </select>
                        </div>

                        <div>
                          <label className={labelClass}>Status</label>
                          <select
                            value={skill.status}
                            onChange={(e) =>
                              updateSkill(skill.id, {
                                status: e.target.value as SkillStatus,
                              })
                            }
                            className={inputClass}
                          >
                            <option value="practicing">Practicing</option>
                            <option value="using">Using</option>
                            <option value="learning">Currently Learning</option>
                            <option value="editable">Editable / Confirm</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Note</label>
                        <input
                          type="text"
                          value={skill.note}
                          onChange={(e) => updateSkill(skill.id, { note: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Add new builds, edit statuses, or replace sample placeholders.
                    </p>
                    <button
                      type="button"
                      onClick={addProject}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {data.projects.map((project) => (
                    <div
                      key={project.id}
                      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) =>
                            updateProject(project.id, { title: e.target.value })
                          }
                          className={`${inputClass} font-semibold`}
                        />
                        <button
                          type="button"
                          onClick={() => deleteProject(project.id)}
                          aria-label={`Delete project ${project.title}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Category</label>
                          <select
                            value={project.category}
                            onChange={(e) =>
                              updateProject(project.id, {
                                category: e.target.value as ProjectCategory,
                              })
                            }
                            className={inputClass}
                          >
                            <option value="Python Projects">Python Projects</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI/ML Experiments">AI/ML Experiments</option>
                            <option value="College Projects">College Projects</option>
                          </select>
                        </div>

                        <div>
                          <label className={labelClass}>Status</label>
                          <select
                            value={project.status}
                            onChange={(e) => {
                              const nextStatus = e.target.value as ProjectStatus;
                              updateProject(project.id, {
                                status: nextStatus,
                                isPlaceholder: nextStatus === 'Sample Placeholder',
                              });
                            }}
                            className={inputClass}
                          >
                            <option value="Sample Placeholder">Sample Placeholder</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Learning Build">Learning Build</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Short Description</label>
                        <textarea
                          rows={2}
                          value={project.shortDescription}
                          onChange={(e) =>
                            updateProject(project.id, { shortDescription: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Full Description (Modal)</label>
                        <textarea
                          rows={3}
                          value={project.fullDescription}
                          onChange={(e) =>
                            updateProject(project.id, { fullDescription: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={project.technologies.join(', ')}
                          onChange={(e) =>
                            updateProject(project.id, {
                              technologies: e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean),
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>GitHub URL</label>
                          <input
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) =>
                              updateProject(project.id, { githubUrl: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Live Demo URL</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={project.liveUrl}
                            onChange={(e) =>
                              updateProject(project.id, { liveUrl: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: JOURNEY & LEARNING */}
              {activeTab === 'journey' && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        My Journey Milestones
                      </h3>
                      <button
                        type="button"
                        onClick={addJourneyStep}
                        className="inline-flex items-center gap-1 rounded-lg bg-cyan-500 px-2.5 py-1 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Step</span>
                      </button>
                    </div>

                    {data.journey.map((step) => (
                      <div
                        key={step.id}
                        className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={step.phase}
                            onChange={(e) =>
                              onChange({
                                ...data,
                                journey: data.journey.map((j) =>
                                  j.id === step.id ? { ...j, phase: e.target.value } : j
                                ),
                              })
                            }
                            className={`${inputClass} font-mono text-xs`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              onChange({
                                ...data,
                                journey: data.journey.filter((j) => j.id !== step.id),
                              })
                            }
                            aria-label={`Delete milestone ${step.title}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              journey: data.journey.map((j) =>
                                j.id === step.id ? { ...j, title: e.target.value } : j
                              ),
                            })
                          }
                          className={`${inputClass} font-semibold`}
                        />

                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              journey: data.journey.map((j) =>
                                j.id === step.id
                                  ? { ...j, description: e.target.value }
                                  : j
                              ),
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Currently Learning Editor */}
                  <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        Currently Learning Topics
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...data,
                            currentlyLearning: [
                              ...data.currentlyLearning,
                              {
                                id: `learn-${Date.now()}`,
                                title: 'New Learning Topic',
                                subtitle: 'Focus area',
                                description: 'What you are exploring right now.',
                                tags: ['Practice'],
                              },
                            ],
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-cyan-500 px-2.5 py-1 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Topic</span>
                      </button>
                    </div>

                    {data.currentlyLearning.map((topic) => (
                      <div
                        key={topic.id}
                        className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(e) =>
                              onChange({
                                ...data,
                                currentlyLearning: data.currentlyLearning.map((t) =>
                                  t.id === topic.id ? { ...t, title: e.target.value } : t
                                ),
                              })
                            }
                            className={`${inputClass} font-semibold`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              onChange({
                                ...data,
                                currentlyLearning: data.currentlyLearning.filter(
                                  (t) => t.id !== topic.id
                                ),
                              })
                            }
                            aria-label={`Delete topic ${topic.title}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={topic.subtitle}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              currentlyLearning: data.currentlyLearning.map((t) =>
                                t.id === topic.id ? { ...t, subtitle: e.target.value } : t
                              ),
                            })
                          }
                          className={`${inputClass} text-xs`}
                        />

                        <textarea
                          rows={2}
                          value={topic.description}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              currentlyLearning: data.currentlyLearning.map((t) =>
                                t.id === topic.id
                                  ? { ...t, description: e.target.value }
                                  : t
                              ),
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LINKS & BACKUP */}
              {activeTab === 'links' && (
                <div className="space-y-5">
                  <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      Contact &amp; Social Links
                    </h3>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        value={data.contact.email}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            contact: { ...data.contact, email: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>GitHub URL</label>
                      <input
                        type="url"
                        value={data.contact.github}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            contact: { ...data.contact, github: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>LinkedIn URL</label>
                      <input
                        type="url"
                        value={data.contact.linkedin}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            contact: { ...data.contact, linkedin: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Instagram URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="Leave empty to hide"
                        value={data.contact.instagram}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            contact: { ...data.contact, instagram: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Data Backup & Reset */}
                  <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      Backup &amp; Restore Data
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Export your edited portfolio as JSON so you can version-control it in GitHub or import it later.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={exportJson}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Export JSON</span>
                      </button>

                      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Import JSON</span>
                        <input
                          type="file"
                          accept="application/json"
                          onChange={importJson}
                          className="hidden"
                        />
                      </label>

                      {!confirmReset ? (
                        <button
                          type="button"
                          onClick={() => setConfirmReset(true)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Reset Defaults</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onReset();
                              setConfirmReset(false);
                            }}
                            className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-500"
                          >
                            Confirm Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmReset(false)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
