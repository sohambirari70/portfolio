import { Pencil } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface FooterProps {
  profile: PortfolioProfile;
  onOpenEditor: () => void;
}

export function Footer({ profile, onOpenEditor }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">
            {profile.name}
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {profile.degree} ({profile.specialization}) &middot; {profile.college}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-xs text-slate-600 transition-colors hover:border-cyan-500/40 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            <Pencil className="h-3 w-3" />
            <span>Edit Portfolio</span>
          </button>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            &copy; {year} {profile.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
