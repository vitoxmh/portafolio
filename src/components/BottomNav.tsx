import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'
import type { TranslationKey } from '../i18n'

const NAV_ITEMS: {
  icon: string
  labelKey: TranslationKey
  href: string
  path: string
  active: boolean
}[] = [
  {
    icon: 'grid_view',
    labelKey: 'bottomnav.home',
    href: '#home',
    path: 'home',
    active: true,
  },
  {
    icon: 'rocket_launch',
    labelKey: 'bottomnav.work',
    href: '#projects',
    path: 'projects',
    active: false,
  },
  {
    icon: 'history_edu',
    labelKey: 'bottomnav.exp',
    href: '#experience',
    path: 'experience',
    active: false,
  },
  {
    icon: 'alternate_email',
    labelKey: 'bottomnav.mail',
    href: '#contact',
    path: 'contact',
    active: false,
  },
]

export default function BottomNav() {
  const { t } = useLanguage()

  return (
    <nav
      className="bottom-nav u-pb-safe"
      data-active-classes="bottom-nav__item--active"
    >
      <div className="bottom-nav__inner">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.path}
            aria-current={item.active ? 'page' : undefined}
            className={`bottom-nav__item${item.active ? ' bottom-nav__item--active' : ''}`}
            data-path={item.path}
            href={item.href}
          >
            <Icon name={item.icon} />
            <span className="bottom-nav__label">{t(item.labelKey)}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
