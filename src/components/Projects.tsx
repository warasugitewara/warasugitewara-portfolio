import type { I18n } from '../types';

interface ProjectsProps {
  i18n: I18n | null;
}

export const Projects = ({ i18n }: ProjectsProps) => {
  if (!i18n) return null;

  // GitHub API からリポジトリを取得する機能は後で実装
  // 現在はプレースホルダー
  const projects = [
    {
      name: 'warasugi-portfolio',
      description: 'このポートフォリオサイト',
      url: 'https://github.com/warasugitewara/warasugi-portfolio',
      language: 'TypeScript',
      stars: 0,
    },
  ];

  return (
    <section id="projects" className="section projects">
      <div className="section-container">
        <h2 className="section-title">{i18n.projects.title}</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                {project.stars > 0 && (
                  <span className="project-stars">⭐ {project.stars}</span>
                )}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <span className="project-language">{project.language}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
