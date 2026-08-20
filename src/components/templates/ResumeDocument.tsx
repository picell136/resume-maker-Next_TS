import type { Resume } from "@/types/resume";
import { getFontFamily, getFontStyle } from "@/lib/fonts";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";

export function ResumeDocument({ resume }: { resume: Resume }) {
  const family = getFontFamily(resume.fontFamilyId);
  const style = getFontStyle(resume.fontStyleId);
  const document =
    resume.template === "modern" ? (
      <ModernTemplate resume={resume} />
    ) : resume.template === "minimal" ? (
      <MinimalTemplate resume={resume} />
    ) : (
      <ClassicTemplate resume={resume} />
    );

  return (
    <div
      className="h-full min-h-full"
      style={{
        fontFamily: family.css,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
      }}
    >
      {document}
    </div>
  );
}
