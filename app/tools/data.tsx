import { ReactNode } from "react";

export interface Tool {
  name: string;
  description: string;
  link: string;
  icon: ReactNode;
}

export interface ToolCategory {
  name: string;
  description: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    name: "Passive Pipelines",
    description: "Platforms where opportunities come to you",
    tools: [
      {
        name: "LinkedIn Jobs",
        description: "Professional network with extensive job listings",
        link: "https://www.linkedin.com/jobs/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      },
      {
        name: "Work at a Startup",
        description: "YC startup job board",
        link: "https://www.workatastartup.com/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        )
      },
      {
        name: "Wellfound",
        description: "Startup and tech company job listings",
        link: "https://wellfound.com/jobs",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm3.6-9.6c0 1.988-1.612 3.6-3.6 3.6s-3.6-1.612-3.6-3.6 1.612-3.6 3.6-3.6 3.6 1.612 3.6 3.6z" />
          </svg>
        )
      },
      {
        name: "HN Who Wants to be Hired",
        description: "Monthly Hacker News hiring thread",
        link: "https://news.ycombinator.com/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M0 0v24h24V0H0zm12.3 13.54v5.59h-1.62v-5.59l-4.5-7.87h1.8l3.6 6.3 3.6-6.3h1.8l-4.68 7.87z" />
          </svg>
        )
      }
    ]
  },
  {
    name: "Directories",
    description: "VC portfolio company directories",
    tools: [
      {
        name: "Sequoia",
        description: "Sequoia Capital portfolio companies",
        link: "https://www.sequoiacap.com/companies/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
          </svg>
        )
      },
      {
        name: "Y Combinator",
        description: "YC company directory",
        link: "https://www.ycombinator.com/companies",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M0 0h24v24H0V0zm12.3 13.54v5.59h-1.62v-5.59l-4.5-7.87h1.8l3.6 6.3 3.6-6.3h1.8l-4.68 7.87z" />
          </svg>
        )
      },
      {
        name: "a16z",
        description: "Andreessen Horowitz portfolio",
        link: "https://a16z.com/portfolio/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        )
      },
      {
        name: "Rabbit",
        description: "Rabbit portfolio companies",
        link: "https://rabbit.tech/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        )
      }
    ]
  },
  {
    name: "ATS Positions",
    description: "Find open positions on popular ATS platforms",
    tools: [
      {
        name: "Greenhouse",
        description: "Jobs hosted on Greenhouse ATS",
        link: "https://www.greenhouse.io/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        )
      },
      {
        name: "Ashby",
        description: "Jobs hosted on Ashby ATS",
        link: "https://www.ashbyhq.com/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        )
      },
      {
        name: "Lever",
        description: "Jobs hosted on Lever ATS",
        link: "https://www.lever.co/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
          </svg>
        )
      }
    ]
  },
  {
    name: "Interview Preparation",
    description: "Resources to ace your interviews",
    tools: [
      {
        name: "LeetCode",
        description: "Practice coding problems for technical interviews",
        link: "https://leetcode.com/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
        )
      },
      {
        name: "Interview Ready Pro",
        description: "Comprehensive interview preparation course",
        link: "https://ready.silver.dev/products/interview-ready-pro/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        )
      }
    ]
  },
  {
    name: "Resume",
    description: "Tools to build and optimize your resume",
    tools: [
      {
        name: "Typst",
        description: "Modern typesetting system for documents",
        link: "https://typst.app/",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8V8z" />
          </svg>
        )
      }
    ]
  }
];
