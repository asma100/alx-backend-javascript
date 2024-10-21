const fs = require('fs');

function countStudents(path) {
    try {
        // Read the file synchronously
        const data = fs.readFileSync(path, 'utf-8');
        const lines = data.trim().split('\n');
        
        // Ignore the header and filter out empty lines
        const students = lines.slice(1).filter(line => line.trim() !== '');

        if (students.length === 0) {
            console.log('Number of students: 0');
            return;
        }

        console.log(`Number of students: ${students.length}`);

        const fields = {};

        // Process each student
        students.forEach((student) => {
            const [firstname, , , field] = student.split(',');

            if (!fields[field]) {
                fields[field] = [];
            }
            fields[field].push(firstname);
        });

        // Log each field and corresponding students
        for (const [field, studentsList] of Object.entries(fields)) {
            console.log(`Number of students in ${field}: ${studentsList.length}. List: ${studentsList.join(', ')}`);
        }

    } catch (err) {
        // Handle error if the file cannot be read
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;