import type { Resume } from "@/types/resume";
import { formatDisplayName, formatPeriod } from "@/lib/resume";
import { EducationBlock, ExperienceBlock, SectionTitle, skillList } from "./shared";

export function ModernTemplate({ resume }: { resume: Resume }) {
  const { personal, accentColor } = resume;
  const skills = skillList(resume.skills);

  return (
    <div className="flex h-full min-h-full bg-white text-[1em] text-zinc-900">
      <aside className="w-[34%] px-6 py-8 text-white" style={{ background: accentColor }}>
        <h1 className="text-[1.7em] font-bold leading-tight">{formatDisplayName(personal) || "Фамилия Имя Отчество"}</h1>
        <p className="mt-1 text-[1em] opacity-90">{personal.title || "Специализация"}</p>

        <section className="mt-8">
          <h2 className="mb-3 text-[0.85em] font-bold uppercase tracking-[0.16em] opacity-80">Контакты</h2>
          <ul className="space-y-1.5 text-[0.88em] leading-relaxed break-all">
            {personal.email ? <li>{personal.email}</li> : null}
            {personal.phone ? <li>{personal.phone}</li> : null}
            {personal.location ? <li>{personal.location}</li> : null}
            {personal.website ? <li>{personal.website}</li> : null}
            {personal.telegram ? <li>Telegram: {personal.telegram}</li> : null}
            {personal.max ? <li>Max: {personal.max}</li> : null}
            {personal.linkedin ? <li>{personal.linkedin}</li> : null}
            {personal.github ? <li>{personal.github}</li> : null}
          </ul>
        </section>

        {skills.length > 0 ? (
          <section className="mt-7">
            <h2 className="mb-3 text-[0.85em] font-bold uppercase tracking-[0.16em] opacity-80">Навыки</h2>
            <ul className="space-y-1 text-[0.92em]">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {resume.languages.length > 0 ? (
          <section className="mt-7">
            <h2 className="mb-3 text-[0.85em] font-bold uppercase tracking-[0.16em] opacity-80">Языки</h2>
            {resume.languages.map((item) => (
              <p key={item.id} className="text-[0.92em]">
                {item.name}
                {item.level ? ` — ${item.level}` : ""}
              </p>
            ))}
          </section>
        ) : null}
      </aside>

      <main className="flex-1 px-7 py-8">
        {resume.summary ? (
          <section className="mb-5">
            <SectionTitle color={accentColor} variant="bar">
              О себе
            </SectionTitle>
            <p className="text-[0.96em] leading-relaxed">{resume.summary}</p>
          </section>
        ) : null}

        {resume.experience.length > 0 ? (
          <section className="mb-5">
            <SectionTitle color={accentColor} variant="bar">
              Опыт работы
            </SectionTitle>
            <ExperienceBlock resume={resume} compact />
          </section>
        ) : null}

        {resume.education.length > 0 ? (
          <section className="mb-5">
            <SectionTitle color={accentColor} variant="bar">
              Образование
            </SectionTitle>
            <EducationBlock resume={resume} />
          </section>
        ) : null}

        {resume.projects.length > 0 ? (
          <section className="mb-5">
            <SectionTitle color={accentColor} variant="bar">
              Проекты
            </SectionTitle>
            <div className="space-y-3">
              {resume.projects.map((item) => (
                <article key={item.id}>
                  <p className="font-semibold">{item.name}</p>
                  {item.description ? <p className="mt-1 text-[0.92em] leading-relaxed">{item.description}</p> : null}
                  {item.technologies ? <p className="mt-1 text-[0.85em] text-zinc-500">{item.technologies}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {resume.certificates.length > 0 ? (
          <section>
            <SectionTitle color={accentColor} variant="bar">
              Сертификаты
            </SectionTitle>
            {resume.certificates.map((item) => (
              <p key={item.id} className="text-[0.96em]">
                {item.name}
                {item.issuer ? ` — ${item.issuer}` : ""}
                {item.date ? ` (${formatPeriod(item.date, "", false)})` : ""}
              </p>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}
