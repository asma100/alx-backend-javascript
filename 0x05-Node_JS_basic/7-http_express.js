const express = require('express');
const fs = require('fs');
const path = require('path');

// Helper function to count and display students
function countStudents(databasePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const content = data.trim().split('\n');
      const students = {};
      let totalStudents = 0;

      // Skip the header and parse each line
      content.slice(1).forEach((line) => {
        if (line.trim() === '') return; // Skip empty lines

        const [firstname, lastname, age, field] = line.split(',');
        if (!students[field]) students[field] = [];
        students[field].push(firstname);
        totalStudents++;
      });

      // Build the response text
      let result = `Number of students: ${totalStudents}\n`;
      for (const field in students) {
        const count = students[field].length;
        const list = students[field].join(', ');
        result += `Number of students in ${field}: ${count}. List: ${list}\n`;
      }

      resolve(result.trim()); // Trim final result to remove extra newlines
    });
  });
}

// Create an Express application
const app = express();

// Define the route for '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the route for '/students'
app.get('/students', async (req, res) => {
  const databasePath = process.argv[2];
  if (!databasePath) {
    res.status(500).send('No database provided');
    return;
  }

  res.write('This is the list of our students\n');

  try {
    const studentData = await countStudents(databasePath);
    res.end(studentData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app
module.exports = app;
