import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Github,
  Info,
  Instagram,
  Linkedin,
  Mail,
  Pencil,
  Send,
} from 'lucide-react';
import { ContactLinks } from '../types/portfolio';
import { SectionHeader } from './SectionHeader';

interface ContactSectionProps {
  contact: ContactLinks;
  onOpenEditor: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection({ contact, onOpenEditor }: ContactSectionProps) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'validated-local' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!subject.trim() || subject.trim().length < 3) {
      next.subject = 'Please add a short subject (at least 3 characters).';
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = 'Please write a message of at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitState('error');
      return;
    }
    setSubmitState('validated-local');
  };

  const buildMailtoHref = () => {
    const targetEmail = contact.email || 'soham.birari@example.com';
    const mailSubject = encodeURIComponent(`[Portfolio] ${subject.trim()}`);
    const mailBody = encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\n\n${message.trim()}`
    );
    return `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleCopyMessage = async () => {
    const payload = `To: ${contact.email}\nFrom: ${name.trim()} (${email.trim()})\nSubject: ${subject.trim()}\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  const socialItems = [
    {
      label: 'Email',
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : '',
      icon: Mail,
      isPlaceholder: contact.email.includes('example.com'),
    },
    {
      label: 'GitHub',
      value: contact.github,
      href: contact.github,
      icon: Github,
      isPlaceholder: contact.github.includes('your-github-username'),
    },
    {
      label: 'LinkedIn',
      value: contact.linkedin,
      href: contact.linkedin,
      icon: Linkedin,
      isPlaceholder: contact.linkedin.includes('your-linkedin-profile'),
    },
    ...(contact.instagram
      ? [
          {
            label: 'Instagram (Optional)',
            value: contact.instagram,
            href: contact.instagram,
            icon: Instagram,
            isPlaceholder: contact.instagram.includes('your-instagram-handle'),
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="07 / Contact"
          title="Let's Connect"
          subtitle="Open to learning conversations, college collaborations, hackathons, and engineering feedback."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Editable Contact Channels */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  Direct Channels
                </h3>
                <button
                  type="button"
                  onClick={onOpenEditor}
                  className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-700 transition-colors hover:bg-cyan-500/20 dark:text-cyan-300"
                >
                  <Pencil className="h-3 w-3" />
                  <span>Edit Links</span>
                </button>
              </div>

              <div className="space-y-3">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href || '#contact'}
                      target={item.label === 'Email' ? undefined : '_blank'}
                      rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 transition-all hover:border-cyan-500/45 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-white/[0.05]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-cyan-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-cyan-400">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                              {item.label}
                            </span>
                            {item.isPlaceholder && (
                              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] text-amber-700 dark:text-amber-300">
                                Editable
                              </span>
                            )}
                          </div>
                          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                            {item.value}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-500" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Validated Contact Form */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md sm:p-8 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-blue-500/25 bg-blue-500/8 p-3.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>
                  This form validates your message locally. Because no email backend is configured yet, submitting prepares your message so you can send it directly via your email app or copy it cleanly.
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Alex Sharma"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-xs text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="alex@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-xs text-rose-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block font-mono text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder="Project collaboration / Question / Hello"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                />
                {errors.subject && (
                  <p id="contact-subject-error" className="mt-1.5 text-xs text-rose-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Write your message here..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-rose-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitState === 'error' && (
                <div
                  role="alert"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Please fix the highlighted fields above before continuing.</span>
                </div>
              )}

              {submitState === 'validated-local' && (
                <div
                  role="status"
                  className="mt-4 space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs leading-relaxed text-emerald-800 dark:text-emerald-200"
                >
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <div>
                      <p className="font-semibold">
                        Message validated locally — not automatically emailed yet.
                      </p>
                      <p className="mt-1 opacity-90">
                        Because there is no backend server connected to this static site, choose an option below to send your message directly:
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    <a
                      href={buildMailtoHref()}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white transition-colors hover:bg-emerald-500"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/30 bg-white/80 px-3 py-1.5 font-medium text-emerald-800 transition-colors hover:bg-white dark:bg-white/10 dark:text-emerald-200"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Message'}</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Send className="h-4 w-4" />
                  <span>Prepare Message</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
