"use client";

import { ResumeDocument } from "@/components/templates/ResumeDocument";
import type { Resume } from "@/types/resume";
import { forwardRef } from "react";

export const ResumePreview = forwardRef<HTMLDivElement, { resume: Resume }>(function ResumePreview(
  { resume },
  ref,
) {
  return (
    <div className="flex justify-center overflow-auto p-4 lg:p-8">
      <div
        className="origin-top shadow-2xl"
        style={{
          width: 794,
          transform: "scale(0.82)",
          transformOrigin: "top center",
        }}
      >
        <div
          ref={ref}
          data-resume-root="true"
          className="overflow-hidden bg-white"
          style={{ width: 794, minHeight: 1123 }}
        >
          <ResumeDocument resume={resume} />
        </div>
      </div>
    </div>
  );
});
