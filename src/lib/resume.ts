import type { Resume } from "@/types/resume";

export function uid() {
  return crypto.randomUUID();
}

export function createEmptyResume(): Resume {
  return {
    id: uid(),
    draftName: "Новое резюме",
    updatedAt: new Date().toISOString(),
    template: "classic",
    accentColor: "#2563eb",
    personal: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      telegram: "",
      max: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: "",
    projects: [],
    languages: [],
    certificates: [],
  };
}

export function createSampleResume(): Resume {
  return {
    id: uid(),
    draftName: "Пример резюме",
    updatedAt: new Date().toISOString(),
    template: "classic",
    accentColor: "#2563eb",
    personal: {
      fullName: "Анна Смирнова",
      title: "Frontend-разработчик",
      email: "anna.smirnova@email.com",
      phone: "+7 (999) 123-45-67",
      location: "Москва",
      website: "annasmirnova.dev",
      linkedin: "linkedin.com/in/annasmirnova",
      github: "github.com/annasmirnova",
      telegram: "@annasmirnova",
      max: "max.ru/annasmirnova",
    },
    summary:
      "Frontend-разработчик с 5 годами опыта. Делаю понятные интерфейсы на React и TypeScript, слежу за доступностью и скоростью загрузки. Люблю доводить продукт от макета до продакшена вместе с дизайном и бэкендом.",
    experience: [
      {
        id: uid(),
        company: "Northwind Digital",
        role: "Старший frontend-разработчик",
        location: "Москва",
        startDate: "2022-03",
        endDate: "",
        current: true,
        description:
          "• Руководила интерфейсом B2B-кабинета и сократила время ключевых сценариев на 28%\n• Внедрила дизайн-систему на React и снизила дублирование UI-кода\n• Настроила визуальные регрессии и улучшила стабильность релизов",
      },
      {
        id: uid(),
        company: "Orbit Labs",
        role: "Frontend-разработчик",
        location: "Санкт-Петербург",
        startDate: "2019-08",
        endDate: "2022-02",
        current: false,
        description:
          "• Разрабатывала SPA на Next.js для образовательной платформы\n• Оптимизировала Core Web Vitals: LCP с 3.1s до 1.6s\n• Работала с REST API, авторизацией и ролевой моделью",
      },
    ],
    education: [
      {
        id: uid(),
        school: "НИУ ВШЭ",
        degree: "Бакалавр",
        field: "Программная инженерия",
        startDate: "2015-09",
        endDate: "2019-06",
        description: "Курсовые по веб-технологиям и человеко-компьютерному взаимодействию.",
      },
    ],
    skills: "TypeScript, React, Next.js, Tailwind CSS, Zustand, GraphQL, Jest, Playwright, Figma, Git",
    projects: [
      {
        id: uid(),
        name: "Pulse Board",
        link: "github.com/annasmirnova/pulse-board",
        description: "Дашборд метрик продукта с фильтрами, сохранёнными видами и экспортом отчётов.",
        technologies: "Next.js, TypeScript, Recharts",
      },
    ],
    languages: [
      { id: uid(), name: "Русский", level: "Родной" },
      { id: uid(), name: "Английский", level: "C1" },
    ],
    certificates: [
      {
        id: uid(),
        name: "Professional Frontend Engineer",
        issuer: "Meta",
        date: "2023-11",
      },
    ],
  };
}

export function formatPeriod(startDate: string, endDate: string, current: boolean) {
  const start = formatMonth(startDate);
  const end = current ? "н.в." : formatMonth(endDate);
  if (!start && !end) return "";
  return [start, end].filter(Boolean).join(" — ");
}

export function formatMonth(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year) return value;
  if (!month) return year;
  return `${month}.${year}`;
}

export function normalizeResume(resume: Resume): Resume {
  const defaults = createEmptyResume();
  return {
    ...defaults,
    ...resume,
    personal: {
      ...defaults.personal,
      ...resume.personal,
    },
  };
}
