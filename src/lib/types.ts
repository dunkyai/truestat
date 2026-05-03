export interface School {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  net_price_in_state: number | null;
  net_price_out_state: number | null;
  graduation_rate: number | null;
  median_earnings_6yr: number | null;
  median_earnings_10yr: number | null;
  median_debt: number | null;
  debt_to_income: number | null;
  roi_score: number | null;
  roi_verdict: string | null;
  updated_at: string;
}

export interface Major {
  id: string;
  name: string;
  slug: string;
  median_earnings: number | null;
  median_debt: number | null;
  roi_score: number | null;
  updated_at: string;
}

export interface SchoolMajor {
  school_id: string;
  major_id: string;
  median_earnings: number | null;
  median_debt: number | null;
  roi_score: number | null;
}
