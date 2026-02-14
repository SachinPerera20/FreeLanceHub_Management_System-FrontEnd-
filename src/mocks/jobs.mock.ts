export type MockJob = {
    id: string;
    title: string;
    description: string;
    budget: number;
    skills: string[];
    clientName: string;
    createdAt: string; // ISO string
    createdBy: string;
  };
  
  export const MOCK_JOBS: MockJob[] = [
    {
      id: 'job_001',
      title: 'Build a responsive landing page with React + Tailwind',
      description:
        'Need a modern landing page with sections, animations, and a clean responsive layout. Must be optimized for mobile.',
      budget: 450,
      skills: ['React', 'Tailwind', 'UI'],
      clientName: 'Nimal Perera',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
      createdBy: "user000"
      
    },
    {
      id: 'job_002',
      title: 'Create a Node.js REST API for freelance platform',
      description:
        'Build REST endpoints with JWT authentication, role-based access, and clean architecture. Prefer TypeScript.',
      budget: 900,
      skills: ['Node.js', 'Express', 'JWT'],
      clientName: 'Amaya Silva',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(), // 9h ago
      createdBy: "user001"
    },
    {
      id: 'job_003',
      title: 'Power BI dashboard for sales analytics',
      description:
        'Create an interactive Power BI dashboard with KPIs, filtering, and drill-down views from Excel/CSV.',
      budget: 300,
      skills: ['Power BI', 'Data', 'Dashboard'],
      clientName: 'Kavindu Jayasuriya',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 28h ago
      createdBy: "user002"
    },
    {
      id: 'job_004',
      title: 'Fix bugs and improve performance in React app',
      description:
        'Need help debugging a React app, reducing re-renders, optimizing list rendering, and improving loading UX.',
      budget: 600,
      skills: ['React', 'Performance', 'TypeScript'],
      clientName: 'Sachini Fernando',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15m ago
      createdBy: "user003"
    },
    {
      id: 'job_005',
      title: 'Design a modern UI kit for SaaS dashboard',
      description:
        'Need reusable components (buttons, inputs, cards) with Tailwind, consistent spacing, and premium look.',
      budget: 750,
      skills: ['Tailwind', 'Design', 'UI Kit'],
      clientName: 'Ravindu Perera',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3d ago
      createdBy: "user004"
    },
  ];
  