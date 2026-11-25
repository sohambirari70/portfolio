import { PortfolioData } from '../types/portfolio';
import { DEFAULT_PORTFOLIO_DATA } from './defaultPortfolio';

const STORAGE_KEY = 'soham_birari_portfolio_v1';
const THEME_KEY = 'soham_birari_theme_v1';

/**
 * Storage adapter structured so it can later be swapped with
 * a backend API / database + auth provider without rewriting UI components.
 */
export const portfolioStorage = {
  load(): PortfolioData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PORTFOLIO_DATA;
      const parsed = JSON.parse(raw) as Partial<PortfolioData>;
      if (!parsed || typeof parsed !== 'object' || !parsed.profile) {
        return DEFAULT_PORTFOLIO_DATA;
      }
      return {
        ...DEFAULT_PORTFOLIO_DATA,
        ...parsed,
        profile: {
          ...DEFAULT_PORTFOLIO_DATA.profile,
          ...parsed.profile,
        },
        contact: {
          ...DEFAULT_PORTFOLIO_DATA.contact,
          ...(parsed.contact ?? {}),
        },
        skills: Array.isArray(parsed.skills)
          ? parsed.skills
          : DEFAULT_PORTFOLIO_DATA.skills,
        projects: Array.isArray(parsed.projects)
          ? parsed.projects
          : DEFAULT_PORTFOLIO_DATA.projects,
        education: Array.isArray(parsed.education)
          ? parsed.education
          : DEFAULT_PORTFOLIO_DATA.education,
        journey: Array.isArray(parsed.journey)
          ? parsed.journey
          : DEFAULT_PORTFOLIO_DATA.journey,
        currentlyLearning: Array.isArray(parsed.currentlyLearning)
          ? parsed.currentlyLearning
          : DEFAULT_PORTFOLIO_DATA.currentlyLearning,
      };
    } catch {
      return DEFAULT_PORTFOLIO_DATA;
    }
  },

  save(data: PortfolioData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors cleanly
    }
  },

  reset(): PortfolioData {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_PORTFOLIO_DATA;
  },

  loadTheme(): 'dark' | 'light' {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // Default to dark theme
    }
    return 'dark';
  },

  saveTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  },
};
