import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { PROJECT_CATEGORIES } from '../mocks/projects.mock';
import { PROJECT_FILTERS } from '../constants/projects.constants';
import { SORT_OPTIONS, STATUS_FILTERS } from '../hooks/useProjectFilters';
import styles from './ProjectFilters.module.css';

export function ProjectFilters({ filters, total }) {
  const { t } = useLanguage();
  const {
    query, setQuery, categories, toggleCategory, technology, setTechnology, status, setStatus, sort, setSort,
    technologies, categoryCounts, filtered, hasFilters, reset,
  } = filters;

  return (
    <div className={styles.panel} role="search">
      <div className={styles.topRow}>
        <label className={styles.search}>
          <Icon name="Search" size={15} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(PROJECT_FILTERS.SEARCH_PLACEHOLDER)}
            aria-label={t(PROJECT_FILTERS.SEARCH_LABEL)}
          />
          {query && (
            <button type="button" className={styles.clearSearch} onClick={() => setQuery('')} aria-label={t(PROJECT_FILTERS.CLEAR_SEARCH)}>
              <Icon name="X" size={13} />
            </button>
          )}
        </label>

        <label className={styles.select}>
          <span>{t(PROJECT_FILTERS.TECHNOLOGY)}</span>
          <select value={technology} onChange={(event) => setTechnology(event.target.value)}>
            <option value="">{t(PROJECT_FILTERS.ALL_TECHNOLOGIES)}</option>
            {technologies.map(({ name, count }) => <option key={name} value={name}>{name} ({count})</option>)}
          </select>
        </label>

        <label className={styles.select}>
          <span>{t(PROJECT_FILTERS.STATUS)}</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value={STATUS_FILTERS.ALL}>{t(PROJECT_FILTERS.STATUS_ALL)}</option>
            <option value={STATUS_FILTERS.LIVE}>{t(PROJECT_FILTERS.STATUS_LIVE)}</option>
            <option value={STATUS_FILTERS.CODE}>{t(PROJECT_FILTERS.STATUS_CODE)}</option>
          </select>
        </label>

        <label className={styles.select}>
          <span>{t(PROJECT_FILTERS.SORT)}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value={SORT_OPTIONS.CURATED}>{t(PROJECT_FILTERS.SORT_CURATED)}</option>
            <option value={SORT_OPTIONS.ALPHABETICAL}>{t(PROJECT_FILTERS.SORT_ALPHABETICAL)}</option>
          </select>
        </label>
      </div>

      <div className={styles.chips} role="group" aria-label={t(PROJECT_FILTERS.CATEGORIES)}>
        {PROJECT_CATEGORIES.map(({ id, icon, label }) => {
          const active = categories.includes(id);
          return (
            <Motion.button
              key={id}
              type="button"
              className={`${styles.chip} ${active ? styles.chipActive : ''}`}
              aria-pressed={active}
              onClick={() => toggleCategory(id)}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <Icon name={icon} size={13} />
              {t(label)}
              <span className={styles.count}>{categoryCounts[id] || 0}</span>
            </Motion.button>
          );
        })}
      </div>

      <div className={styles.summary}>
        <span>
          <strong>{filtered.length}</strong> {t(PROJECT_FILTERS.OF)} {total} {t(PROJECT_FILTERS.PROJECTS)}
        </span>
        {hasFilters && (
          <button type="button" className={styles.reset} onClick={reset}>
            <Icon name="FilterX" size={13} /> {t(PROJECT_FILTERS.RESET)}
          </button>
        )}
      </div>
    </div>
  );
}
