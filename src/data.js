import React, { createContext, useContext, useState } from 'react';

export const appInfo = {
  title: 'JobFinder',
  tagline: 'Explore Your Dream Jobs and Fast-Track Applications',
  primaryColor: '#475BD8',
  version: '2.0.0',
};

export const initialJobs = [
  {
    id: 'j1',
    title: 'Product Designer',
    company: 'Google',
    location: 'California, USA',
    salary: '$ 1.000 / month',
    type: 'Fulltime',
    level: 'Senior',
    category: 'Design',
    skills: ['UI UX Design', 'Figma', 'UI Design', 'Prototyping'],
    logoKey: 'logo_google.png',
    featured: true,
    description: 'One of the pioneers in the global tech realm. You will shape next-generation consumer applications used by billions around the globe.',
    requirements: [
      'You have excellent knowledge of UX and web design',
      'You know how developer workflows operate (additional points)',
      'You have at least 3 years of experience in a similar role',
    ],
    responsibilities: [
      'Implement and execute user testing and A/B testing',
      'Demonstrate your prototype / design results to user and stakeholder',
      'Formulate good design ideas and propose solutions to increase product usefulness',
    ],
  },
  {
    id: 'j2',
    title: 'UI Designer',
    company: 'Dribbble',
    location: 'Singapore',
    salary: '$ 500 / month',
    type: 'Internship',
    level: 'Junior',
    category: 'Design',
    skills: ['Visual Design', 'Figma', 'Illustrator', 'Iconography'],
    logoKey: 'logo_dribbble.png',
    featured: true,
    description: 'Join the world leading community for creatives to share, grow, and get hired. Collaborate with senior design directors on platform interface upgrades.',
    requirements: [
      'Strong portfolio demonstrating visual aesthetics and typography',
      'Familiarity with Figma component systems and auto-layout',
      'Enthusiastic mindset and eagerness to learn fast',
    ],
    responsibilities: [
      'Design engaging community discovery screens and promotional badges',
      'Maintain digital asset libraries and UI component variations',
    ],
  },
  {
    id: 'j3',
    title: 'Senior FrontEnd Dev',
    company: 'Bukalapak',
    location: 'Jakarta, Indonesia',
    salary: '$ 2.500 / month',
    type: 'Fulltime',
    level: 'Senior',
    category: 'Engineering',
    skills: ['React Native', 'TypeScript', 'Next.js', 'Tailwind'],
    logoKey: 'logo_bukalapak.png',
    featured: false,
    description: 'Bukalapak is one of the leading tech e-commerce giants in Southeast Asia, providing fair retail opportunities for micro-merchants.',
    requirements: [
      '5+ years hands-on frontend web and mobile application engineering',
      'Deep mastery of React, React Native, and state management architectures',
      'Strong knowledge of web performance metrics and SEO optimization',
    ],
    responsibilities: [
      'Architect robust web & mobile UI features with high responsiveness',
      'Collaborate closely with UI/UX designers and backend API engineers',
    ],
  },
  {
    id: 'j4',
    title: 'UI UX Designer',
    company: 'Gojek',
    location: 'Jakarta, Indonesia',
    salary: '$ 800.000 / month',
    type: 'Fulltime',
    level: 'Mid-Level',
    category: 'Design',
    skills: ['Design System', 'User Research', 'Figma', 'Wireframing'],
    logoKey: 'logo_gojek.png',
    featured: true,
    description: 'Super app powerhouse powering on-demand transport, food delivery, logistics, and cashless payments across millions of daily active users.',
    requirements: [
      '3-5 years of product design experience in high-growth mobile consumer apps',
      'Proven expertise conducting qualitative user discovery interviews',
      'Experience working inside multi-brand design systems (Asphalt)',
    ],
    responsibilities: [
      'Design frictionless booking checkout and delivery tracking experiences',
      'Coordinate with product managers on user journey maps and metric KPIs',
    ],
  },
  {
    id: 'j5',
    title: 'Digital Marketing',
    company: 'Tokopedia',
    location: 'Jakarta, Indonesia',
    salary: '$ 1.200 / month',
    type: 'Fulltime',
    level: '1-3 years Exp',
    category: 'Marketing',
    skills: ['SEO', 'Google Ads', 'Content Strategy', 'Analytics'],
    logoKey: 'logo_tokopedia.png',
    featured: false,
    description: 'Indonesias leading online marketplace enabling millions of small businesses to sell digitally with integrated payments.',
    requirements: [
      '2+ years running paid performance campaigns across Meta and Google',
      'Analytical mindset with proficiency in Google Analytics 4 and AppsFlyer',
    ],
    responsibilities: [
      'Scale seasonal mega shopping campaign conversions and ROI',
      'Draft creative briefs and iterate messaging based on weekly data',
    ],
  },
  {
    id: 'j6',
    title: 'Full Stack Engineer',
    company: 'Traveloka',
    location: 'Singapore / Remote',
    salary: '$ 2.800 / month',
    type: 'Fulltime',
    level: 'Senior',
    category: 'Engineering',
    skills: ['Node.js', 'React', 'GraphQL', 'AWS', 'PostgreSQL'],
    logoKey: 'logo_traveloka.png',
    featured: false,
    description: 'Southeast Asias premier lifestyle and travel super app covering flight reservations, stays, and financial products.',
    requirements: [
      '4+ years building distributed cloud applications and GraphQL APIs',
      'Strong foundation in relational databases, indexing, and Redis caching',
    ],
    responsibilities: [
      'Design reliable flight and accommodation booking microservices',
      'Ensure high availability during peak vacation holiday flash sales',
    ],
  },
];

export const initialApplications = [
  {
    id: 'app_1',
    jobId: 'j4',
    jobTitle: 'UI UX Designer',
    company: 'Gojek',
    location: 'Jakarta, Indonesia',
    salary: '$ 800.000 / month',
    appliedDate: '08 Jul 2021',
    status: 'Review',
    resumeName: 'Cv Muhamad Fadli.pdf',
    resumeUploadDate: 'Uploaded 02 Jul 2021, 11:38 pm',
    logoKey: 'logo_gojek.png',
    level: '3-5 years of experience',
    type: 'Fulltime',
    category: 'Design',
  },
  {
    id: 'app_2',
    jobId: 'j1',
    jobTitle: 'Product Designer',
    company: 'Google',
    location: 'California, USA',
    salary: '$ 1.000 / month',
    appliedDate: '12 Jul 2021',
    status: 'Interview',
    resumeName: 'Cv Muhamad Fadli.pdf',
    resumeUploadDate: 'Uploaded 02 Jul 2021, 11:38 pm',
    logoKey: 'logo_google.png',
    level: 'Senior',
    type: 'Fulltime',
    category: 'Design',
    interviewNote: 'Technical design walkthrough scheduled for Friday, 10:00 AM PST',
  },
  {
    id: 'app_3',
    jobId: 'j3',
    jobTitle: 'FrontEnd Developer',
    company: 'Bukalapak',
    location: 'Jakarta, Indonesia',
    salary: '$ 2.500 / month',
    appliedDate: '02 Jul 2021',
    status: 'Not Suitable',
    resumeName: 'Cv Muhamad Fadli.pdf',
    resumeUploadDate: 'Uploaded 02 Jul 2021, 11:38 pm',
    logoKey: 'logo_bukalapak.png',
    level: 'Senior',
    type: 'Fulltime',
    category: 'Engineering',
    feedback: 'Thank you for your interest. We selected candidates matching local timezone.',
  },
];

export const initialNotifications = [
  {
    id: 'n1',
    title: 'Application Sent',
    message: 'Your application for UI UX Designer at Gojek has been successfully sent.',
    time: '1 day ago',
    read: false,
    type: 'sent',
  },
  {
    id: 'n2',
    title: 'Interview Scheduled',
    message: 'Google has invited you for a Product Designer interview round!',
    time: '2 days ago',
    read: false,
    type: 'interview',
  },
  {
    id: 'n3',
    title: 'Profile Viewed',
    message: 'A recruiter from Bukalapak viewed your profile and resume.',
    time: '5 days ago',
    read: true,
    type: 'view',
  },
];

const JobFinderContext = createContext(null);

export const JobFinderProvider = ({ children }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [bookmarks, setBookmarks] = useState(['j1', 'j4']);
  const [applications, setApplications] = useState(initialApplications);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [userProfile, setUserProfile] = useState({
    name: 'Muhamad Fadli',
    email: 'Fadly00@gmail.com',
    dob: '12-12-2000',
    phone: '+62 8123213148',
    address: 'Jalan Merpati Sakti, Panam Pekanbaru, Riau Indonesia',
    passwordMasked: '•••••••••••••••••',
    avatarKey: 'avatar_fadli.png',
    resumeName: 'Cv Muhamad Fadli.pdf',
    resumeUploadDate: 'Uploaded 02 Jul 2021, 11:38 pm',
  });

  const toggleBookmark = (jobId) => {
    setBookmarks((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const isBookmarked = (jobId) => bookmarks.includes(jobId);

  const applyForJob = ({ job, coverLetter, phone, address }) => {
    const newApplication = {
      id: 'app_' + Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Review',
      resumeName: userProfile.resumeName,
      resumeUploadDate: userProfile.resumeUploadDate,
      logoKey: job.logoKey,
      level: job.level,
      type: job.type,
      category: job.category,
      coverLetter,
      phone: phone || userProfile.phone,
      address: address || userProfile.address,
    };

    setApplications((prev) => [newApplication, ...prev]);

    // Also add a notification
    setNotifications((prev) => [
      {
        id: 'n_' + Date.now(),
        title: 'Application Sent',
        message: `Your applying to ${job.company} as ${job.title} has been sent.`,
        time: 'Just now',
        read: false,
        type: 'sent',
      },
      ...prev,
    ]);

    return newApplication;
  };

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const value = {
    jobs,
    bookmarks,
    applications,
    notifications,
    userProfile,
    toggleBookmark,
    isBookmarked,
    applyForJob,
    updateProfile,
  };

  return (
    <JobFinderContext.Provider value={value}>
      {children}
    </JobFinderContext.Provider>
  );
};

export const useJobFinder = () => {
  const context = useContext(JobFinderContext);
  if (!context) {
    throw new Error('useJobFinder must be used within a JobFinderProvider');
  }
  return context;
};
