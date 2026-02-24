import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#1a1f3a',
        primaryTextColor: '#e5e7eb',
        primaryBorderColor: '#00ff88',
        lineColor: '#00ff88',
        secondaryColor: '#2a3050',
        tertiaryColor: '#0a0e27',
        fontFamily: "'JetBrains Mono', 'SF Mono', 'Courier New', monospace",
        fontSize: '14px',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
      },
      securityLevel: 'strict',
    });

    const renderDiagram = async () => {
      if (!containerRef.current) return;
      try {
        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, chart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        setError('Failed to render diagram');
        console.error('Mermaid render error:', err);
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return <div className="infra-diagram-error">{error}</div>;
  }

  return <div ref={containerRef} className="infra-diagram-svg" />;
};
