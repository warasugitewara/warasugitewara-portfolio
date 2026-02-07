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
        { name: 'Java', icon: '☕' },
        { name: 'Python', icon: '🐍' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'Lua', icon: '🌙' },
        { name: 'SQL', icon: '🗄️' },
        { name: 'C#', icon: '🟦' },
        { name: 'Bash/Shell', icon: '🐚' },
      ]
    },
    {
      category: t('skill_web'),
      icon: '🌐',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express', icon: '🚂' },
        { name: 'HTML/CSS', icon: '🎨' },
        { name: 'Vite', icon: '⚡' },
      ]
    },
    {
      category: t('skill_gamedev'),
      icon: '🎮',
      skills: [
        { name: 'Minecraft Plugins', icon: '⛏️' },
        { name: 'Quilt Mods', icon: '🧩' },
        { name: 'Paper Server', icon: '📜' },
        { name: 'Game Design', icon: '🎯' },
      ]
    },
    {
      category: t('skill_urban'),
      icon: '🏙️',
      skills: [
        { name: 'Minecraft Urban Planning', icon: '🏗️' },
        { name: '2D City Design', icon: '🗺️' },
        { name: 'Architecture', icon: '🏛️' },
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
                  <div className="skills-tags">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.span
                        key={skillIdx}
                        className="skill-tag"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="skill-tag-icon">{skill.icon}</span>
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
