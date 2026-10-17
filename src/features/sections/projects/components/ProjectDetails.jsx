import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { PROJECT_DETAIL_TABS, PROJECTS } from '../constants/projects.constants';
import styles from './ProjectDetails.module.css';

const hasContent = (details, tabId) => {
  switch (tabId) {
    case 'overview': return Boolean(details.summary);
    case 'stack': return Boolean(details.stack?.length);
    case 'architecture': return Boolean(details.architecture || details.structure);
    case 'ui': return Boolean(details.ui);
    case 'decisions': return Boolean(details.decisions?.length);
    default: return false;
  }
};

function TabPanel({ tabId, details, tags, t }) {
  const resolve = (value) => (typeof value === 'string' ? value : t(value));

  if (tabId === 'overview') {
    return (
      <>
        <p className={styles.paragraph}>{t(details.summary)}</p>
        {details.highlights?.length > 0 && (
          <ul className={styles.list}>
            {details.highlights.map((item) => <li key={item.en || item}>{resolve(item)}</li>)}
          </ul>
        )}
        {details.status && (
          <p className={styles.status}><Icon name="Info" size={14} /> {t(details.status)}</p>
        )}
        <div className={styles.tags}>{tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </>
    );
  }

  if (tabId === 'stack') {
    return (
      <div className={styles.stackGrid}>
        {details.stack.map((group) => (
          <div key={group.label.en || group.label} className={styles.stackGroup}>
            <span className={styles.stackLabel}>{resolve(group.label)}</span>
            <ul className={styles.stackItems}>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (tabId === 'architecture') {
    return (
      <>
        {details.architecture && <p className={styles.paragraph}>{t(details.architecture)}</p>}
        {details.structure && <pre className={styles.tree}><code>{details.structure}</code></pre>}
      </>
    );
  }

  if (tabId === 'ui') return <p className={styles.paragraph}>{t(details.ui)}</p>;

  return (
    <ol className={styles.decisions}>
      {details.decisions.map((decision, index) => (
        <Motion.li key={decision.en} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
          {t(decision)}
        </Motion.li>
      ))}
    </ol>
  );
}

export function ProjectDetails({ project, onClose }) {
  const { t } = useLanguage();
  const closeRef = useRef(null);
  const tabs = project ? PROJECT_DETAIL_TABS.filter(({ id }) => hasContent(project.details, id)) : [];
  const [activeTab, setActiveTab] = useState('overview');
  const currentTab = tabs.some(({ id }) => id === activeTab) ? activeTab : tabs[0]?.id;

  useEffect(() => {
    if (!project) return undefined;
    closeRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <Motion.div
          key="backdrop"
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            style={{ '--project-color': project.color }}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.titleBar}>
              <span className={styles.fileTab}><Icon name="FileText" size={13} /> {project.id}.md</span>
              <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label={t(PROJECTS.CLOSE)}>
                <Icon name="X" size={15} />
              </button>
            </div>

            <header className={styles.header}>
              <span className={styles.icon}><Icon name={project.icon} size={22} color={project.color} /></span>
              <div className={styles.headerText}>
                <span className={styles.category}>{t(project.category)}</span>
                <h2 id="project-details-title" className={styles.title}>{project.title}</h2>
              </div>
              <div className={styles.links}>
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">{PROJECTS.GITHUB_LABEL}</a>}
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.live}>{PROJECTS.LIVE_LABEL}</a>}
              </div>
            </header>

            <div className={styles.tabs} role="tablist">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={currentTab === id}
                  className={`${styles.tab} ${currentTab === id ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  {t(label)}
                  {currentTab === id && <Motion.span layoutId="project-tab-indicator" className={styles.tabIndicator} />}
                </button>
              ))}
            </div>

            <div className={styles.body} role="tabpanel">
              <AnimatePresence mode="wait">
                <Motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <TabPanel tabId={currentTab} details={project.details} tags={project.tags} t={t} />
                </Motion.div>
              </AnimatePresence>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
