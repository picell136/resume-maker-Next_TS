"use client";

import { useMemo, useState } from "react";
import { FilePlus2, FolderOpen, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function DraftsPanel() {
  const { drafts, saveDraft, loadDraft, deleteDraft, newResume } = useResumeStore();
  const [open, setOpen] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const sorted = useMemo(
    () => [...drafts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [drafts],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => {
          saveDraft();
          setSavedFlash(true);
          window.setTimeout(() => setSavedFlash(false), 1600);
        }}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
      >
        {savedFlash ? "Сохранено" : "Сохранить черновик"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
      >
        <FolderOpen size={16} />
        Черновики ({drafts.length})
      </button>
      <button
        type="button"
        onClick={newResume}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
      >
        <FilePlus2 size={16} />
        Новое
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Черновики</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-zinc-500 hover:text-zinc-800">
                Закрыть
              </button>
            </div>
            {sorted.length === 0 ? (
              <p className="text-sm text-zinc-500">Сохранённых черновиков пока нет.</p>
            ) : (
              <ul className="max-h-[50vh] space-y-2 overflow-auto">
                {sorted.map((draft) => (
                  <li key={draft.id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3">
                    <div>
                      <p className="font-medium">{draft.draftName || "Без названия"}</p>
                      <p className="text-xs text-zinc-500">{formatDate(draft.updatedAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          loadDraft(draft.id);
                          setOpen(false);
                        }}
                        className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white"
                      >
                        Открыть
                      </button>
                      <button type="button" onClick={() => deleteDraft(draft.id)} className="text-zinc-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
