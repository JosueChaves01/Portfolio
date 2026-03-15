import { useIDE } from '../../../../store/IDEContext';
import { useLanguage } from '../../../../store/LanguageContext';

import { Icon } from '../../../../shared/icons/Icon';
import { HOME, ROLE_BADGES, ACTION_BUTTONS } from '../constants/home.constants';
import { TypewriterText } from './TypewriterText';
import { RoleBadge } from './RoleBadge';
import { StatsCard } from './StatsCard';
import { SocialLinks } from './SocialLinks';
import { Button } from '../../../../shared/components/Button/Button';
import styles from './HomeSection.module.css';

export function HomeSection() {
  const { openTab } = useIDE();
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(HOME.HEADER_COMMENT)}</p>

      <div className={styles.nameBlock}>
        <h1 className={styles.nameFirst}>{HOME.NAME_FIRST}</h1>
        <h1 className={styles.nameLast}>{HOME.NAME_LAST}</h1>
      </div>

      <div className={styles.badges}>
        {ROLE_BADGES.map(({ id, label, dotColor }) => (
          <RoleBadge key={id} label={t(label)} dotColor={dotColor} />
        ))}
      </div>

      <TypewriterText />

      <p className={styles.bio}>
        {t(HOME.BIO).split(new RegExp(`(${HOME.BIO_KEYWORDS.join('|')})`, 'gi')).map((part, i) =>
            <span key={`highlight-${part}-${crypto.randomUUID()}`} className={styles.highlight}>{part}</span>
        )}
      </p>


      <div className={styles.actions}>
        {ACTION_BUTTONS.map(({ id, icon, label, variant, targetTab }) => (
          <Button
            key={id}
            variant={variant}
            onClick={() => openTab(targetTab)}
          >
            <Icon name={icon} size={14} /> {label}
          </Button>
        ))}
      </div>

      <StatsCard />
      <SocialLinks />
    </section>
  );
}
