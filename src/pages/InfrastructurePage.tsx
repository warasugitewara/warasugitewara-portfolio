import { useEffect, useState } from 'react';
import { getDataUrl } from '../utils/path';
import { MermaidDiagram } from '../components/MermaidDiagram';

interface InfrastructurePageProps {
  i18n: any;
}

interface InfrastructureData {
  infrastructure: {
    title: string;
    subtitle: string;
    overview: string;
    design_philosophy: string[];
    hypervisor: {
      platform: string;
      purpose: string;
      key_features: string[];
    };
    nodes: Array<{
      id: string;
      name: string;
      hardware: string;
      role: string;
      purpose: string;
      workloads: Array<{
        type: string;
        name: string;
        description?: string;
        os?: string;
        purpose?: string;
        planned_services?: string[];
        details?: string;
      }>;
      rationale?: string;
    }>;
    network_design: {
      topology: string;
      gateway: string;
      security: string[];
      dns: string;
    };
    security_model: {
      ssh: {
        root_login: string;
        password_auth: string;
        key_type: string;
        access_method: string;
      };
      backup_strategy: string[];
      authentication: {
        proxmox: string;
        linux_vms: string;
      };
    };
    future_roadmap: Record<string, {
      status: string;
      components: string[];
    }>;
    technology_stack: {
      virtualization: string[];
      networking: string[];
      storage: string[];
      security: string[];
      planned_apps: string[];
    };
    learning_outcomes: string[];
    operational_practices: {
      monitoring: string;
      backups: string;
      updates: string;
      documentation: string;
    };
    why_proxmox: string[];
  };
}

const techStackLabels: Record<string, Record<string, string>> = {
  ja: {
    virtualization: '仮想化',
    networking: 'ネットワーク',
    storage: 'ストレージ',
    security: 'セキュリティ',
    planned_apps: '計画中アプリ',
  },
  en: {
    virtualization: 'Virtualization',
    networking: 'Networking',
    storage: 'Storage',
    security: 'Security',
    planned_apps: 'Planned Apps',
  },
};

const roadmapLabels: Record<string, Record<string, string>> = {
  ja: {
    phase_1_current: 'Phase 1',
    phase_2_planned: 'Phase 2',
    phase_3_future: 'Phase 3',
  },
  en: {
    phase_1_current: 'Phase 1',
    phase_2_planned: 'Phase 2',
    phase_3_future: 'Phase 3',
  },
};

const opsLabels: Record<string, Record<string, string>> = {
  ja: {
    monitoring: '監視',
    backups: 'バックアップ',
    updates: 'アップデート',
    documentation: 'ドキュメント',
  },
  en: {
    monitoring: 'Monitoring',
    backups: 'Backups',
    updates: 'Updates',
    documentation: 'Documentation',
  },
};

export const InfrastructurePage = ({ i18n }: InfrastructurePageProps) => {
  const [infra, setInfra] = useState<InfrastructureData | null>(null);
  const [mermaidChart, setMermaidChart] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    architecture: true,
    philosophy: true,
    hypervisor: false,
    nodes: true,
    network: false,
    security: false,
    roadmap: true,
    techStack: false,
    operations: false,
    whyProxmox: false,
    learning: false,
  });
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const lang = document.documentElement.lang || 'ja';

  useEffect(() => {
    const loadInfrastructure = async () => {
      try {
        const response = await fetch(getDataUrl('infrastructure.json'));
        if (!response.ok) throw new Error(`Failed to load infrastructure: ${response.status}`);
        const data = await response.json();
        setInfra(data);
      } catch (error) {
        console.error('Failed to load infrastructure:', error);
      }
    };

    const loadMermaidChart = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${basePath}diagrams/infra-architecture.mmd`);
        if (!response.ok) throw new Error(`Failed to load diagram: ${response.status}`);
        const text = await response.text();
        setMermaidChart(text);
      } catch (error) {
        console.error('Failed to load mermaid chart:', error);
      }
    };

    loadInfrastructure();
    loadMermaidChart();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!i18n || !infra) return null;

  return (
    <div className="infra-page">
      <div className="section-container">
        {/* Hero Header */}
        <div className="infra-hero">
          <h1 className="infra-title">
            <span className="infra-title-icon">🖧</span> {infra.infrastructure.title}
          </h1>
          <p className="infra-subtitle">{infra.infrastructure.subtitle}</p>
        </div>

        {/* Overview Banner */}
        <div className="infra-overview">
          <p>{infra.infrastructure.overview}</p>
        </div>

        {/* Architecture Diagram - Prominently at Top */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.architecture ? 'expanded' : ''}`}
            onClick={() => toggleSection('architecture')}
          >
            <span>🗺️ {i18n.infrastructure.architectureDiagram}</span>
            <span className="infra-toggle-icon">{expandedSections.architecture ? '▼' : '▶'}</span>
          </button>
          {expandedSections.architecture && (
            <div className="infra-section-content">
              <div className="infra-diagram">
                {mermaidChart ? (
                  <MermaidDiagram chart={mermaidChart} />
                ) : (
                  <div className="infra-diagram-loading">Loading diagram...</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Design Philosophy */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.philosophy ? 'expanded' : ''}`}
            onClick={() => toggleSection('philosophy')}
          >
            <span>💡 {i18n.infrastructure.designPhilosophy}</span>
            <span className="infra-toggle-icon">{expandedSections.philosophy ? '▼' : '▶'}</span>
          </button>
          {expandedSections.philosophy && (
            <div className="infra-section-content">
              <ul className="infra-checklist">
                {infra.infrastructure.design_philosophy.map((item, idx) => (
                  <li key={idx} className="infra-checklist-item">
                    <span className="infra-check-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Hypervisor */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.hypervisor ? 'expanded' : ''}`}
            onClick={() => toggleSection('hypervisor')}
          >
            <span>🖥️ {i18n.infrastructure.hypervisor}</span>
            <span className="infra-toggle-icon">{expandedSections.hypervisor ? '▼' : '▶'}</span>
          </button>
          {expandedSections.hypervisor && (
            <div className="infra-section-content">
              <div className="infra-card">
                <h3 className="infra-card-title">{infra.infrastructure.hypervisor.platform}</h3>
                <p className="infra-card-desc">{infra.infrastructure.hypervisor.purpose}</p>
                <ul className="infra-bullet-list">
                  {infra.infrastructure.hypervisor.key_features.map((feature, idx) => (
                    <li key={idx}><span className="infra-bullet">•</span>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Nodes */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.nodes ? 'expanded' : ''}`}
            onClick={() => toggleSection('nodes')}
          >
            <span>⚙️ {i18n.infrastructure.nodes}</span>
            <span className="infra-toggle-icon">{expandedSections.nodes ? '▼' : '▶'}</span>
          </button>
          {expandedSections.nodes && (
            <div className="infra-section-content">
              <div className="infra-nodes-grid">
                {infra.infrastructure.nodes.map(node => (
                  <div key={node.id} className={`infra-node-card ${expandedNode === node.id ? 'expanded' : ''}`}>
                    <div
                      className="infra-node-header"
                      onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
                    >
                      <div>
                        <h4 className="infra-node-name">{node.name}</h4>
                        <span className="infra-node-role">{node.role}</span>
                        <p className="infra-node-hw">{node.hardware}</p>
                      </div>
                      <span className="infra-toggle-icon">
                        {expandedNode === node.id ? '▼' : '▶'}
                      </span>
                    </div>

                    {expandedNode === node.id && (
                      <div className="infra-node-detail">
                        <p className="infra-node-purpose">{node.purpose}</p>

                        {node.rationale && (
                          <div className="infra-node-rationale">
                            <span className="infra-label">{lang === 'ja' ? '設計理由' : 'Rationale'}:</span>
                            <p>{node.rationale}</p>
                          </div>
                        )}

                        <div className="infra-workloads">
                          <span className="infra-label">{lang === 'ja' ? 'ワークロード' : 'Workloads'}:</span>
                          {node.workloads.map((wl, idx) => (
                            <div key={idx} className="infra-workload-item">
                              <span className="infra-workload-arrow">→</span>
                              <div>
                                <strong>{wl.name}</strong>
                                <span className="infra-workload-type">{wl.type}</span>
                                {wl.os && <span className="infra-workload-os">{wl.os}</span>}
                                {wl.purpose && <p className="infra-workload-desc">{wl.purpose}</p>}
                                {wl.description && <p className="infra-workload-desc">{wl.description}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Network Design */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.network ? 'expanded' : ''}`}
            onClick={() => toggleSection('network')}
          >
            <span>🌐 {i18n.infrastructure.networkDesign}</span>
            <span className="infra-toggle-icon">{expandedSections.network ? '▼' : '▶'}</span>
          </button>
          {expandedSections.network && (
            <div className="infra-section-content">
              <div className="infra-network-grid">
                <div className="infra-network-item">
                  <span className="infra-label">{lang === 'ja' ? 'トポロジー' : 'Topology'}</span>
                  <p>{infra.infrastructure.network_design.topology}</p>
                </div>
                <div className="infra-network-item">
                  <span className="infra-label">{lang === 'ja' ? 'ゲートウェイ' : 'Gateway'}</span>
                  <p>{infra.infrastructure.network_design.gateway}</p>
                </div>
                <div className="infra-network-item">
                  <span className="infra-label">DNS</span>
                  <p>{infra.infrastructure.network_design.dns}</p>
                </div>
              </div>
              <div className="infra-card">
                <span className="infra-label">{lang === 'ja' ? 'セキュリティ対策' : 'Security'}</span>
                <ul className="infra-bullet-list">
                  {infra.infrastructure.network_design.security.map((sec, idx) => (
                    <li key={idx}><span className="infra-bullet">•</span>{sec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Security Model */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.security ? 'expanded' : ''}`}
            onClick={() => toggleSection('security')}
          >
            <span>🔐 {i18n.infrastructure.securityModel}</span>
            <span className="infra-toggle-icon">{expandedSections.security ? '▼' : '▶'}</span>
          </button>
          {expandedSections.security && (
            <div className="infra-section-content">
              <div className="infra-security-grid">
                <div className="infra-security-card">
                  <h4 className="infra-security-title">SSH</h4>
                  <ul className="infra-kv-list">
                    <li><span>Root {lang === 'ja' ? 'ログイン' : 'Login'}</span><strong>{infra.infrastructure.security_model.ssh.root_login}</strong></li>
                    <li><span>{lang === 'ja' ? 'パスワード認証' : 'Password Auth'}</span><strong>{infra.infrastructure.security_model.ssh.password_auth}</strong></li>
                    <li><span>{lang === 'ja' ? '鍵タイプ' : 'Key Type'}</span><strong>{infra.infrastructure.security_model.ssh.key_type}</strong></li>
                    <li><span>{lang === 'ja' ? 'アクセス方法' : 'Access Method'}</span><strong>{infra.infrastructure.security_model.ssh.access_method}</strong></li>
                  </ul>
                </div>
                <div className="infra-security-card">
                  <h4 className="infra-security-title">{lang === 'ja' ? '認証' : 'Authentication'}</h4>
                  <ul className="infra-kv-list">
                    <li><span>Proxmox</span><strong>{infra.infrastructure.security_model.authentication.proxmox}</strong></li>
                    <li><span>Linux VM</span><strong>{infra.infrastructure.security_model.authentication.linux_vms}</strong></li>
                  </ul>
                </div>
                <div className="infra-security-card">
                  <h4 className="infra-security-title">{lang === 'ja' ? 'バックアップ戦略' : 'Backup Strategy'}</h4>
                  <ul className="infra-bullet-list">
                    {infra.infrastructure.security_model.backup_strategy.map((strategy, idx) => (
                      <li key={idx}><span className="infra-bullet">•</span>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Roadmap */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.roadmap ? 'expanded' : ''}`}
            onClick={() => toggleSection('roadmap')}
          >
            <span>🚀 {i18n.infrastructure.roadmap}</span>
            <span className="infra-toggle-icon">{expandedSections.roadmap ? '▼' : '▶'}</span>
          </button>
          {expandedSections.roadmap && (
            <div className="infra-section-content">
              <div className="infra-roadmap">
                {Object.entries(infra.infrastructure.future_roadmap).map(([phase, data]) => (
                  <div key={phase} className="infra-roadmap-phase">
                    <div className="infra-roadmap-header">
                      <span className="infra-roadmap-label">{roadmapLabels[lang]?.[phase] ?? phase}</span>
                      <span className="infra-roadmap-status">{data.status}</span>
                    </div>
                    <ul className="infra-bullet-list">
                      {data.components.map((comp, idx) => (
                        <li key={idx}><span className="infra-bullet">•</span>{comp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technology Stack */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.techStack ? 'expanded' : ''}`}
            onClick={() => toggleSection('techStack')}
          >
            <span>🛠️ {i18n.infrastructure.technologyStack}</span>
            <span className="infra-toggle-icon">{expandedSections.techStack ? '▼' : '▶'}</span>
          </button>
          {expandedSections.techStack && (
            <div className="infra-section-content">
              <div className="infra-tech-grid">
                {Object.entries(infra.infrastructure.technology_stack).map(([category, items]) => (
                  <div key={category} className="infra-tech-card">
                    <h4 className="infra-tech-title">{techStackLabels[lang]?.[category] ?? category}</h4>
                    <div className="infra-tech-tags">
                      {(Array.isArray(items) ? items : [items]).map((item, idx) => (
                        <span key={idx} className="infra-tech-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Operational Practices */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.operations ? 'expanded' : ''}`}
            onClick={() => toggleSection('operations')}
          >
            <span>📋 {i18n.infrastructure.operationalPractices}</span>
            <span className="infra-toggle-icon">{expandedSections.operations ? '▼' : '▶'}</span>
          </button>
          {expandedSections.operations && (
            <div className="infra-section-content">
              <div className="infra-ops-grid">
                {Object.entries(infra.infrastructure.operational_practices).map(([key, value]) => (
                  <div key={key} className="infra-ops-item">
                    <span className="infra-label">{opsLabels[lang]?.[key] ?? key}</span>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Why Proxmox */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.whyProxmox ? 'expanded' : ''}`}
            onClick={() => toggleSection('whyProxmox')}
          >
            <span>❓ {i18n.infrastructure.whyProxmox}</span>
            <span className="infra-toggle-icon">{expandedSections.whyProxmox ? '▼' : '▶'}</span>
          </button>
          {expandedSections.whyProxmox && (
            <div className="infra-section-content">
              <ul className="infra-checklist">
                {infra.infrastructure.why_proxmox.map((reason, idx) => (
                  <li key={idx} className="infra-checklist-item">
                    <span className="infra-check-icon">✓</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Learning Outcomes */}
        <div className="infra-section">
          <button
            className={`infra-section-toggle ${expandedSections.learning ? 'expanded' : ''}`}
            onClick={() => toggleSection('learning')}
          >
            <span>📚 {i18n.infrastructure.learningOutcomes}</span>
            <span className="infra-toggle-icon">{expandedSections.learning ? '▼' : '▶'}</span>
          </button>
          {expandedSections.learning && (
            <div className="infra-section-content">
              <ul className="infra-checklist">
                {infra.infrastructure.learning_outcomes.map((outcome, idx) => (
                  <li key={idx} className="infra-checklist-item">
                    <span className="infra-check-icon">→</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
