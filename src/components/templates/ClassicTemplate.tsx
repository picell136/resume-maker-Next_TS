import type { Resume } from "@/types/resume";
import { formatPeriod } from "@/lib/resume";
import { EducationBlock, ExperienceBlock, SectionTitle, skillList } from "./shared";

export function ClassicTemplate({ resume }: { resume: Resume }) {
  const { personal, accentColor } = resume;
  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
    personal.github,
    personal.telegram ? `Telegram: ${personal.telegram}` : "",
    personal.max ? `Max: ${personal.max}` : "",
  ].filter(Boolean);

  return (
    <div className="h-full bg-white px-10 py-9 text-[13px] text-zinc-900">
      <header className="mb-6 text-center">
        <h1 className="text-[28px] font-normal tracking-wide">
          {personal.fullName || "Имя Фамилия"}
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: accentColor }}>
          {personal.title || "Специализация"}
        </p>
        {contacts.length > 0 ? (
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">{contacts.join("  ·  ")}</p>
        ) : null}
      </header>

      {resume.summary ? (
        <section className="mb-5">
          <SectionTitle color={accentColor}>О себе</SectionTitle>
          <p className="text-[12.5px] leading-relaxed">{resume.summary}</p>
        </section>
      ) : null}

      {resume.experience.length > 0 ? (
        <section className="mb-5">
          <SectionTitle color={accentColor}>Опыт работы</SectionTitle>
          <ExperienceBlock resume={resume} />
        </section>
      ) : null}

      {resume.education.length > 0 ? (
        <section className="mb-5">
          <SectionTitle color={accentColor}>Образование</SectionTitle>
          <EducationBlock resume={resume} />
        </section>
      ) : null}

      {skillList(resume.skills).length > 0 ? (
        <section className="mb-5">
          <SectionTitle color={accentColor}>Навыки</SectionTitle>
          <p className="text-[12.5px] leading-relaxed">{skillList(resume.skills).join(" · ")}</p>
        </section>
      ) : null}

      {resume.projects.length > 0 ? (
        <section className="mb-5">
          <SectionTitle color={accentColor}>Проекты</SectionTitle>
          <div className="space-y-3">
            {resume.projects.map((item) => (
              <article key={item.id}>
                <p className="font-semibold">
                  {item.name}
                  {item.link ? <span className="ml-2 font-normal text-zinc-500">{item.link}</span> : null}
                </p>
                {item.description ? <p className="mt-1 text-[12px] leading-relaxed">{item.description}</p> : null}
                {item.technologies ? <p className="mt-1 text-[11px] text-zinc-500">{item.technologies}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {resume.languages.length > 0 || resume.certificates.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {resume.languages.length > 0 ? (
            <section>
              <SectionTitle color={accentColor}>Языки</SectionTitle>
              {resume.languages.map((item) => (
                <p key={item.id} className="text-[12.5px]">
                  {item.name}
                  {item.level ? ` — ${item.level}` : ""}
                </p>
              ))}
            </section>
          ) : null}
          {resume.certificates.length > 0 ? (
            <section>
              <SectionTitle color={accentColor}>Сертификаты</SectionTitle>
              {resume.certificates.map((item) => (
                <p key={item.id} className="text-[12.5px]">
                  {item.name}
                  {item.issuer ? `, ${item.issuer}` : ""}
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
