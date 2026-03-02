import { siteContent } from '../../content/site-content';

interface CharacterPageProps {
  onOpenMessenger: () => void;
}

const characterInfo = [
  { label: 'True Name', value: siteContent.config.name },
  {
    label: 'Class / Role',
    value: siteContent.config.role,
    valueClassName: 'stat-value-accent',
  },
  {
    label: 'Alignment',
    value: 'Proactive Team Player',
    valueClassName: 'stat-value-success',
  },
  { label: 'Homeland', value: "Fiesso d'Artico, VE, Italy" },
  { label: 'Experience', value: '10+ Years' },
  { label: 'Current Guild', value: 'Docebo Spa (Full Remote)' },
  { label: 'Core Stack', value: 'TypeScript, Angular, A11y' },
  { label: 'Tooling', value: 'Nx, GitLab CI, pnpm, Playwright' },
  { label: 'Cloud', value: 'AWS, Docker, Kubernetes' },
  { label: 'Languages', value: 'Italian, English' },
];

export function CharacterPage({ onOpenMessenger }: CharacterPageProps) {
  return (
    <section id="character" className="character-sheet">
      <div className="character-grid">
        <div className="character-top-row">
          <article className="panel character-portrait-card">
            <div className="character-portrait-frame">
              <img
                src="/full-figure.png"
                alt="Character portrait placeholder"
                className="character-portrait"
              />
            </div>
            <p className="character-portrait-caption">The Interface Alchemist</p>
          </article>

          <article className="panel character-equipment">
            <h3 className="ui-subtitle">Equipment</h3>
            <div className="equipment-grid">
              <span className="equipment-slot">
                <span className="material-symbols-outlined equipment-icon">keyboard</span>
              </span>
              <span className="equipment-slot">
                <span className="material-symbols-outlined equipment-icon">mouse</span>
              </span>
              <span className="equipment-slot">
                <span className="material-symbols-outlined equipment-icon">terminal</span>
              </span>
            </div>
          </article>

          <article className="panel character-stats">
            <div className="stats-grid">
              {characterInfo.map((entry, index) => (
                <div key={entry.label} className="stat-item">
                  <p className="stat-label">{entry.label}</p>
                  <p
                    className={`stat-value${
                      entry.valueClassName ? ` ${entry.valueClassName}` : ''
                    }`}
                  >
                    {entry.value}
                  </p>
                  {index < characterInfo.length - 1 ? (
                    <span className="stat-divider" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="character-bottom-row">
          <article className="panel character-backstory-shell">
            <div className="character-backstory">
              <h3 className="ui-subtitle">Backstory</h3>
              {siteContent.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div className="character-actions">
            <button
              type="button"
              className="pixel-button action-primary"
              onClick={onOpenMessenger}
            >
              Hire For Quest
            </button>
            <a
              className="pixel-button action-secondary"
              href="/Simone_Coletta_CV.pdf"
              download="Simone_Coletta_CV.pdf"
            >
              Download Scroll (CV)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
