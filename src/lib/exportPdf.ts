import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const COLOR_FN_PREFIXES = ["color-mix(", "oklch(", "oklab(", "lab(", "lch(", "hwb(", "color("];

function colorFunctionToRgb(value: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "rgb(0, 0, 0)";

  ctx.clearRect(0, 0, 1, 1);
  try {
    ctx.fillStyle = value;
  } catch {
    return "rgb(0, 0, 0)";
  }
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  if (a === 0) return "rgba(0, 0, 0, 0)";
  if (a < 255) return `rgba(${r}, ${g}, ${b}, ${Number((a / 255).toFixed(3))})`;
  return `rgb(${r}, ${g}, ${b})`;
}

function replaceCssColorFunctions(value: string): string {
  const lower = value.toLowerCase();
  if (!COLOR_FN_PREFIXES.some((prefix) => lower.includes(prefix.slice(0, -1)))) {
    return value;
  }

  let result = "";
  let i = 0;
  while (i < value.length) {
    const slice = value.slice(i).toLowerCase();
    const prefix = COLOR_FN_PREFIXES.find((item) => slice.startsWith(item));
    if (!prefix) {
      result += value[i];
      i += 1;
      continue;
    }

    let depth = 0;
    let j = i;
    for (; j < value.length; j += 1) {
      if (value[j] === "(") depth += 1;
      if (value[j] === ")") {
        depth -= 1;
        if (depth === 0) {
          j += 1;
          break;
        }
      }
    }

    result += colorFunctionToRgb(value.slice(i, j));
    i = j;
  }

  return result;
}

function copyComputedStyles(source: HTMLElement, target: HTMLElement) {
  const computed = window.getComputedStyle(source);
  for (let i = 0; i < computed.length; i += 1) {
    const prop = computed.item(i);
    const raw = computed.getPropertyValue(prop);
    target.style.setProperty(prop, replaceCssColorFunctions(raw), computed.getPropertyPriority(prop));
  }
}

function copyTreeStyles(sourceRoot: HTMLElement, targetRoot: HTMLElement) {
  const sources = [sourceRoot, ...Array.from(sourceRoot.querySelectorAll<HTMLElement>("*"))];
  const targets = [targetRoot, ...Array.from(targetRoot.querySelectorAll<HTMLElement>("*"))];

  sources.forEach((source, index) => {
    const target = targets[index];
    if (target) copyComputedStyles(source, target);
  });
}

async function renderIsolated(element: HTMLElement) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-1400px;top:0;width:794px;height:1123px;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    iframe.remove();
    throw new Error("Не удалось создать документ для PDF");
  }

  doc.body.style.margin = "0";
  doc.body.style.background = "#ffffff";

  const clone = element.cloneNode(true) as HTMLElement;
  copyTreeStyles(element, clone);
  clone.querySelectorAll("*").forEach((node) => {
    node.removeAttribute("class");
  });
  clone.removeAttribute("class");
  doc.body.appendChild(clone);

  await document.fonts.ready;

  try {
    return await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 794,
      windowHeight: Math.max(1123, clone.scrollHeight),
    });
  } finally {
    iframe.remove();
  }
}

export async function exportElementToPdf(element: HTMLElement, filename: string) {
  const canvas = await renderIsolated(element);
  const image = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imageHeight;
  let position = 0;

  pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight;
    pdf.addPage();
    pdf.addImage(image, "PNG", 0, position, pageWidth, imageHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
