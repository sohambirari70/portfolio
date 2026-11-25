import { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  version: 1,
  profile: {
    name: 'Soham Birari',
    role: 'Aspiring AI/ML Engineer and Developer',
    headline: "Building Intelligent Things. Exploring What's Possible.",
    heroIntro:
      'First-year B.Tech Computer Science (AI & ML) student at Newton School of Technology, Pune. Focused on building strong foundations in Python, software engineering, and machine intelligence.',
    animatedRoles: [
      'AI/ML Engineer in Progress',
      'Python Developer',
      'Web Builder',
      'Tech & Startup Enthusiast',
    ],
    aboutParagraphs: [
      "Hi, I'm Soham Birari — a first-year Computer Science and Engineering (AI & ML) student at Newton School of Technology, Pune.",
      "Right now, I'm spending my time getting comfortable with how software actually works from the ground up: writing clean Python code, learning the terminal and Git workflows, building web interfaces, and studying the mathematical and algorithmic ideas behind artificial intelligence.",
      "I'm genuinely curious about how technology and startups turn thoughtful engineering into useful products. This space is a living record of what I'm studying, what I'm building along the way, and where my curiosity takes me next.",
    ],
    profileImageUrl: '',
    college: 'Newton School of Technology, Pune',
    degree: 'B.Tech in Computer Science and Engineering',
    specialization: 'Artificial Intelligence and Machine Learning',
    currentStatus: 'First-year engineering student',
    interests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Python',
      'Web Development',
      'Software Engineering',
      'Startups',
    ],
  },
  skills: [
    // Programming
    {
      id: 'skill-python',
      name: 'Python',
      category: 'Programming',
      status: 'practicing',
      note: 'Core language for problem solving, scripting, and upcoming AI/ML work.',
    },
    {
      id: 'skill-cpp',
      name: 'C / C++',
      category: 'Programming',
      status: 'editable',
      note: 'Editable placeholder — confirm or remove in Edit Portfolio if not part of your current stack.',
    },
    {
      id: 'skill-html-css',
      name: 'HTML / CSS',
      category: 'Programming',
      status: 'practicing',
      note: 'Structuring semantic web pages and styling responsive layouts.',
    },
    {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'Programming',
      status: 'editable',
      note: 'Editable placeholder — update status as you confirm or expand your JS experience.',
    },
    // Core Concepts
    {
      id: 'skill-problem-solving',
      name: 'Problem Solving',
      category: 'Core Concepts',
      status: 'practicing',
      note: 'Breaking down logic problems into clean, testable steps.',
    },
    {
      id: 'skill-dsa',
      name: 'Data Structures',
      category: 'Core Concepts',
      status: 'learning',
      note: 'Currently learning arrays, complexity basics, and foundational structures.',
    },
    {
      id: 'skill-ai',
      name: 'Artificial Intelligence',
      category: 'Core Concepts',
      status: 'learning',
      note: 'Exploring core AI concepts, search, and how intelligent systems reason.',
    },
    {
      id: 'skill-ml',
      name: 'Machine Learning',
      category: 'Core Concepts',
      status: 'learning',
      note: 'Currently learning foundational ML intuition and Python data workflows.',
    },
    // Tools
    {
      id: 'skill-git',
      name: 'Git',
      category: 'Tools',
      status: 'using',
      note: 'Tracking code changes, branching, and maintaining clean commit history.',
    },
    {
      id: 'skill-github',
      name: 'GitHub',
      category: 'Tools',
      status: 'using',
      note: 'Hosting repositories, collaborating on coursework, and documenting builds.',
    },
    {
      id: 'skill-vscode',
      name: 'VS Code',
      category: 'Tools',
      status: 'using',
      note: 'Primary editor for Python, web projects, and daily coding.',
    },
    {
      id: 'skill-linux',
      name: 'Linux',
      category: 'Tools',
      status: 'learning',
      note: 'Learning system navigation, permissions, and developer environment setup.',
    },
    {
      id: 'skill-terminal',
      name: 'Terminal / CLI',
      category: 'Tools',
      status: 'using',
      note: 'Running scripts, managing packages, and navigating projects efficiently.',
    },
  ],
  projects: [
    {
      id: 'proj-python-sample',
      title: 'Python CLI Utility [Sample Placeholder]',
      category: 'Python Projects',
      status: 'Sample Placeholder',
      isPlaceholder: true,
      shortDescription:
        'Editable placeholder for a Python command-line tool or automation script you build during your first year.',
      fullDescription:
        'This is a clearly marked sample template so you can replace it with your own real Python project (for example, a study tracker, file organizer, or algorithmic solver). Use the Edit Portfolio button in the header to customize the title, description, technologies, status, and links.',
      technologies: ['Python', 'CLI', 'Git'],
      highlights: [
        'Replace with actual problem statement and design choices',
        'Document what you learned while writing and testing it',
        'Link your real GitHub repository once pushed',
      ],
      githubUrl: 'https://github.com/your-username/python-cli-placeholder',
      liveUrl: '',
    },
    {
      id: 'proj-web-sample',
      title: 'Personal Web Interface [Sample Placeholder]',
      category: 'Web Development',
      status: 'Sample Placeholder',
      isPlaceholder: true,
      shortDescription:
        'Editable placeholder for a responsive web page or interactive frontend build created while practicing HTML, CSS, and modern UI.',
      fullDescription:
        'Use this slot for your real web development work — whether it is a clean landing page, a small utility app, or an interactive dashboard. Click Edit Portfolio to update the stack, status, and live preview link.',
      technologies: ['HTML/CSS', 'TypeScript', 'Responsive UI'],
      highlights: [
        'Replace with screenshots or key UI features you implemented',
        'Update status from Sample Placeholder to In Progress or Completed',
        'Attach your GitHub repo and deployed URL when live',
      ],
      githubUrl: 'https://github.com/your-username/web-project-placeholder',
      liveUrl: '',
    },
    {
      id: 'proj-aiml-sample',
      title: 'ML Notebook Exploration [Sample Placeholder]',
      category: 'AI/ML Experiments',
      status: 'Sample Placeholder',
      isPlaceholder: true,
      shortDescription:
        'Editable placeholder for your first data exploration or introductory Machine Learning experiment in Python.',
      fullDescription:
        'Designed as a starter slot for your AI & ML learning experiments — such as exploring datasets, visualizing patterns, or implementing a basic regression or classification notebook. Update it directly via Edit Portfolio as you build.',
      technologies: ['Python', 'Machine Learning', 'Jupyter'],
      highlights: [
        'Add the dataset or concept you explored',
        'Share observations and what surprised you in the results',
        'Keep status honest (In Progress / Learning Build / Completed)',
      ],
      githubUrl: 'https://github.com/your-username/ml-experiment-placeholder',
      liveUrl: '',
    },
    {
      id: 'proj-college-sample',
      title: 'First-Year Coursework Build [Sample Placeholder]',
      category: 'College Projects',
      status: 'Sample Placeholder',
      isPlaceholder: true,
      shortDescription:
        'Editable placeholder for an academic or hackathon build developed at Newton School of Technology, Pune.',
      fullDescription:
        'Track your college assignments, team builds, or campus hackathon prototypes here. Edit every field — including team notes, technologies used, and repository links — whenever you are ready to showcase real coursework.',
      technologies: ['Python', 'GitHub', 'Problem Solving'],
      highlights: [
        'Describe the coursework prompt or hackathon problem',
        'Highlight your individual contribution clearly',
        'Update links and status via the portfolio editor',
      ],
      githubUrl: 'https://github.com/your-username/college-project-placeholder',
      liveUrl: '',
    },
  ],
  education: [
    {
      id: 'edu-nst',
      institution: 'Newton School of Technology, Pune',
      degree: 'B.Tech – Computer Science and Engineering (AI & ML)',
      specialization: 'Artificial Intelligence & Machine Learning',
      period: '2026 – 2030 (Expected)',
      status: 'Currently Pursuing • Year 1',
      description:
        'Focusing on programming fundamentals, computer science theory, software engineering workflows, and foundational mathematics for artificial intelligence and machine learning.',
      isPlaceholder: false,
    },
    {
      id: 'edu-prior-placeholder',
      institution: 'Higher Secondary / Class XII [Editable Placeholder]',
      degree: 'Science / Mathematics Stream',
      specialization: 'Editable School / Board Details',
      period: 'Completed (Edit Year)',
      status: 'Editable Placeholder',
      description:
        'Optional slot for your high school or pre-university background. Open Edit Portfolio to add your school name and details, or remove this entry.',
      isPlaceholder: true,
    },
  ],
  journey: [
    {
      id: 'journey-1',
      phase: 'Step 01 • Foundation',
      title: 'Beginning my engineering journey',
      description:
        'Joined Newton School of Technology, Pune for B.Tech in Computer Science and Engineering (AI & ML), stepping into structured engineering and peer learning.',
      focusTag: 'CSE (AI & ML)',
      isEditableNote: true,
    },
    {
      id: 'journey-2',
      phase: 'Step 02 • First Code',
      title: 'Learning Python and programming fundamentals',
      description:
        'Building fluency with variables, control flow, functions, modular thinking, and writing clear problem-solving code in Python.',
      focusTag: 'Python',
      isEditableNote: true,
    },
    {
      id: 'journey-3',
      phase: 'Step 03 • Developer Workflow',
      title: 'Exploring Git, GitHub, and the terminal',
      description:
        'Practicing version control, committing cleanly, navigating Linux/CLI environments, and organizing projects like a working engineer.',
      focusTag: 'Git & Linux',
      isEditableNote: true,
    },
    {
      id: 'journey-4',
      phase: 'Step 04 • Building',
      title: 'Working on college projects and web interfaces',
      description:
        'Applying classroom concepts to hands-on coursework builds and experimenting with modern web development.',
      focusTag: 'Projects',
      isEditableNote: true,
    },
    {
      id: 'journey-5',
      phase: 'Step 05 • Direction',
      title: 'Exploring Artificial Intelligence and Machine Learning',
      description:
        'Gradually diving into how intelligent systems learn from data, building the math and Python foundation needed for real ML work.',
      focusTag: 'AI & ML',
      isEditableNote: true,
    },
  ],
  currentlyLearning: [
    {
      id: 'learn-python',
      title: 'Python Programming',
      subtitle: 'Core fluency & clean code',
      description:
        'Writing idiomatic Python scripts, practicing problem solving, and preparing for data structures and ML libraries.',
      tags: ['Syntax', 'Functions', 'Problem Solving'],
    },
    {
      id: 'learn-git',
      title: 'Git & GitHub',
      subtitle: 'Version control & collaboration',
      description:
        'Understanding commits, branches, pull requests, and keeping open-source and coursework repositories well documented.',
      tags: ['Commits', 'Branching', 'Workflows'],
    },
    {
      id: 'learn-linux',
      title: 'Linux & Command Line',
      subtitle: 'Developer environment mastery',
      description:
        'Getting fast with shell navigation, process tooling, environment management, and UNIX fundamentals.',
      tags: ['Bash / Zsh', 'File System', 'Tooling'],
    },
    {
      id: 'learn-web',
      title: 'Web Development',
      subtitle: 'Modern interfaces on the web',
      description:
        'Learning responsive design, semantic HTML/CSS, and interactive frontend engineering to ship ideas people can use.',
      tags: ['HTML/CSS', 'UI Design', 'Frontend'],
    },
    {
      id: 'learn-aiml',
      title: 'Artificial Intelligence & ML',
      subtitle: 'Foundations of intelligence',
      description:
        'Exploring how models learn patterns, core ML workflows, and the mathematics powering modern AI systems.',
      tags: ['AI Concepts', 'ML Basics', 'Math'],
    },
  ],
  contact: {
    email: 'soham.birari@example.com',
    github: 'https://github.com/your-github-username',
    linkedin: 'https://linkedin.com/in/your-linkedin-profile',
    instagram: 'https://instagram.com/your-instagram-handle',
    location: 'Pune, Maharashtra, India',
  },
};
