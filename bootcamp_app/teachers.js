const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const askedCohort = process.argv[2]
const values = [`${askedCohort}`];

pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}; ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));