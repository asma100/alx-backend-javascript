  export default function getStudentIdsSum(objects) {
    const sum = objects.reduce((studentIdSum, student) => studentIdSum + student.id, 0);
    return sum;
  }
