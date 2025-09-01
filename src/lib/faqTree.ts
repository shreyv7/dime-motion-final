export type FaqNode = {
  id: string;
  title: string;
  description?: string;
  children?: FaqNode[];
  answer?: string;
  link?: string;
};

export const faqTree: FaqNode = {
  id: 'root',
  title: 'How can we help you today?',
  children: [
    {
      id: 'services',
      title: 'Services',
      children: [
        {
          id: 'video',
          title: 'Video Production',
          children: [
            {
              id: 'video-what-we-offer',
              title: 'What we offer',
              answer:
                'We produce reels, ads, brand films, product demos, motion graphics, and long-form content. We handle scripting, shooting, editing, color, sound, and delivery.'
            },
            {
              id: 'video-timeline',
              title: 'Typical timeline',
              answer:
                'Short-form pieces: 1-2 weeks. Brand films: 3-6 weeks. Schedules vary by scope, availability, and revisions.'
            }
          ]
        },
        {
          id: 'web',
          title: 'Web & Apps',
          children: [
            {
              id: 'web-stack',
              title: 'Tech stack',
              answer:
                'We build with React, TypeScript, Tailwind, Vite, and Supabase when needed. We optimize performance, accessibility, and SEO.'
            },
            {
              id: 'web-timeline',
              title: 'Typical timeline',
              answer:
                'Landing pages: 1-2 weeks. Marketing sites: 2-4 weeks. Web apps: 4-8+ weeks depending on features.'
            }
          ]
        },
        {
          id: 'ai',
          title: 'AI & Creative Automation',
          children: [
            {
              id: 'ai-what-we-do',
              title: 'What we do',
              answer:
                'We apply AI for content generation, editing assistance, personalization, and workflow automation that fits your brand.'
            }
          ]
        }
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      children: [
        {
          id: 'collab-how-we-work',
          title: 'How we work with clients',
          answer:
            'We collaborate in weekly check-ins, share milestones, and keep feedback tight via a single channel (email or Slack). You get previews and staged builds for fast iteration.'
        },
        {
          id: 'collab-communication',
          title: 'Communication & tools',
          answer:
            'Primary: email. Optional: Slack/WhatsApp groups for faster loops. We use Notion/Jira for tasks if needed, and Frame.io/Google Drive for video review & assets.'
        },
        {
          id: 'collab-revisions',
          title: 'Revisions policy',
          answer:
            'Each scope includes defined revision rounds. We align on notes per round to keep timelines predictable; extra rounds can be added if needed.'
        }
      ]
    },
    {
      id: 'about-us',
      title: 'About Us',
      children: [
        {
          id: 'about-mission',
          title: 'Mission',
          answer:
            'Dime Motion blends cinematic craft with code and AI to create memorable digital experiences that convert attention into results.'
        },
        {
          id: 'about-team',
          title: 'Team & expertise',
          answer:
            'A collective of creators, developers, and innovators with 3+ years experience, 2356+ videos, and 100M+ views across platforms.'
        },
        {
          id: 'about-what-makes-us-different',
          title: 'What makes us different',
          answer:
            'We operate at the intersection of film, web, and AI—so strategy, production, and product come together as one seamless outcome.'
        }
      ]
    },
    {
      id: 'results-proof',
      title: 'Results & Proof',
      children: [
        {
          id: 'proof-metrics',
          title: 'Key metrics',
          answer:
            '2356+ videos delivered, 3+ years shipping, and 100M+ aggregate views. Project-specific goals (watch time, CVR, sign-ups) are set pre-production.'
        },
        {
          id: 'proof-case-types',
          title: 'Types of wins',
          answer:
            'Brand launches with standout films, consistent short-form engines for social growth, and high-performance landing pages that convert.'
        },
        {
          id: 'proof-how-we-measure',
          title: 'How we measure success',
          answer:
            'We define KPIs with you (views, retention, CTR, leads). We ship experiments, review analytics, and iterate to reach targets.'
        }
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing & Quotes',
      children: [
        {
          id: 'how-pricing-works',
          title: 'How pricing works',
          answer:
            'Pricing depends on scope, timeline, and deliverables. We provide custom quotes after a short discovery call to align on goals and constraints.'
        },
        {
          id: 'get-quote',
          title: 'Get a quote',
          answer:
            'Book a free 30-minute call via the Contact section to get a tailored estimate for your project.'
        }
      ]
    },
    {
      id: 'process',
      title: 'Process',
      children: [
        {
          id: 'our-process',
          title: 'Our 5-step process',
          answer:
            '1) Discovery, 2) Proposal & Planning, 3) Production/Build, 4) Review & Revisions, 5) Delivery & Handover.'
        }
      ]
    }
  ]
};
