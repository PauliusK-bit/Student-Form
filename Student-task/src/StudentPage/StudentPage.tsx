import { useContext } from "react";
import StudentForm from "../components/StudentForm";
import { StudentContext } from "../components/StudentContextProvider";

const StudentPage: React.FC = () => {
  const { name, surname, age, phone, itKnowledge, group, interests } =
    useContext(StudentContext);

  if (!name) {
    return (
      <>
        <StudentForm /> <p>There are no current students...</p>
      </>
    );
  }

  return (
    <div>
      <h1>Student Information</h1>
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Age: {age !== null ? age : "N/A"}</p>
      <p>Phone: {phone || "N/A"}</p>
      <p>IT Knowledge: {itKnowledge}</p>
      <p>Group: {group}</p>
      <p>Interests: {interests.length > 0 ? interests.join(", ") : "N/A"}</p>
    </div>
  );
};

export default StudentPage;
