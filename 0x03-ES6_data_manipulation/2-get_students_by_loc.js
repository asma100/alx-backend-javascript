  export default  function getStudentsByLocation(objects, city) {
    return objects.filter(student => student.location === city);
  }
