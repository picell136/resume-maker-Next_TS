export const FONT_FAMILIES = [
  { id: "inter", label: "Inter", css: "var(--font-inter), Arial, sans-serif" },
  { id: "roboto", label: "Roboto", css: "var(--font-roboto), Arial, sans-serif" },
  { id: "open-sans", label: "Open Sans", css: "var(--font-open-sans), Arial, sans-serif" },
  { id: "pt-sans", label: "PT Sans", css: "var(--font-pt-sans), Arial, sans-serif" },
  { id: "pt-serif", label: "PT Serif", css: "var(--font-pt-serif), Georgia, serif" },
  { id: "lora", label: "Lora", css: "var(--font-lora), Georgia, serif" },
  { id: "merriweather", label: "Merriweather", css: "var(--font-merriweather), Georgia, serif" },
  { id: "georgia", label: "Georgia", css: "Georgia, 'Times New Roman', serif" },
  { id: "times", label: "Times New Roman", css: "'Times New Roman', Times, serif" },
  { id: "arial", label: "Arial", css: "Arial, Helvetica, sans-serif" },
  { id: "calibri", label: "Calibri", css: "Calibri, Carlito, sans-serif" },
  { id: "cambria", label: "Cambria", css: "Cambria, Georgia, serif" },
  { id: "segoe", label: "Segoe UI", css: "'Segoe UI', Tahoma, sans-serif" },
] as const;

export const FONT_STYLES = [
  { id: "regular", label: "Обычный", fontWeight: "400", fontStyle: "normal" },
  { id: "italic", label: "Курсив", fontWeight: "400", fontStyle: "italic" },
  { id: "medium", label: "Средний", fontWeight: "500", fontStyle: "normal" },
  { id: "semibold", label: "Полужирный", fontWeight: "600", fontStyle: "normal" },
  { id: "bold", label: "Жирный", fontWeight: "700", fontStyle: "normal" },
  { id: "bold-italic", label: "Жирный курсив", fontWeight: "700", fontStyle: "italic" },
] as const;

export type FontFamilyId = (typeof FONT_FAMILIES)[number]["id"];
export type FontStyleId = (typeof FONT_STYLES)[number]["id"];

export function getFontFamily(id: string) {
  return FONT_FAMILIES.find((item) => item.id === id) ?? FONT_FAMILIES[0];
}

export function getFontStyle(id: string) {
  return FONT_STYLES.find((item) => item.id === id) ?? FONT_STYLES[0];
}
