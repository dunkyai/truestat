-- Auto-generated: 50 school verdicts (ROI 63-95)
-- Generated: 2026-05-04T20:57:26.982Z

-- Step 1: Create table if not exists
CREATE TABLE IF NOT EXISTS school_verdicts (
  school_id TEXT PRIMARY KEY REFERENCES schools(id),
  verdict_text TEXT NOT NULL,
  verdict_generated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Upsert verdicts
INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166683', 'Massachusetts Institute of Technology delivers exceptional return on investment with an ROI score of 95 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $143,372 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.1, with median student debt of $14,768. A 96% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164580', 'Babson College delivers exceptional return on investment with an ROI score of 92 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $123,938 ten years after enrollment against a manageable debt-to-income ratio of 0.16, with median student debt of $20,000. A 93% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166027', 'Harvard University delivers exceptional return on investment with an ROI score of 92 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $101,817 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.14, with median student debt of $14,000. A 97% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164924', 'Boston College delivers exceptional return on investment with an ROI score of 90 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $103,937 ten years after enrollment against a manageable debt-to-income ratio of 0.18, with median student debt of $19,000. A 91% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164739', 'Bentley University delivers exceptional return on investment with an ROI score of 89 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $120,959 ten years after enrollment against a manageable debt-to-income ratio of 0.21, with median student debt of $25,023. With a 88% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('168421', 'Worcester Polytechnic Institute delivers exceptional return on investment with an ROI score of 87 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $103,470 ten years after enrollment against a debt-to-income ratio of 0.26, with median student debt of $27,000. With a 89% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166656', 'MCPHS University delivers exceptional return on investment with an ROI score of 85 out of 100, placing it among the top-tier institutions nationally. Graduates report median earnings of $125,557 ten years after enrollment against a manageable debt-to-income ratio of 0.2, with median student debt of $25,000. A 63% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('152318', 'Rose-Hulman Institute of Technology earns a strong ROI score of 84 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $101,253 ten years after enrollment against a manageable debt-to-income ratio of 0.25, with median student debt of $25,000. With a 80% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('162928', 'Johns Hopkins University earns a strong ROI score of 84 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $87,555 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.12, with median student debt of $10,250. A 94% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('168342', 'Williams College earns a strong ROI score of 84 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $88,665 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.14, with median student debt of $12,761. A 95% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('168218', 'Wellesley College earns a strong ROI score of 82 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $84,803 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.12, with median student debt of $10,000. A 91% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166407', 'Lawrence Memorial Hospital School of Nursing earns a strong ROI score of 80 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $101,466 ten years after enrollment against a manageable debt-to-income ratio of 0.2, with median student debt of $20,000. As a specialized institution in Medford, MA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('167358', 'Northeastern University earns a strong ROI score of 80 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $92,538 ten years after enrollment against a debt-to-income ratio of 0.26, with median student debt of $24,250. A 90% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('168148', 'Tufts University earns a strong ROI score of 78 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $83,214 ten years after enrollment against a manageable debt-to-income ratio of 0.2, with median student debt of $16,250. A 93% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('161004', 'Bowdoin College earns a strong ROI score of 77 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $82,735 ten years after enrollment against a manageable debt-to-income ratio of 0.22, with median student debt of $18,500. A 95% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166124', 'College of the Holy Cross earns a strong ROI score of 77 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $90,543 ten years after enrollment against a debt-to-income ratio of 0.3, with median student debt of $27,000. With a 88% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('169983', 'Kettering University earns a strong ROI score of 77 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $94,823 ten years after enrollment against a debt-to-income ratio of 0.28, with median student debt of $27,000. A 71% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('163286', 'University of Maryland-College Park earns a strong ROI score of 76 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $82,860 ten years after enrollment against a manageable debt-to-income ratio of 0.23, with median student debt of $19,000. With a 89% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164465', 'Amherst College earns a strong ROI score of 76 out of 100, reflecting solid financial outcomes for its graduates. Graduates report median earnings of $77,644 ten years after enrollment against a manageable debt-to-income ratio of 0.18, with median student debt of $13,740. A 94% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('161086', 'Colby College posts a respectable ROI score of 74 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $80,490 ten years after enrollment against a manageable debt-to-income ratio of 0.24, with median student debt of $19,157. With a 89% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('163259', 'University of Maryland Baltimore posts a respectable ROI score of 74 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $88,174 ten years after enrollment against a manageable debt-to-income ratio of 0.17, with median student debt of $15,000. As a specialized institution in Baltimore, MD, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164988', 'Boston University posts a respectable ROI score of 74 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $83,238 ten years after enrollment against a debt-to-income ratio of 0.28, with median student debt of $23,250. With a 89% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('161299', 'Maine Maritime Academy posts a respectable ROI score of 71 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $89,964 ten years after enrollment against a debt-to-income ratio of 0.3, with median student debt of $27,000. The 60% graduation rate is a notable consideration—strong post-graduation earnings may not materialize for students who don''t finish their program.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('165060', 'Signature Healthcare Brockton Hospital School of Nursing posts a respectable ROI score of 71 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $88,084 ten years after enrollment against a manageable debt-to-income ratio of 0.23, with median student debt of $20,000. As a specialized institution in Brockton, MA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('45920401', 'Unitek College - San Jose posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,550 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,700. As a specialized institution in San Jose, CA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('160977', 'Bates College posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $69,498 ten years after enrollment against a manageable debt-to-income ratio of 0.21, with median student debt of $14,275. A 90% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('163046', 'Loyola University Maryland posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $82,652 ten years after enrollment against a debt-to-income ratio of 0.33, with median student debt of $27,000. With a 80% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166692', 'Massachusetts Maritime Academy posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $82,392 ten years after enrollment against a debt-to-income ratio of 0.3, with median student debt of $25,000. With a 77% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('17395701', 'Mayo Clinic College of Medicine and Science - Florida posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,652 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,500. As a specialized institution in Jacksonville, FL, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('17395702', 'Mayo Clinic College of Medicine and Science - Arizona posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,652 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,500. As a specialized institution in Scottsdale, AZ, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('19004401', 'Clarkson University Capital Region Campus posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $89,696 ten years after enrollment against a debt-to-income ratio of 0.29, with median student debt of $26,000. As a specialized institution in Schenectady, NY, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('45920402', 'Unitek College - Sacramento posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,550 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,700. As a specialized institution in Sacramento, CA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('45920403', 'Unitek College - Concord posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,550 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,700. As a specialized institution in Concord, CA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('45920404', 'Unitek College - Bakersfield posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,550 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,700. As a specialized institution in Bakersfield, CA, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('45920405', 'Unitek College - Reno posts a respectable ROI score of 70 out of 100, offering above-average value relative to its cost. Graduates report median earnings of $79,550 ten years after enrollment against an exceptionally low debt-to-income ratio of 0.13, with median student debt of $10,700. As a specialized institution in Reno, NV, it channels graduates into high-demand career paths that support its strong earnings outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('168227', 'Wentworth Institute of Technology posts a moderate ROI score of 69 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $82,721 ten years after enrollment against a debt-to-income ratio of 0.3, with median student debt of $25,028. A 68% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('161022', 'Maine College of Health Professions posts a moderate ROI score of 68 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $79,840 ten years after enrollment against a manageable debt-to-income ratio of 0.19, with median student debt of $15,250. As a specialized institution in Lewiston, ME, it provides focused career preparation, though prospective students should research program-specific outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('162061', 'Capitol Technology University posts a moderate ROI score of 68 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $85,035 ten years after enrollment against a manageable debt-to-income ratio of 0.24, with median student debt of $20,264. The 44% graduation rate is a notable consideration—strong post-graduation earnings may not materialize for students who don''t finish their program.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('165015', 'Brandeis University posts a moderate ROI score of 68 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $77,231 ten years after enrollment against a debt-to-income ratio of 0.33, with median student debt of $25,648. With a 86% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166869', 'MGH Institute of Health Professions posts a moderate ROI score of 68 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $87,130 ten years after enrollment against a debt-to-income ratio of 0.29, with median student debt of $24,961. As a specialized institution in Boston, MA, it provides focused career preparation, though prospective students should research program-specific outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('167996', 'Stonehill College posts a moderate ROI score of 67 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $77,745 ten years after enrollment against a debt-to-income ratio of 0.32, with median student debt of $25,000. With a 78% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('159373', 'Louisiana State University Health Sciences Center-New Orleans posts a moderate ROI score of 65 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $78,495 ten years after enrollment against a manageable debt-to-income ratio of 0.25, with median student debt of $19,500. As a specialized institution in New Orleans, LA, it provides focused career preparation, though prospective students should research program-specific outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('161208', 'The Landing School posts a moderate ROI score of 65 out of 100, offering reasonable value relative to its cost. Financial data shows median 10-year earnings of $65,849 for graduates of this private institution in Arundel, ME. A 98% graduation rate reinforces the strong likelihood of completing a degree and capturing those earnings gains.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166629', 'University of Massachusetts-Amherst posts a moderate ROI score of 65 out of 100, offering reasonable value relative to its cost. Graduates report median earnings of $71,631 ten years after enrollment against a debt-to-income ratio of 0.32, with median student debt of $22,763. With a 83% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('158325', 'Baton Rouge General Medical Center School of Nursing & School of Radiologic Technology records an ROI score of 64 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $75,071 ten years after enrollment against a manageable debt-to-income ratio of 0.22, with median student debt of $16,750. As a specialized institution in Baton Rouge, LA, it provides focused career preparation, though prospective students should research program-specific outcomes.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('153269', 'Drake University records an ROI score of 63 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $71,901 ten years after enrollment against a debt-to-income ratio of 0.32, with median student debt of $23,000. With a 76% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('163268', 'University of Maryland-Baltimore County records an ROI score of 63 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $69,960 ten years after enrollment against a debt-to-income ratio of 0.28, with median student debt of $19,500. A 70% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('164562', 'Assumption University records an ROI score of 63 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $74,895 ten years after enrollment against an elevated debt-to-income ratio of 0.36, with median student debt of $27,000. A 75% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('166850', 'Merrimack College records an ROI score of 63 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $75,584 ten years after enrollment against an elevated debt-to-income ratio of 0.36, with median student debt of $27,000. A 71% graduation rate means a meaningful share of students complete their degrees, though prospective applicants should weigh completion risk alongside the earnings upside.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

INSERT INTO school_verdicts (school_id, verdict_text, verdict_generated_at)
VALUES ('167835', 'Smith College records an ROI score of 63 out of 100, signaling modest financial returns compared to peer institutions. Graduates report median earnings of $64,027 ten years after enrollment against a debt-to-income ratio of 0.27, with median student debt of $17,550. With a 89% graduation rate, most enrolled students finish their programs and go on to benefit from the school''s earning potential.', NOW())
ON CONFLICT (school_id) DO UPDATE SET verdict_text = EXCLUDED.verdict_text, updated_at = NOW();

-- Step 3: Create helper function
CREATE OR REPLACE FUNCTION count_missing_verdicts()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM schools
  WHERE id NOT IN (SELECT school_id FROM school_verdicts)
  AND roi_score IS NOT NULL;
$$ LANGUAGE SQL;

