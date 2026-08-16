"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";

const EMAIL = "asamofficial16@gmail.com";

/*
 * English-only project data used by this page.
 *
 * ProjectModal may still have its older Localised type internally.
 * The data here is intentionally kept as normal English strings because
 * the portfolio no longer supports multiple languages.
 */
type PortfolioProject = {
  num: string;
  name: string;
  stack: string[];
  desc: string;
  details: string;
  url: string;
  media: string[];
  badge?: string;
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
  highlights?: string[];
};

const projects: PortfolioProject[] = [
  {
    num: "01",

    name: "Employee Management System",

    stack: [
      "React.js",
      "Tailwind CSS",
      "Next.js",
      "MongoDB",
      "Inngest",
      "Node.js",
      "Express.js",
      "GitHub",
    ],

    desc:
      "An HR management SaaS designed for modern teams. It provides an intuitive admin dashboard for overseeing staff, tracking attendance, managing leave requests, and handling documentation from a single centralized hub.",

    details:
      "An internal employee administration platform offering a snapshot of company status. It includes modules for monitoring key metrics such as total employees, departments, attendance, and pending leave requests. The sidebar navigation provides quick access to employee lists, payroll management, payslips, ID card generation, audit trail logs, meeting scheduling, and system settings. Designed with clarity and efficiency in mind for mid-sized teams.",

    url: "https://techtitans-ems.vercel.app/",

    media: [
      "/projects/ems/login.png",
      "/projects/ems/admin_dashboard.png",
      "/projects/ems/admin_employees.png",
      "/projects/ems/admin_auditlog.png",
      "/projects/ems/admin_leave.png",
      "/projects/ems/admin_payslip.png",
      "/projects/ems/admin_setting.png",
      "/projects/ems/employee_attendance.png",
    ],

    badge: "Complete",

    align: "left",
    section: "project1",
  },

  {
    num: "02",

    name: "Portfolio Website",

    stack: [
      "HTML",
      "Tailwind CSS",
      "JavaScript",
      "React.js",
    ],

    desc:
      "Modern portfolio website built with React and Tailwind CSS, featuring a glassmorphic design and dark mode support.",

    details:
      "Modern portfolio website built with React and Tailwind CSS, featuring a glassmorphic design and dark mode support.",

    url: "https://asamofficial.netlify.app/",

    media: [
      "/projects/portfolio/landing.png",
      "/projects/portfolio/about.png",
      "/projects/portfolio/education.png",
      "/projects/portfolio/experience.png",
      "/projects/portfolio/project.png",
      "/projects/portfolio/skill.png",
      "/projects/portfolio/quotes.png",
      "/projects/portfolio/contact.png",
    ],

    badge: "Complete",

    align: "right",
    section: "project2",
  },

  {
    num: "03",

    name: "Secure & Transparent VoteSystem",

    stack: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript",
      "React.js",
      "TypeScript",
      "GitHub",
    ],

    desc:
      "An online voting SaaS that provides a secure and transparent platform for organizations of all sizes. It enables creating election events, managing contestants, and viewing real-time results through a simple and intuitive interface.",

    details:
      "A digital voting platform designed for internal elections, associations, and community events. The system features user authentication with differentiated roles such as Regular User and Admin, an admin dashboard for managing events and candidates, and real-time results visualization. The interface includes navigation to main sections such as Home, Features, Events, and How It Works, with clear calls to action to get started or access the administrative panel. Focused on ensuring transparency and ease of use at every stage of the election process.",

    url: "https://eventvotingsystem.vercel.app/",

    media: [
      "/projects/vote/login.png",
      "/projects/vote/landing.png",
      "/projects/vote/adminpage.png",
      "/projects/vote/admin_dashboard.png",
      "/projects/vote/admin_feedback.png",
      "/projects/vote/admin_setting.png",
      "/projects/vote/admin_stats.png",
      "/projects/vote/admin_user.png",
      "/projects/vote/user_event.png",
      "/projects/vote/user_vote.png",
    ],

    badge: "Ongoing",

    align: "left",
    section: "project3",
  },
];

const experiences = [
  {
    role: "Web Developer Intern",

    company: "Tech Bytz",

    period: "June 2025 — December 2025",

    location: "Colombo, Sri Lanka",

    summary:
      "Developed a comprehensive Digital Author Portfolio and Book Marketing Management System for Neermai.com, providing authors with a professional platform to showcase profiles, manage books, and promote publications through digital marketing tools.",

    bullets: [
      "Author Profile Management — Implemented complete CRUD operations with profile images, biography sections, and achievement showcases.",

      "Book Management System — Developed book upload modules with information forms, gallery pages with category filtering, and advanced search functionality.",

      "Analytics Dashboard — Built tracking systems for book views and engagement metrics with graphical reporting.",

      "Admin Panel — Developed a comprehensive administrative interface for author and book management with secure authentication.",

      "SEO Optimization — Implemented metadata management and search optimization features.",
    ],

    stack: [
      "HTML5",
      "Tailwind CSS",
      "React.js",
      "Next.js",
      "MongoDB",
      "Express.js",
    ],
  },
];

function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>
        {text}
      </span>
    </span>
  );
}

export default function Home() {
  const isMobile = useIsMobile();

  const [activeProject, setActiveProject] =
    useState<PortfolioProject | null>(null);

  const handleCvDownload = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const cvPath = "/cv_en.pdf";

    const link = document.createElement("a");

    link.href = cvPath;
    link.download = "Mohamed_Asam_Resume.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /*
   * ProjectModal was originally designed around ProjectDetail.
   *
   * The portfolio is now English-only, so the page stores normal strings.
   * This helper bridges the old modal type without changing the actual
   * English content or requiring Spanish translations.
   */
  const getModalProject = (
    project: PortfolioProject
  ): ProjectDetail => {
    return project as unknown as ProjectDetail;
  };

  return (
    <SmoothScroll>
      <div className="relative">

        {/* Desktop 3D background */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">

          <div className="flex items-center gap-3 pointer-events-auto">

            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              Mohamed Asam
            </span>

            <span className="hidden md:inline-flex">
              <span className="status-pill">
                Open to Opportunities
              </span>
            </span>

          </div>

          <div className="flex items-center gap-2 pointer-events-auto">

            <SeasonPicker />

            <span className="hidden md:inline-flex">
              <a
                href="https://github.com/asam0816"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="frost-btn !py-1.5 !px-3 !text-xs"
              >
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>

                <span>GitHub</span>
              </a>
            </span>

          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">

          {/* HERO */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >

            {/* Mobile 3D keyboard */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}

            <div className="mt-2 md:mt-20">

              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                Hi, I am
              </p>

              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">

                <HeroWord
                  text="Asam"
                  delay={120}
                />

                <br />

                <HeroWord
                  text="Mohamed"
                  delay={260}
                  className="text-ice-400"
                />

              </h1>

              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                Software Engineer & Tech Lead.
                <br />
                Specialised in ERPs and full-stack apps for businesses.
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >

                {/* CV */}
                <a
                  href="/cv_en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                  onClick={handleCvDownload}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>

                  Download CV
                </a>

                {/* Hire me */}
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }
                >
                  Hire Me
                </button>

                <div
                  className="basis-full h-0 md:hidden"
                  aria-hidden
                />

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/asamofficial16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/asam0816"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>

              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>Scroll to explore</span>
                <span className="scroll-indicator__rail" />
              </span>

              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                Hover the keys
              </span>
            </div>

          </section>

          {/* TECH STACK */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >

            <div className="relative md:h-[150vh]">

              <div className="md:sticky md:top-28 text-center">

                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    Tech Stack
                  </h2>
                </Reveal>

                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">
                      Hover over the keyboard to explore
                    </span>

                    <span className="md:hidden">
                      Explore my technologies
                    </span>
                  </p>
                </Reveal>

              </div>

              {/* Mobile skills */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">

                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >

                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>

                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>

                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {s.slug}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </section>

          {/* EXPERIENCE */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >

            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">

              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  Experience
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  Professional experience and contributions
                </p>
              </Reveal>

            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">

              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >

                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {exp.role}
                      </h3>

                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}

                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {exp.location}
                        </span>
                      </p>
                    </div>

                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {exp.period}
                    </span>

                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2.5 mb-6">

                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >

                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />

                        <span>{bullet}</span>

                      </li>
                    ))}

                  </ul>

                  <div className="flex flex-wrap gap-1.5">

                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}

                  </div>

                </Reveal>
              ))}

            </div>

          </section>

          {/* PROJECTS */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >

              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left"
                    ? "right-[-2vw]"
                    : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >

                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · Featured Project
                  </p>
                </Reveal>

                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {p.name}
                  </h2>
                </Reveal>

                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {p.badge}
                    </span>
                  </Reveal>
                ) : null}

                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </Reveal>

                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >

                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}

                  </div>
                </Reveal>

                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >

                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >

                      View Project

                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>

                    </button>

                  </div>
                </Reveal>

              </div>

            </section>
          ))}

          {/* CONTACT */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >

            <div className="max-w-xl relative">

              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  Get in touch
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  Let's Work Together
                </h2>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">
                  Have a project, opportunity, or idea you'd like to
                  discuss? Feel free to get in touch.
                </p>
              </Reveal>

              <Reveal delay={240}>

                <div className="flex flex-wrap gap-3 pointer-events-auto">

                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >

                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="M3 7l9 6 9-6" />
                    </svg>

                    Copy Email

                  </CopyEmail>

                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    Open Mail
                  </a>

                  <a
                    href="https://github.com/asam0816"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/asamofficial16/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    LinkedIn
                  </a>

                </div>

              </Reveal>

            </div>

            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                © {new Date().getFullYear()} Mohamed Asam
              </p>
            </Reveal>

          </section>

        </main>

        <ProjectModal
          project={
            activeProject
              ? getModalProject(activeProject)
              : null
          }
          onClose={() => setActiveProject(null)}
        />

      </div>
    </SmoothScroll>
  );
}