"use client";

import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { Field, TextArea, TextInput } from "./fields";

function SectionCard({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
        {onAdd ? (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
          >
            <Plus size={14} />
            Добавить
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function ResumeEditor() {
  const {
    resume,
    setPersonal,
    patchResume,
    setSummary,
    setSkills,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertificate,
    updateCertificate,
    removeCertificate,
  } = useResumeStore();

  return (
    <div className="space-y-4">
      <SectionCard title="Название черновика">
        <Field label="Как сохранить">
          <TextInput
            value={resume.draftName}
            onChange={(event) => patchResume({ draftName: event.target.value })}
            placeholder="Frontend, январь"
          />
        </Field>
      </SectionCard>

      <SectionCard title="Личные данные">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="ФИО">
            <TextInput
              value={resume.personal.fullName}
              onChange={(event) => setPersonal({ fullName: event.target.value })}
            />
          </Field>
          <Field label="Должность">
            <TextInput
              value={resume.personal.title}
              onChange={(event) => setPersonal({ title: event.target.value })}
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={resume.personal.email}
              onChange={(event) => setPersonal({ email: event.target.value })}
            />
          </Field>
          <Field label="Телефон">
            <TextInput
              value={resume.personal.phone}
              onChange={(event) => setPersonal({ phone: event.target.value })}
            />
          </Field>
          <Field label="Город">
            <TextInput
              value={resume.personal.location}
              onChange={(event) => setPersonal({ location: event.target.value })}
            />
          </Field>
          <Field label="Сайт">
            <TextInput
              value={resume.personal.website}
              onChange={(event) => setPersonal({ website: event.target.value })}
            />
          </Field>
          <Field label="LinkedIn">
            <TextInput
              value={resume.personal.linkedin}
              onChange={(event) => setPersonal({ linkedin: event.target.value })}
            />
          </Field>
          <Field label="GitHub">
            <TextInput
              value={resume.personal.github ?? ""}
              onChange={(event) => setPersonal({ github: event.target.value })}
            />
          </Field>
          <Field label="Telegram">
            <TextInput
              value={resume.personal.telegram ?? ""}
              onChange={(event) => setPersonal({ telegram: event.target.value })}
              placeholder="@username"
            />
          </Field>
          <Field label="Max">
            <TextInput
              value={resume.personal.max ?? ""}
              onChange={(event) => setPersonal({ max: event.target.value })}
              placeholder="max.ru/username"
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="О себе">
        <TextArea
          rows={5}
          value={resume.summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="Коротко о опыте, сильных сторонах и том, какую роль ищете."
        />
      </SectionCard>

      <SectionCard title="Опыт работы" onAdd={addExperience}>
        {resume.experience.length === 0 ? (
          <p className="text-sm text-zinc-500">Пока нет записей.</p>
        ) : (
          <div className="space-y-4">
            {resume.experience.map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <div className="mb-3 flex justify-end">
                  <button type="button" onClick={() => removeExperience(item.id)} className="text-zinc-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Должность">
                    <TextInput value={item.role} onChange={(event) => updateExperience(item.id, { role: event.target.value })} />
                  </Field>
                  <Field label="Компания">
                    <TextInput value={item.company} onChange={(event) => updateExperience(item.id, { company: event.target.value })} />
                  </Field>
                  <Field label="Город">
                    <TextInput value={item.location} onChange={(event) => updateExperience(item.id, { location: event.target.value })} />
                  </Field>
                  <Field label="Начало">
                    <TextInput type="month" value={item.startDate} onChange={(event) => updateExperience(item.id, { startDate: event.target.value })} />
                  </Field>
                  <Field label="Окончание">
                    <TextInput
                      type="month"
                      value={item.endDate}
                      disabled={item.current}
                      onChange={(event) => updateExperience(item.id, { endDate: event.target.value })}
                    />
                  </Field>
                  <label className="flex items-end gap-2 pb-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(event) => updateExperience(item.id, { current: event.target.checked })}
                    />
                    Работаю сейчас
                  </label>
                </div>
                <div className="mt-3">
                  <Field label="Описание">
                    <TextArea
                      rows={4}
                      value={item.description}
                      onChange={(event) => updateExperience(item.id, { description: event.target.value })}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Образование" onAdd={addEducation}>
        {resume.education.length === 0 ? (
          <p className="text-sm text-zinc-500">Пока нет записей.</p>
        ) : (
          <div className="space-y-4">
            {resume.education.map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <div className="mb-3 flex justify-end">
                  <button type="button" onClick={() => removeEducation(item.id)} className="text-zinc-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Учебное заведение">
                    <TextInput value={item.school} onChange={(event) => updateEducation(item.id, { school: event.target.value })} />
                  </Field>
                  <Field label="Степень">
                    <TextInput value={item.degree} onChange={(event) => updateEducation(item.id, { degree: event.target.value })} />
                  </Field>
                  <Field label="Специальность">
                    <TextInput value={item.field} onChange={(event) => updateEducation(item.id, { field: event.target.value })} />
                  </Field>
                  <Field label="Начало">
                    <TextInput type="month" value={item.startDate} onChange={(event) => updateEducation(item.id, { startDate: event.target.value })} />
                  </Field>
                  <Field label="Окончание">
                    <TextInput type="month" value={item.endDate} onChange={(event) => updateEducation(item.id, { endDate: event.target.value })} />
                  </Field>
                </div>
                <div className="mt-3">
                  <Field label="Комментарий">
                    <TextArea rows={3} value={item.description} onChange={(event) => updateEducation(item.id, { description: event.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Навыки">
        <TextArea
          rows={3}
          value={resume.skills}
          onChange={(event) => setSkills(event.target.value)}
          placeholder="Через запятую: TypeScript, React, Next.js"
        />
      </SectionCard>

      <SectionCard title="Проекты" onAdd={addProject}>
        {resume.projects.length === 0 ? (
          <p className="text-sm text-zinc-500">Пока нет записей.</p>
        ) : (
          <div className="space-y-4">
            {resume.projects.map((item) => (
              <div key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <div className="mb-3 flex justify-end">
                  <button type="button" onClick={() => removeProject(item.id)} className="text-zinc-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Название">
                    <TextInput value={item.name} onChange={(event) => updateProject(item.id, { name: event.target.value })} />
                  </Field>
                  <Field label="Ссылка">
                    <TextInput value={item.link} onChange={(event) => updateProject(item.id, { link: event.target.value })} />
                  </Field>
                </div>
                <div className="mt-3 grid gap-3">
                  <Field label="Описание">
                    <TextArea rows={3} value={item.description} onChange={(event) => updateProject(item.id, { description: event.target.value })} />
                  </Field>
                  <Field label="Технологии">
                    <TextInput value={item.technologies} onChange={(event) => updateProject(item.id, { technologies: event.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Языки" onAdd={addLanguage}>
        {resume.languages.length === 0 ? (
          <p className="text-sm text-zinc-500">Пока нет записей.</p>
        ) : (
          <div className="space-y-3">
            {resume.languages.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <TextInput placeholder="Язык" value={item.name} onChange={(event) => updateLanguage(item.id, { name: event.target.value })} />
                <TextInput placeholder="Уровень" value={item.level} onChange={(event) => updateLanguage(item.id, { level: event.target.value })} />
                <button type="button" onClick={() => removeLanguage(item.id)} className="text-zinc-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Сертификаты" onAdd={addCertificate}>
        {resume.certificates.length === 0 ? (
          <p className="text-sm text-zinc-500">Пока нет записей.</p>
        ) : (
          <div className="space-y-4">
            {resume.certificates.map((item) => (
              <div key={item.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center">
                <TextInput placeholder="Название" value={item.name} onChange={(event) => updateCertificate(item.id, { name: event.target.value })} />
                <TextInput placeholder="Организатор" value={item.issuer} onChange={(event) => updateCertificate(item.id, { issuer: event.target.value })} />
                <TextInput type="month" value={item.date} onChange={(event) => updateCertificate(item.id, { date: event.target.value })} />
                <button type="button" onClick={() => removeCertificate(item.id)} className="text-zinc-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
