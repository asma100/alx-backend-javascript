import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(req, res) {
    const databasePath = process.argv[2]; // Get the database file path from the command-line argument
    try {
      const students = await readDatabase(databasePath);
      const fields = Object.keys(students).sort(); // Sort the fields alphabetically

      res.write('This is the list of our students\n');
      fields.forEach((field) => {
        const list = students[field].join(', ');
        res.write(`Number of students in ${field}: ${students[field].length}. List: ${list}\n`);
      });
      res.end();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major;
    const databasePath = process.argv[2];

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(databasePath);
      const list = students[major].join(', ');

      res.status(200).send(`List: ${list}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
