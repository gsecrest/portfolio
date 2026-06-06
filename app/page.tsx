"use client";

const nav = ["About", "Experience", "Education", "Skills", "Projects", "Contact"];

const skills = [
  {
    category: "Enterprise Support & Operations",
    items: [
      "Enterprise Application Operations",
      "Production Support Engineering",
      "Incident Response & Root Cause Analysis",
      "Backend Diagnostics",
      "Operational Reliability",
      "Cross-Functional Collaboration",
      "Technical Mentoring",
    ],
  },
  {
    category: "Platforms & Tools",
    items: [
      "Ivanti ISM",
      "SQL Server 2014 / 2016 / 2019",
      "IIS / Apache",
      "Wireshark / Fiddler",
      "Chrome DevTools",
      "HAR & Log Analysis",
      "ODBC / Reporting",
      "Visio",
    ],
  },
  {
    category: "Programming & Scripting",
    items: [
      "SQL / PL/SQL / MS SQL",
      "JavaScript",
      "XML / XSLT / JSON",
      "Bash",
      "HTML",
      "Perl",
      "C# / C / C++",
      "Java",
    ],
  },
  {
    category: "Web & App Development",
    items: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "REST APIs",
      "Node.js",
    ],
  },
  {
    category: "Infrastructure & Systems",
    items: [
      "Linux (Ubuntu)",
      "Oracle Solaris / Unix",
      "Windows Server 2016 / 2019 / 2022",
      "Cloud & On-Prem Environments",
      "Workflow Automation",
    ],
  },
];

const experience = [
  {
    title: "Senior Enterprise Support Engineer",
    company: "Ivanti — South Jordan, UT",
    period: "11/2022 – Present",
    bullets: [
      "Lead technical investigations for high-impact enterprise incidents affecting production operations and customer business continuity.",
      "Perform deep root cause analysis across APIs, SQL Server databases, workflows, integrations, and enterprise applications.",
      "Troubleshoot REST API integrations by analyzing request/response behavior, authentication flows, payload validation, and backend responses.",
      "Analyze logs, HAR files, Chrome DevTools output, JavaScript errors, and backend telemetry to isolate performance bottlenecks and service failures.",
      "Collaborate with Engineering, SRE, Operations, and Product teams to identify permanent fixes and reduce repeat incidents.",
      "Mentor team members on troubleshooting methodology, escalation handling, and enterprise support best practices.",
    ],
  },
  {
    title: "Senior Technical Support Engineer",
    company: "Ivanti",
    period: "11/2007 – 11/2022",
    bullets: [
      "Delivered advanced troubleshooting and escalation support for enterprise application environments.",
      "Administered and supported SQL Server environments to identify and isolate customer-impacting issues.",
      "Investigated backend application failures, workflow processing issues, and integration-related defects.",
      "Conducted debugging and analysis of backend scripts, XML, XSLT, JavaScript, and API-related functionality.",
    ],
  },
  {
    title: "Programmer Analyst – IT Production Support",
    company: "Capital One Financial (GreenPoint Mortgage) — Novato, CA",
    period: "2005 – 2007",
    bullets: [
      "Served as Subject Matter Expert (SME) and escalation resource for Tier II and Tier III production support.",
      "Developed SQL queries, procedures, and scripts supporting operational and business requests.",
      "Conducted root cause analysis on production incidents to identify workarounds and long-term remediation paths.",
    ],
  },
];

const projects = [
  {
    name: "RO Workflow Query",
    description:
      "Quickly identify which team owns each request offering so you can manually correct team assignments without hunting through workflows.",
    tech: ["Next.js", "TypeScript", "SQL Server", "Tailwind CSS"],
    github: "https://github.com/gsecrest/workflow-query-app",
    diagram: "/er-diagram",
  },
  {
    name: "RO Attribute Query",
    description:
      "List form field attributes and workflow block assignments for Ivanti request offerings. Two-tab results show form fields and workflow blocks side by side.",
    tech: ["Next.js", "TypeScript", "SQL Server", "Tailwind CSS"],
    github: "https://github.com/gsecrest/ro-attribute-query",
    diagram: "/er-diagram",
  },
  {
    name: "BO Workflow Attributes",
    description:
      "Browse workflow block types and team assignments for all Ivanti business objects — Incident, Change, Problem, Knowledge, GRC, and more. Filters by object type, workflow name, block type, and team.",
    tech: ["Next.js", "TypeScript", "SQL Server", "Tailwind CSS"],
    github: "https://github.com/gsecrest/workflow-query-app",
    diagram: "/bo-er-diagram",
  },
  {
    name: "Personal Portfolio",
    description:
      "This site — a clean, minimal portfolio built with Next.js and Tailwind CSS, deployed on Vercel with a custom domain.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "https://github.com/gsecrest/portfolio",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-gray-900">Glenn Secrest</span>
          <nav className="flex gap-6">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">

        {/* Hero */}
        <section className="py-24 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Senior Enterprise Support Engineer
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Glenn Secrest
          </h1>
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
            Enterprise support and operations engineer with extensive experience supporting complex
            production environments, enterprise applications, APIs, and backend systems across cloud
            and on-prem environments.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#contact"
              className="inline-block bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="inline-block border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:border-gray-400 transition-colors"
            >
              View projects
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                I&apos;m a Senior Enterprise Support Engineer at Ivanti with 18+ years of experience
                supporting complex production environments, enterprise applications, REST APIs, SQL Server,
                and backend systems across cloud and on-prem infrastructure.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                I specialize in high-impact incident investigations, deep root cause analysis, and
                cross-functional collaboration with Engineering, SRE, and Product teams to deliver
                permanent resolutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I also build internal tools that eliminate manual work and help teams move faster —
                including the RO Workflow Query app for identifying team ownership of request offerings.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Ivanti", "REST APIs", "SQL Server", "Incident Response", "Root Cause Analysis", "JavaScript", "XML / XSLT", "Linux", "Windows Server", "Chrome DevTools", "HAR & Log Analysis", "Workflow Automation", "Next.js", "TypeScript"].map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Experience
          </h2>
          <div className="space-y-12">
            {experience.map((job, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <p className="text-sm text-gray-400">{job.period}</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">{job.company}</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">{job.title}</h3>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-300 mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <p className="text-sm text-gray-400">Sacramento, CA</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-base font-semibold text-gray-900">Bachelor of Science — Computer Science</h3>
              <p className="text-sm text-gray-500 mt-1">California State University, Sacramento</p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                  <div className="flex gap-3 shrink-0">
                    {project.diagram && (
                      <a
                        href={project.diagram}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        ER Diagram ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Contact
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Have a question or want to connect? Feel free to reach out by email or LinkedIn.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="mailto:secrestg@gmail.com"
              className="inline-block bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              secrestg@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/glennsecrest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:border-gray-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </section>

      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Glenn Secrest
        </div>
      </footer>

    </div>
  );
}
