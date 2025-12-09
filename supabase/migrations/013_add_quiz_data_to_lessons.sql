-- Add quiz_data column to lessons table
ALTER TABLE lessons 
ADD COLUMN quiz_data JSONB DEFAULT NULL;

-- Comment on column
COMMENT ON COLUMN lessons.quiz_data IS 'JSONB structure for quiz questions and answers: [{question, options: [], correctIndex}]';
