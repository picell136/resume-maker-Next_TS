import type { Resume } from "@/types/resume";
import { formatPeriod } from "@/lib/resume";
import { EducationBlock, ExperienceBlock, SectionTitle, skillList } from "./shared";

export function MinimalTemplate({ resume }: { resume: Resume }) {
  const { personal, accentColor } = resume;
  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.telegram ? `Telegram: ${personal.telegram}` : "",
    personal.max ? `Max: ${personal.max}` : "",
  ]
    .filter(Boolean)
    .join("  /  ");

  return (
    <div className="h-full bg-white px-12 py-10 text-[13px] text-zinc-800">
      <header className="mb-8">
        <h1 className="text-[30px] font-light tracking-tight text-zinc-900">
          {personal.fullName || "Имя Фамилия"}
        </h1>
        <p className="mt-1 text-[13px] uppercase tracking-[0.22em]" style={{ color: accentColor }}>
          {personal.title || "Специализация"}
        </p>
        {contacts ? <p className="mt-4 text-[11px] text-zinc-500">{contacts}</p> : null}
      </header>

      {resume.summary ? (
        <section className="mb-7">
          <SectionTitle color={accentColor} variant="plain">
            Кратко
          </SectionTitle>
          <p className="max-w-[58ch] text-[13px] leading-relaxed">{resume.summary}</p>
        </section>
      ) : null}

      {resume.experience.length > 0 ? (
        <section className="mb-7">
          <SectionTitle color={accentColor} variant="plain">
            Опыт
          </SectionTitle>
          <ExperienceBlock resume={resume} />
        </section>
      ) : null}

      {resume.education.length > 0 ? (
        <section className="mb-7">
          <SectionTitle color={accentColor} variant="plain">
            Образование
          </SectionTitle>
          <EducationBlock resume={resume} />
        </section>
      ) : null}

      {skillList(resume.skills).length > 0 ? (
        <section className="mb-7">
          <SectionTitle color={accentColor} variant="plain">
            Навыки
          </SectionTitle>
          <p className="text-[13px] leading-relaxed">{skillList(resume.skills).join("  ·  ")}</p>
        </section>
      ) : null}

      {resume.projects.length > 0 ? (
        <section className="mb-7">
          <SectionTitle color={accentColor} variant="plain">
            Проекты
          </SectionTitle>
          <div className="space-y-3">
            {resume.projects.map((item) => (
              <article key={item.id}>
                <p className="font-medium text-zinc-900">{item.name}</p>
                {item.description ? <p className="mt-1 text-[12.5px] leading-relaxed">{item.description}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {resume.languages.length > 0 || resume.certificates.length > 0 ? (
        <div className="grid grid-cols-2 gap-8">
          {resume.languages.length > 0 ? (
            <section>
              <SectionTitle color={accentColor} variant="plain">
                Языки
              </SectionTitle>
              {resume.languages.map((item) => (
                <p key={item.id}>
                  {item.name}
                  {item.level ? ` — ${item.level}` : ""}
                </p>
              ))}
            </section>
          ) : null}
          {resume.certificates.length > 0 ? (
            <section>
              <SectionTitle color={accentColor} variant="plain">
                Сертификаты
              </SectionTitle>
              {resume.certificates.map((item) => (
                <p key={item.id}>
                  {item.name}
                  {item.date ? ` (${formatPeriod(item.date, "", false)})` : ""}
                </p>
              ))}
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
