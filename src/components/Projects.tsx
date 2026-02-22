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
        // Fetch user repositories from GitHub API
        const response = await fetch(
          'https://api.github.com/users/warasugitewara/repos?sort=updated&per_page=6'
        );
        const data = await response.json();

        const repos: GitHubRepo[] = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'No description',
            url: repo.html_url,
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            updated: new Date(repo.updated_at).toLocaleDateString('ja-JP'),
            pinned: false,
          }));

        setRepos(repos);
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        // Fallback to static data
        setRepos([
          {
            name: 'warasugi-portfolio',
            description: 'Personal portfolio website built with React + TypeScript',
            url: 'https://github.com/warasugitewara/warasugi-portfolio',
            language: 'TypeScript',
            stars: 0,
            updated: new Date().toLocaleDateString('ja-JP'),
            pinned: true,
          },
        ]);
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
          <div className="projects-grid">
            {repos.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                title={project.description}
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
                  <span className="project-updated">{project.updated}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
