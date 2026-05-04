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

-- Agent-generated content tables

CREATE TABLE school_verdicts (
  school_id TEXT PRIMARY KEY REFERENCES schools(id),
  verdict_text TEXT NOT NULL,
  verdict_generated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE page_faqs (
  id SERIAL PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('school', 'major', 'state')),
  page_id TEXT NOT NULL,
  faqs JSONB NOT NULL,
  generated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (page_type, page_id)
);

CREATE TABLE blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  author TEXT DEFAULT 'TrueStat',
  tags TEXT[],
  source_type TEXT CHECK (source_type IN ('ranking', 'insight', 'analysis')),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_page_faqs_lookup ON page_faqs(page_type, page_id);

CREATE OR REPLACE FUNCTION count_missing_verdicts()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM schools
  WHERE id NOT IN (SELECT school_id FROM school_verdicts)
  AND roi_score IS NOT NULL;
$$ LANGUAGE SQL;
