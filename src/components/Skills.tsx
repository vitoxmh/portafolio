import Icon from './Icon'
import { SKILLS } from '../data'
import { useLanguage } from '../hooks/useLanguage'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <div className="skills__info">
          <h2 className="skills__title">
            <span className="skills__index">05.</span> {t(SKILLS.title)}
          </h2>
          <p className="skills__subtitle">{t(SKILLS.subtitle)}</p>
        </div>
        <div className="skills__grid">
          {SKILLS.items.map((skill) => (
            <div key={t(skill.label)} className="skills__card">
              <Icon
                name={skill.icon}
                className={`skills__icon skills__icon--${skill.color}${skill.size ? ` skills__icon--${skill.size}` : ''}`}
              />
              <span className="skills__name">{t(skill.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
