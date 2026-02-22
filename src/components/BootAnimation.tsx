import { useEffect, useState } from 'react';

interface BootAnimationProps {
  onComplete: () => void;
}

export const BootAnimation = ({ onComplete }: BootAnimationProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const bootLines = [
      '$ init warasugi-portfolio',
      '> Loading system configuration...',
      '> Initializing React components...',
      '> Fetching profile data...',
      '> Setting up i18n (ja, en)...',
      '> Rendering UI...',
      '✓ System ready',
      '',
    ];

    let currentLine = 0;
    const timer = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShow(false);
          onComplete();
        }, 500);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="boot-animation">
      <div className="boot-terminal">
        {lines.map((line, i) => (
          <div key={i} className="boot-line">
            <span className="boot-prompt">{'> '}</span>
            <span className="boot-text">{line}</span>
          </div>
        ))}
        <div className="boot-cursor">_</div>
      </div>
    </div>
  );
};
