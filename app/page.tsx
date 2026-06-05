"use client";

const nav = ["About", "Experience", "Projects", "Contact"];

const experience = [
  {
    title: "Senior Enterprise Support Engineer",
    company: "Current Company",
    period: "Present",
    bullets: [
      "Provide enterprise-level technical support for complex environments",
      "Collaborate with cross-functional teams to resolve escalated issues",
      "Build internal tooling to improve team efficiency and visibility",
    ],
  },
  {
    title: "Enterprise Support Engineer",
    company: "Previous Company",
    period: "Previous Role",
    bullets: [
      "Supported enterprise customers across ITSM platform deployments",
      "Diagnosed and resolved workflow and integration issues",
      "Documented resolutions and contributed to knowledge base",
    ],
  },
];

const projects = [
  {
    name: "RO Workflow Query",
    description:
      "Quickly identify which team owns each request offering so you can manually correct team assignments without hunting through workflows.",
    tech: ["Next.js", "TypeScript", "SQL Server", "Tailwind CSS"],
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
            Enterprise support professional focused on ITSM platforms, workflow automation,
            and building internal tools that help teams work faster and smarter.
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
                I&apos;m a Senior Enterprise Support Engineer with deep experience in ITSM platforms,
                workflow configuration, and enterprise integrations. I specialize in diagnosing
                complex technical issues and turning them into lasting solutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beyond support, I build internal tools that eliminate manual work — from query
                apps that surface workflow ownership to dashboards that help teams act faster.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {["ITSM", "Ivanti", "SQL", "Workflow Automation", "Next.js", "TypeScript", "Enterprise Support"].map((skill) => (
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

        {/* Projects */}
        <section id="projects" className="py-20 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{project.description}</p>
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
            Have a question or want to connect? Feel free to reach out.
          </p>
          <a
            href="mailto:glenn707@gmail.com"
            className="inline-block bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            glenn707@gmail.com
          </a>
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
