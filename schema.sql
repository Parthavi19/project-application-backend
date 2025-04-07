DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS students;
CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO students (name, email, department) VALUES ('Ankita Sarkar', 'se22ucse030@mahindrauniversity.edu.in', 'CSE');
INSERT INTO students (name, email, department) VALUES ('Veda Sri', 'se22ucse044@mahindrauniversity.edu.in', 'CSE');
INSERT INTO students (name, email, department) VALUES ('Parthavi K', 'se22ucse196@mahindrauniversity.edu.in', 'CSE');
INSERT INTO students (name, email, department) VALUES ('Vidhita Reddy', 'se22ucse290@mahindrauniversity.edu.in', 'CSE');
INSERT INTO students (name, email, department) VALUES ('Srija Lukka', 'se22ucse315@mahindrauniversity.edu.in', 'CSE');
CREATE TABLE faculty (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO faculty (id, name, email, department) VALUES (1,'Gourav Saha', 'gourav.saha@mahindrauniversity.edu.in', 'Control Systems');
INSERT INTO faculty (name, email, department) VALUES ('Garimella Rama Murthy', 'rama.murthy@mahindrauniversity.edu.in', 'CSE');
INSERT INTO faculty (name, email, department) VALUES ('N. Raghu Kisore', 'raghukishore.neelisetti@mahindrauniversity.edu.in', 'CSE');
INSERT INTO faculty (name, email, department) VALUES ('Dipti Mishra', 'dipti.mishra@mahindrauniversity.edu.in', 'CSE');
INSERT INTO faculty (name, email, department) VALUES ('Rajesh Tavva', 'venkatarajesh.tavva@mahindrauniversity.edu.in', 'CSE');
CREATE TABLE projects (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  faculty_id INT DEFAULT NULL,
  available_slots INT DEFAULT 1,
  PRIMARY KEY (id),
  KEY faculty_id (faculty_id),
  CONSTRAINT projects_ibfk_1 FOREIGN KEY (faculty_id) REFERENCES faculty (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO projects (title, description, faculty_id, available_slots)
VALUES (
  'Machine learning approaches for designing state estimators for control systems applications',
  'A good portion of the modern control systems engineering assumes state feedback. However, in many systems, all the system states may not be known/measured and hence the need to design state estimators. Designing state estimators using mathematically rigorous techniques is tough and time consuming. This project will explore an alternative approach of designing these state estimators using machine learning approaches. First step is to generate training data by simulating the concerned systems. And, the second step is to train a machine learning model (like RNN, LSTM, GRU) using the generated data.',
  1,
  1
);
INSERT INTO projects (title, description, faculty_id, available_slots)
VALUES (
  'Innovative Sorting Algorithms',
  'In computer science, sorting algorithms is considered to be an important research topic. Also, signal processing community proposed some novel approach to sorting. This project involves research & implementation related to novel sorting algorithms based on existing ideas. Also, parallel and distributed sorting algorithms will be investigated.',
  2,
  3
);
INSERT INTO projects (title, description, faculty_id, available_slots)
VALUES (
  'Data Visualization',
  'Build a visualization tool for better interpretation of spatial data',
  3,
  4
);
INSERT INTO projects (title, description, faculty_id, available_slots)
VALUES (
  'Cardiovascular disease/ heart attack detection using retina images',
  'Cardiovascular diseases (CVDs) are one of the most prevalent causes of premature death. Early detection is crucial to prevent and address CVDs in a timely manner. Nevertheless, public health systems cannot afford to dedicate expert physicians to only deal with this data, posing the need for automated diagnosis tools that can raise alarms for patients at risk. Artificial Intelligence (AI) and, particularly, deep learning models, became a strong alternative to provide computerized pre-diagnosis for patient risk retrieval. So, it is necessary to develop a model to predict heart disease occurrence as early as possible with a higher rate of accuracy. Cardiovascular disease can be detected from the changes in the microvasculature, which is imaged from the retina. Here, Heart problems can be detected from the changes in the microvasculature, which is imaged from the retina. So, the work will consist of designing deep learning models based on CNNs or transformers that would predict heart disease with a higher rate of accuracy.',
  4,
  6
);
INSERT INTO projects (title, description, faculty_id, available_slots) VALUES (
  'Movie Semantic Search',
  'To be able to navigate movies based on meaning rather than just timestamps.',
  5,
  2
);
CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT DEFAULT NULL,
  project_id INT DEFAULT NULL,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  applied_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY student_id (student_id),
  KEY project_id (project_id),
  CONSTRAINT applications_ibfk_1 FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT applications_ibfk_2 FOREIGN KEY (project_id) REFERENCES projects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
