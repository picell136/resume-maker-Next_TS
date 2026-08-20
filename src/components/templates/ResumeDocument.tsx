import type { Resume } from "@/types/resume";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";

export function ResumeDocument({ resume }: { resume: Resume }) {
  if (resume.template === "modern") return <ModernTemplate resume={resume} />;
  if (resume.template === "minimal") return <MinimalTemplate resume={resume} />;
  return <ClassicTemplate resume={resume} />;
}
