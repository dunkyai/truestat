import type { School } from "./types";

export function generateSchoolTitle(schoolName: string): string {
  return `${schoolName} ROI & Graduate Salary Data | TrueStat`;
}

export function generateSchoolDescription(school: School): string {
  const parts: string[] = [];

  if (school.median_earnings_10yr) {
    parts.push(`Median earnings: ${formatCurrency(school.median_earnings_10yr)}`);
  }
  if (school.median_debt) {
    parts.push(`Median debt: ${formatCurrency(school.median_debt)}`);
  }
  if (school.roi_verdict) {
    parts.push(school.roi_verdict);
  }

  const base = `${school.name} graduate outcomes.`;
  const detail = parts.length > 0 ? ` ${parts.join(". ")}.` : "";
  const full = `${base}${detail}`;

  return full.length > 155 ? full.slice(0, 152) + "..." : full;
}

export function generateMajorTitle(majorName: string): string {
  return `${majorName} Degree ROI & Salary Data | TrueStat`;
}

export function generateStateTitle(stateName: string): string {
  return `Best ROI Colleges in ${stateName} | TrueStat`;
}

export function formatCurrency(amount: number): string {
  return "$" + amount.toLocaleString("en-US");
}

export function formatPercent(rate: number): string {
  return (rate * 100).toFixed(1) + "%";
}
