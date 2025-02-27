import axios from "axios";
import { use, useContext, useEffect, useState } from "react";
import { Student, useStudents } from "./StudentContextProvider";

type StudentItemProps = {
  data: Student;
};

const StudentItem: React.FC<StudentItemProps> = ({ data }) => {
  const { removeStudent } = useStudents();

  const {
    id,
    name,
    surname,
    age,
    phone,
    email,
    itKnowledge,
    group,
    interests,
  } = data;

  const [showInfo, setShowInfo] = useState(false);

  const privateInfoHandler = () => setShowInfo((prevState) => !prevState);
  const deleteHandler = () => removeStudent(id);

  return (
    <>
      <h3>
        {name} {surname}
      </h3>
      <p>Age: {age}</p>
      <p>Phone: {showInfo ? phone : "****"}</p>
      <p>Email: {showInfo ? email : "****"}</p>
      <p>IT Knowledge: {itKnowledge}</p>
      <p>Group: {group}</p>
      <p>{interests}</p>

      <button onClick={privateInfoHandler}>
        {showInfo ? "Hide Private Info" : "Show Private Info"}
      </button>
      <button onClick={deleteHandler}>Delete</button>
    </>
  );
};

export default StudentItem;
