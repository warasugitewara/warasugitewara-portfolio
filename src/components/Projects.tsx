import { useEffect, useState } from 'react';
import type { I18n, GitHubRepo } from '../types';

interface ProjectsProps {
  i18n: I18n | null;
}

export const Projects = ({ i18n }: ProjectsProps) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/warasugitewara/repos?sort=updated&per_page=12&type=owner'
        );
        const data = await response.json();

        const repos: GitHubRepo[] = data
          .filter((repo: any) => !repo.fork && repo.description)
          .slice(0, 10)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || '',
            url: repo.html_url,
            language: repo.language || '',
            stars: repo.stargazers_count,
            updated: new Date(repo.updated_at).toLocaleDateString('ja-JP'),
            pinned: false,
          }));

        setRepos(repos);
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  if (!i18n) return null;

  return (
    <section id="projects" className="section projects">
      <div className="section-container">
        <h2 className="section-title">{i18n.projects.title}</h2>
        {loading ? (
          <div className="projects-loading">Loading repositories...</div>
        ) : (
          <div className="projects-list">
            {repos.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-item"
              >
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                </div>
                <div className="project-meta">
                  {project.language && (
                    <span className="project-language">{project.language}</span>
                  )}
                  {project.stars > 0 && (
                    <span className="project-stars">⭐ {project.stars}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
