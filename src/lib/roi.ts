export interface ROIInput {
  medianEarnings10yr: number;
  medianDebt: number;
  graduationRate: number;
  netPrice: number;
}

export interface ROIResult {
  score: number;
  verdict: "Strong ROI" | "Moderate ROI" | "Poor ROI";
  verdictClass: "green" | "amber" | "red";
}

export function calculateROIScore(school: ROIInput): ROIResult {
  const { medianEarnings10yr, medianDebt, graduationRate } = school;

  const dti = medianDebt / medianEarnings10yr;
  const dtiScore = Math.max(0, Math.min(40, (1 - dti) * 40));

  const earningsPremium = (medianEarnings10yr - 35000) / 35000;
  const earningsScore = Math.max(0, Math.min(40, earningsPremium * 20));

  const gradScore = graduationRate * 20;

  const total = Math.round(dtiScore + earningsScore + gradScore);
  const score = Math.max(0, Math.min(100, total));

  let verdict: ROIResult["verdict"];
  let verdictClass: ROIResult["verdictClass"];

  if (score >= 70) {
    verdict = "Strong ROI";
    verdictClass = "green";
  } else if (score >= 50) {
    verdict = "Moderate ROI";
    verdictClass = "amber";
  } else {
    verdict = "Poor ROI";
    verdictClass = "red";
  }

  return { score, verdict, verdictClass };
}
