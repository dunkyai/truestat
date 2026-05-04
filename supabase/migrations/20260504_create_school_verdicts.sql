CREATE TABLE IF NOT EXISTS school_verdicts (
  school_id TEXT PRIMARY KEY REFERENCES schools(id),
  verdict_text TEXT NOT NULL,
  verdict_generated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION count_missing_verdicts()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM schools
  WHERE id NOT IN (SELECT school_id FROM school_verdicts)
  AND roi_score IS NOT NULL;
$$ LANGUAGE SQL;
