"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { DraftsPanel } from "@/components/editor/DraftsPanel";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { exportElementToPdf } from "@/lib/exportPdf";
import { FONT_FAMILIES, FONT_SIZES, FONT_STYLES, clampFontSize } from "@/lib/fonts";
import { formatDisplayName } from "@/lib/resume";
import { useResumeStore } from "@/store/useResumeStore";
import type { TemplateId } from "@/types/resume";

const templates: { id: TemplateId; label: string }[] = [
  { id: "classic", label: "Классический" },
  { id: "modern", label: "Современный" },
  { id: "minimal", label: "Минималистичный" },
];

export function BuilderApp() {
  const resume = useResumeStore((state) => state.resume);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const setAccentColor = useResumeStore((state) => state.setAccentColor);
  const patchResume = useResumeStore((state) => state.patchResume);
  const pageRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const result = useResumeStore.persist.rehydrate();
    Promise.resolve(result).finally(() => setReady(true));
  }, []);

  async function handleExport() {
    if (!pageRef.current) return;
    setExporting(true);
    try {
      const name = formatDisplayName(resume.personal) || resume.draftName || "resume";
      await exportElementToPdf(pageRef.current, name.replace(/\s+/g, "_"));
    } catch (error) {
      console.error(error);
      window.alert("Не удалось экспортировать PDF. Обновите страницу и попробуйте ещё раз.");
    } finally {
      setExporting(false);
    }
  }

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-zinc-500">Загрузка конструктора…</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-zinc-900">Resume Maker</p>
            <p className="text-xs text-zinc-500">Секции, превью, шаблоны, PDF и черновики</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setTemplate(template.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  resume.template === template.id
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {template.label}
              </button>
            ))}
            <label className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700">
              Шрифт
              <select
                value={resume.fontFamilyId}
                onChange={(event) => patchResume({ fontFamilyId: event.target.value })}
                className="max-w-[160px] bg-transparent text-sm outline-none"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.id} value={font.id} style={{ fontFamily: font.css }}>
                    {font.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700">
              Начертание
              <select
                value={resume.fontStyleId}
                onChange={(event) => patchResume({ fontStyleId: event.target.value })}
                className="bg-transparent text-sm outline-none"
              >
                {FONT_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700">
              Размер
              <select
                value={clampFontSize(resume.fontSize)}
                onChange={(event) => patchResume({ fontSize: Number(event.target.value) })}
                className="bg-transparent text-sm outline-none"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700">
              Цвет
              <input
                type="color"
                value={resume.accentColor}
                onChange={(event) => setAccentColor(event.target.value)}
                className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent"
              />
            </label>
            <DraftsPanel />
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              <Download size={16} />
              {exporting ? "Готовлю PDF…" : "Экспорт PDF"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[minmax(360px,460px)_1fr]">
        <div className="border-r border-zinc-200 bg-zinc-50 p-4">
          <ResumeEditor />
        </div>
        <div className="min-h-[calc(100vh-73px)] bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:18px_18px]">
          <ResumePreview ref={pageRef} resume={resume} />
        </div>
      </main>
    </div>
  );
}
