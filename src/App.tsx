import { useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { portfolioStorage } from './data/portfolioStorage';
import { PortfolioData, ProjectItem } from './types/portfolio';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { EducationSection } from './components/EducationSection';
import { JourneySection } from './components/JourneySection';
import { CurrentlyLearningSection } from './components/CurrentlyLearningSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { PortfolioEditorDrawer } from './components/PortfolioEditorDrawer';

export function App() {
  const [data, setData] = useState<PortfolioData>(() => portfolioStorage.load());
  const [theme, setTheme] = useState<'dark' | 'light'>(() => portfolioStorage.loadTheme());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    portfolioStorage.saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${data.profile.name} — ${data.profile.role}`;
  }, [data.profile.name, data.profile.role]);

  const handleUpdateData = (next: PortfolioData) => {
    setData(next);
    portfolioStorage.save(next);
  };

  const handleResetData = () => {
    const reset = portfolioStorage.reset();
    setData(reset);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <CustomCursor />

        <Navbar
          name={data.profile.name}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        {/* Elegant non-blocking page entrance reveal */}
        <motion.main
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <HeroSection profile={data.profile} />
          <AboutSection
            profile={data.profile}
            location={data.contact.location}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
          <SkillsSection skills={data.skills} />
          <ProjectsSection
            projects={data.projects}
            onSelectProject={setSelectedProject}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
          <EducationSection education={data.education} />
          <JourneySection
            journey={data.journey}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
          <CurrentlyLearningSection topics={data.currentlyLearning} />
          <ContactSection
            contact={data.contact}
            onOpenEditor={() => setIsEditorOpen(true)}
          />
        </motion.main>

        <Footer
          profile={data.profile}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <BackToTop />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEditProject={() => setIsEditorOpen(true)}
        />

        <PortfolioEditorDrawer
          isOpen={isEditorOpen}
          data={data}
          onChange={handleUpdateData}
          onReset={handleResetData}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
