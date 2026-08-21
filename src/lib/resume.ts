import type { PersonalInfo, Resume } from "@/types/resume";
import { clampFontSize, FONT_SIZE_DEFAULT, fontSizeFromLegacyScale } from "@/lib/fonts";

export function uid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function createEmptyResume(): Resume {
  return {
    id: uid(),
    draftName: "Новое резюме",
    updatedAt: new Date().toISOString(),
    template: "classic",
    accentColor: "#2563eb",
    fontFamilyId: "georgia",
    fontStyleId: "regular",
    fontSize: FONT_SIZE_DEFAULT,
    personal: {
      lastName: "",
      firstName: "",
      patronymic: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      telegram: "",
      max: "",
      linkedin: "",
      github: "",
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
    fontFamilyId: "georgia",
    fontStyleId: "regular",
    fontSize: FONT_SIZE_DEFAULT,
    personal: {
      lastName: "Смирнова",
      firstName: "Анна",
      patronymic: "Сергеевна",
      title: "Frontend-разработчик",
      email: "anna.smirnova@email.com",
      phone: "+7 (999) 123-45-67",
      location: "Москва",
      website: "annasmirnova.dev",
      telegram: "@annasmirnova",
      max: "max.ru/annasmirnova",
      linkedin: "linkedin.com/in/annasmirnova",
      github: "github.com/annasmirnova",
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

export function formatDisplayName(personal: PersonalInfo) {
  return [personal.lastName, personal.firstName, personal.patronymic].filter(Boolean).join(" ");
}

function migratePersonal(personal?: PersonalInfo & { fullName?: string }): PersonalInfo {
  const defaults = createEmptyResume().personal;
  const merged = { ...defaults, ...personal };
  const hasParts = Boolean(merged.lastName || merged.firstName || merged.patronymic);
  if (!hasParts && personal?.fullName) {
    const parts = personal.fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 3) {
      merged.lastName = parts[0];
      merged.firstName = parts[1];
      merged.patronymic = parts.slice(2).join(" ");
    } else if (parts.length === 2) {
      merged.firstName = parts[0];
      merged.lastName = parts[1];
    } else if (parts.length === 1) {
      merged.lastName = parts[0];
    }
  }
  return {
    lastName: merged.lastName ?? "",
    firstName: merged.firstName ?? "",
    patronymic: merged.patronymic ?? "",
    title: merged.title ?? "",
    email: merged.email ?? "",
    phone: merged.phone ?? "",
    location: merged.location ?? "",
    website: merged.website ?? "",
    telegram: merged.telegram ?? "",
    max: merged.max ?? "",
    linkedin: merged.linkedin ?? "",
    github: merged.github ?? "",
  };
}

export function normalizeResume(resume: Resume): Resume {
  const defaults = createEmptyResume();
  return {
    ...defaults,
    ...resume,
    personal: migratePersonal(resume.personal),
    fontSize: resolveFontSize(resume),
  };
}

function resolveFontSize(resume: Resume & { fontScale?: number }) {
  if (Number.isFinite(resume.fontSize) && resume.fontSize > 0) {
    return clampFontSize(resume.fontSize);
  }
  if (Number.isFinite(resume.fontScale)) {
    return fontSizeFromLegacyScale(resume.fontScale as number);
  }
  return FONT_SIZE_DEFAULT;
}
