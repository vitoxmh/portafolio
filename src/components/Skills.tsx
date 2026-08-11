import Icon from './Icon'
import { useLanguage } from '../hooks/useLanguage'

const SKILLS = [
  { icon: 'javascript', color: 'primary', label: 'JavaScript' },
  { icon: 'code', color: 'primary', label: 'React' },
  { icon: 'css', color: 'primary', label: 'Tailwind' },
  { icon: 'sports_esports', color: 'secondary', label: 'Unity' },
  { icon: 'terminal', color: 'secondary', label: 'TypeScript' },
  { icon: 'html', color: 'secondary', label: 'HTML5' },
  { icon: 'data_object', color: 'tertiary', label: 'Redux' },
  { icon: 'api', color: 'tertiary', label: 'REST API' },
  { icon: 'account_tree', color: 'primary', label: 'Git' },
  { icon: 'cloud', color: 'secondary', label: 'Docker' },
  { icon: 'palette', color: 'primary', label: 'CSS3' },
  { icon: 'php', color: 'primary', label: 'PHP' },
  { icon: 'dns', color: 'secondary', label: 'NodeJS' },
  { icon: 'python', color: 'tertiary', label: 'Python', size: '12px' },
  { icon: 'smart_toy', color: 'tertiary', label: 'Agente Opencode' },
]

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__info">
          <h2 className="skills__title">
            <span className="skills__index">04.</span> {t('skills.title')}
          </h2>
          <p className="skills__subtitle">{t('skills.subtitle')}</p>
        </div>
        <div className="skills__grid">
          {SKILLS.map((skill) => (
            <div key={skill.label} className="skills__card">
              <Icon
                name={skill.icon}
                className={`skills__icon skills__icon--${skill.color}${skill.size ? ` skills__icon--${skill.size}` : ''}`}
              />
              <span className="skills__name">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
