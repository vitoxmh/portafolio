import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'
import { NAVIGATION } from '../data'

export default function BottomNav() {
  const { t } = useLanguage()

  return (
    <nav
      className="bottom-nav u-pb-safe"
      data-active-classes="bottom-nav__item--active"
    >
      <div className="bottom-nav__inner">
        {NAVIGATION.bottomNav.map((item) => (
          <a
            key={item.path}
            aria-current={item.active ? 'page' : undefined}
            className={`bottom-nav__item${item.active ? ' bottom-nav__item--active' : ''}`}
            data-path={item.path}
            href={item.href}
          >
            <Icon name={item.icon} />
            <span className="bottom-nav__label">{t(item.label)}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
