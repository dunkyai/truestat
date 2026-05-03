CREATE TABLE schools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  city TEXT,
  state TEXT,
  type TEXT,
  net_price_in_state INTEGER,
  net_price_out_state INTEGER,
  graduation_rate DECIMAL,
  median_earnings_6yr INTEGER,
  median_earnings_10yr INTEGER,
  median_debt INTEGER,
  debt_to_income DECIMAL,
  roi_score INTEGER,
  roi_verdict TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE majors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  median_earnings INTEGER,
  median_debt INTEGER,
  roi_score INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE school_majors (
  school_id TEXT REFERENCES schools(id),
  major_id TEXT REFERENCES majors(id),
  median_earnings INTEGER,
  median_debt INTEGER,
  roi_score INTEGER,
  PRIMARY KEY (school_id, major_id)
);

CREATE INDEX idx_schools_state ON schools(state);
CREATE INDEX idx_schools_roi ON schools(roi_score DESC);
CREATE INDEX idx_schools_slug ON schools(slug);
CREATE INDEX idx_majors_slug ON majors(slug);
CREATE INDEX idx_school_majors_school ON school_majors(school_id);
CREATE INDEX idx_school_majors_major ON school_majors(major_id);
