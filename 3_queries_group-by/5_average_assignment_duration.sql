SELECT name as student, AVG(assignment_submissions.duration) as average_assignment_duration
FROM students
JOIN assignment_submissions ON student_id = students.id
WHERE end_date IS NULL
GROUP BY name
ORDER BY AVG(assignment_submissions.duration) DESC;