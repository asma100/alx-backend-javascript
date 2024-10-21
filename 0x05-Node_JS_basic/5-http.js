const http = require('http');
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

// Create the HTTP server
const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const databasePath = process.argv[2];
    if (!databasePath) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('No database provided');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the list of our students\n');

    try {
      const studentData = await countStudents(databasePath);
      res.end(studentData);
    } catch (error) {
      res.statusCode = 500;
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app
module.exports = app;
