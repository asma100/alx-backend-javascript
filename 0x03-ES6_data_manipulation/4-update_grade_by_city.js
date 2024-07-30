  export default function getStudentsByLocation(objects, city, newGrades) {
    let filteredCity = objects.filter(student => student.location === city);
    function update(student) {
        const gradeObj = newGrades.find(g => g.studentId === student.id);
        if (!gradeObj) {
            student.grade = 'N/A';
        } else {
            student.grade = gradeObj.grade;
        }
        return student;
    }
    let updatedStudents = filteredCity.map(update);
    return updatedStudents;
}
