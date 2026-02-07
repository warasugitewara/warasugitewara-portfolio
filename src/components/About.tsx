import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const skillsData = [
    {
      category: t('skill_languages'),
      icon: '💻',
      skills: [
        { name: 'Java', proficiency: 85, icon: '☕' },
        { name: 'Python', proficiency: 80, icon: '🐍' },
        { name: 'TypeScript', proficiency: 85, icon: '📘' },
        { name: 'JavaScript', proficiency: 80, icon: '⚡' },
        { name: 'Lua', proficiency: 75, icon: '🌙' },
        { name: 'SQL', proficiency: 75, icon: '🗄️' },
        { name: 'C#', proficiency: 70, icon: '🟦' },
        { name: 'Bash/Shell', proficiency: 70, icon: '🐚' },
      ]
    },
    {
      category: t('skill_web'),
      icon: '🌐',
      skills: [
        { name: 'React', proficiency: 85, icon: '⚛️' },
        { name: 'Node.js', proficiency: 80, icon: '🟢' },
        { name: 'Express', proficiency: 75, icon: '🚂' },
        { name: 'HTML/CSS', proficiency: 90, icon: '🎨' },
        { name: 'Vite', proficiency: 80, icon: '⚡' },
      ]
    },
    {
      category: t('skill_gamedev'),
      icon: '🎮',
      skills: [
        { name: 'Minecraft Plugins', proficiency: 90, icon: '⛏️' },
        { name: 'Quilt Mods', proficiency: 85, icon: '🧩' },
        { name: 'Paper Server', proficiency: 80, icon: '📜' },
        { name: 'Game Design', proficiency: 75, icon: '🎯' },
      ]
    },
    {
      category: t('skill_urban'),
      icon: '🏙️',
      skills: [
        { name: 'Minecraft Urban Planning', proficiency: 90, icon: '🏗️' },
        { name: '2D City Design', proficiency: 85, icon: '🗺️' },
        { name: 'Architecture', proficiency: 80, icon: '🏛️' },
      ]
    },
  ];

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2 variants={itemVariants}>{t('section_about')}</motion.h2>
        
        <div className="about-grid">
          <motion.div className="about-text" variants={itemVariants}>
            <h3>{t('about_title')}</h3>
            <p>{t('about_desc1')}</p>
            <p>{t('about_desc2')}</p>
          </motion.div>

          <motion.div className="skills-section" variants={itemVariants}>
            <h3>{t('skills_title')}</h3>
            <div className="skills-categories">
              {skillsData.map((category, idx) => (
                <motion.div
                  key={idx}
                  className="skill-category"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="category-title">
                    <span className="category-icon">{category.icon}</span>
                    {category.category}
                  </h4>
                  <div className="skills-list">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        className="skill-bar-wrapper"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="skill-header">
                          <span className="skill-name">
                            <span className="skill-icon">{skill.icon}</span>
                            {skill.name}
                          </span>
                          <span className="skill-level">{skill.proficiency}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <motion.div
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 0.8, delay: skillIdx * 0.05 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="status-section" variants={itemVariants}>
            <h3>Status & Visitors</h3>
            <div className="status-container">
              <img 
                src="https://lanyard.cnrad.dev/api/811515262238064640?idleMessage=Coding%20or%20Building" 
                alt="Discord Status"
                loading="lazy"
              />
              <img 
                src="https://count.getloli.com/@warasite?name=warasite&theme=rule34&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" 
                alt="Visitor Counter"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
