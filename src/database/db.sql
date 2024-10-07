CREATE TABLE taks (
  id SERIAL PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL 
  );

  INSERT INTO taks (taskName, completed) 
  VALUES ('Task 1', FALSE), 
  ('Task 2', TRUE);

SELECT * FROM taks;