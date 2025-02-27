import { useStudents } from "./StudentContextProvider";
import StudentItem from "./Students";

const StudentsList = () => {
  const { students } = useStudents();

  console.log(students);

  return (
    <div>
      <h2>Studentų sąrašas</h2>
      <div>
        {students.map((student, index) => (
          <StudentItem key={index} data={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
