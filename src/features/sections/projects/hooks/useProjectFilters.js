import { useMemo, useState } from 'react';

export const STATUS_FILTERS = {
  ALL: 'all',
  LIVE: 'live',
  CODE: 'code',
};

export const SORT_OPTIONS = {
  CURATED: 'curated',
  ALPHABETICAL: 'alphabetical',
};

const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Search, category, technology and status filters for the project grid. */
export function useProjectFilters(projects, t) {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [technology, setTechnology] = useState('');
  const [status, setStatus] = useState(STATUS_FILTERS.ALL);
  const [sort, setSort] = useState(SORT_OPTIONS.CURATED);

  const technologies = useMemo(() => {
    const counts = new Map();
    projects.forEach(({ tags }) => tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name, count]) => ({ name, count }));
  }, [projects]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    projects.forEach((project) => project.categories?.forEach((id) => { counts[id] = (counts[id] || 0) + 1; }));
    return counts;
  }, [projects]);

  const filtered = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    const result = projects.filter((project) => {
      if (categories.length && !categories.some((id) => project.categories?.includes(id))) return false;
      if (technology && !project.tags.includes(technology)) return false;
      if (status === STATUS_FILTERS.LIVE && !project.live) return false;
      if (status === STATUS_FILTERS.CODE && !project.github) return false;
      if (!terms.length) return true;
      const haystack = normalize([project.title, t(project.category), t(project.description), ...project.tags].join(' '));
      return terms.every((term) => haystack.includes(term));
    });
    return sort === SORT_OPTIONS.ALPHABETICAL ? [...result].sort((a, b) => a.title.localeCompare(b.title)) : result;
  }, [projects, query, categories, technology, status, sort, t]);

  const toggleCategory = (id) => setCategories((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));

  const hasFilters = Boolean(query || categories.length || technology || status !== STATUS_FILTERS.ALL);

  const reset = () => {
    setQuery('');
    setCategories([]);
    setTechnology('');
    setStatus(STATUS_FILTERS.ALL);
  };

  return {
    query, setQuery, categories, toggleCategory, technology, setTechnology, status, setStatus, sort, setSort,
    technologies, categoryCounts, filtered, hasFilters, reset,
  };
}
