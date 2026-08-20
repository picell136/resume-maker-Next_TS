import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  ProjectItem,
  Resume,
  TemplateId,
} from "@/types/resume";
import { createEmptyResume, createSampleResume, normalizeResume, uid } from "@/lib/resume";

interface ResumeStore {
  resume: Resume;
  drafts: Resume[];
  setResume: (resume: Resume) => void;
  patchResume: (patch: Partial<Resume>) => void;
  setPersonal: (patch: Partial<PersonalInfo>) => void;
  setTemplate: (template: TemplateId) => void;
  setAccentColor: (accentColor: string) => void;
  setSummary: (summary: string) => void;
  setSkills: (skills: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addCertificate: () => void;
  updateCertificate: (id: string, patch: Partial<CertificateItem>) => void;
  removeCertificate: (id: string) => void;
  saveDraft: () => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  newResume: () => void;
}

function touch(resume: Resume): Resume {
  return { ...resume, updatedAt: new Date().toISOString() };
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: createSampleResume(),
      drafts: [],
      setResume: (resume) => set({ resume: touch(resume) }),
      patchResume: (patch) => set({ resume: touch({ ...get().resume, ...patch }) }),
      setPersonal: (patch) =>
        set({
          resume: touch({
            ...get().resume,
            personal: { ...get().resume.personal, ...patch },
          }),
        }),
      setTemplate: (template) => set({ resume: touch({ ...get().resume, template }) }),
      setAccentColor: (accentColor) => set({ resume: touch({ ...get().resume, accentColor }) }),
      setSummary: (summary) => set({ resume: touch({ ...get().resume, summary }) }),
      setSkills: (skills) => set({ resume: touch({ ...get().resume, skills }) }),
      addExperience: () =>
        set({
          resume: touch({
            ...get().resume,
            experience: [
              ...get().resume.experience,
              {
                id: uid(),
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              },
            ],
          }),
        }),
      updateExperience: (id, patch) =>
        set({
          resume: touch({
            ...get().resume,
            experience: get().resume.experience.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          }),
        }),
      removeExperience: (id) =>
        set({
          resume: touch({
            ...get().resume,
            experience: get().resume.experience.filter((item) => item.id !== id),
          }),
        }),
      addEducation: () =>
        set({
          resume: touch({
            ...get().resume,
            education: [
              ...get().resume.education,
              {
                id: uid(),
                school: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          }),
        }),
      updateEducation: (id, patch) =>
        set({
          resume: touch({
            ...get().resume,
            education: get().resume.education.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          }),
        }),
      removeEducation: (id) =>
        set({
          resume: touch({
            ...get().resume,
            education: get().resume.education.filter((item) => item.id !== id),
          }),
        }),
      addProject: () =>
        set({
          resume: touch({
            ...get().resume,
            projects: [
              ...get().resume.projects,
              { id: uid(), name: "", link: "", description: "", technologies: "" },
            ],
          }),
        }),
      updateProject: (id, patch) =>
        set({
          resume: touch({
            ...get().resume,
            projects: get().resume.projects.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          }),
        }),
      removeProject: (id) =>
        set({
          resume: touch({
            ...get().resume,
            projects: get().resume.projects.filter((item) => item.id !== id),
          }),
        }),
      addLanguage: () =>
        set({
          resume: touch({
            ...get().resume,
            languages: [...get().resume.languages, { id: uid(), name: "", level: "" }],
          }),
        }),
      updateLanguage: (id, patch) =>
        set({
          resume: touch({
            ...get().resume,
            languages: get().resume.languages.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          }),
        }),
      removeLanguage: (id) =>
        set({
          resume: touch({
            ...get().resume,
            languages: get().resume.languages.filter((item) => item.id !== id),
          }),
        }),
      addCertificate: () =>
        set({
          resume: touch({
            ...get().resume,
            certificates: [
              ...get().resume.certificates,
              { id: uid(), name: "", issuer: "", date: "" },
            ],
          }),
        }),
      updateCertificate: (id, patch) =>
        set({
          resume: touch({
            ...get().resume,
            certificates: get().resume.certificates.map((item) =>
              item.id === id ? { ...item, ...patch } : item,
            ),
          }),
        }),
      removeCertificate: (id) =>
        set({
          resume: touch({
            ...get().resume,
            certificates: get().resume.certificates.filter((item) => item.id !== id),
          }),
        }),
      saveDraft: () => {
        const current = touch({ ...get().resume });
        const drafts = get().drafts;
        const index = drafts.findIndex((draft) => draft.id === current.id);
        const nextDrafts =
          index >= 0
            ? drafts.map((draft, i) => (i === index ? current : draft))
            : [current, ...drafts];
        set({ resume: current, drafts: nextDrafts });
      },
      loadDraft: (id) => {
        const draft = get().drafts.find((item) => item.id === id);
        if (draft) set({ resume: normalizeResume(structuredClone(draft)) });
      },
      deleteDraft: (id) =>
        set({
          drafts: get().drafts.filter((draft) => draft.id !== id),
        }),
      newResume: () => set({ resume: createEmptyResume() }),
    }),
    {
      name: "resume-maker-store",
      skipHydration: true,
      merge: (persisted, current) => {
        const state = persisted as Partial<ResumeStore> | undefined;
        return {
          ...current,
          ...state,
          resume: normalizeResume(state?.resume ?? current.resume),
          drafts: (state?.drafts ?? current.drafts).map(normalizeResume),
        };
      },
    },
  ),
);
