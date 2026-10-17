import { lazy, Suspense, useState } from 'react';
import { SkillsOrbital } from './SkillsOrbital';
import styles from './galaxy/SkillsGalaxy.module.css';

// The 3D map pulls in three.js, so it is loaded only when the Skills section opens.
const SkillsGalaxy = lazy(() => import('./galaxy/SkillsGalaxy'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function SkillsMap() {
  const [hasWebGL] = useState(supportsWebGL);

  if (!hasWebGL) return <SkillsOrbital />;

  return (
    <Suspense fallback={<div className={`${styles.cockpit} ${styles.viewport}`} aria-busy="true" />}>
      <SkillsGalaxy />
    </Suspense>
  );
}
