import type { Resume } from "@/types/resume";
import { formatPeriod } from "@/lib/resume";

export function skillList(skills: string) {
  return skills
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function SectionTitle({
  children,
  color,
  variant = "line",
}: {
  children: string;
  color: string;
  variant?: "line" | "bar" | "plain";
}) {
  if (variant === "bar") {
    return (
      <h2
        className="mb-3 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
        style={{ background: color }}
      >
        {children}
      </h2>
    );
  }

  if (variant === "plain") {
    return (
      <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {children}
      </h2>
    );
  }

  return (
    <h2 className="mb-3 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em]">
      <span style={{ color }}>{children}</span>
      <span className="h-px flex-1" style={{ background: color, opacity: 0.35 }} />
    </h2>
  );
}

export function ExperienceBlock({
  resume,
  compact = false,
}: {
  resume: Resume;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {resume.experience.map((item) => (
        <article key={item.id}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-semibold">{item.role || "Должность"}</p>
            <p className="shrink-0 text-[11px] text-zinc-500">
              {formatPeriod(item.startDate, item.endDate, item.current)}
            </p>
          </div>
          <p className="text-[12px] text-zinc-600">
            {[item.company, item.location].filter(Boolean).join(" · ")}
          </p>
          {item.description ? (
            <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-zinc-700">
              {item.description}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function EducationBlock({ resume }: { resume: Resume }) {
  return (
    <div className="space-y-3">
      {resume.education.map((item) => (
        <article key={item.id}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-semibold">
              {[item.degree, item.field].filter(Boolean).join(", ") || "Образование"}
            </p>
            <p className="shrink-0 text-[11px] text-zinc-500">
              {formatPeriod(item.startDate, item.endDate, false)}
            </p>
          </div>
          <p className="text-[12px] text-zinc-600">{item.school}</p>
          {item.description ? (
            <p className="mt-1 text-[12px] leading-relaxed text-zinc-700">{item.description}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
