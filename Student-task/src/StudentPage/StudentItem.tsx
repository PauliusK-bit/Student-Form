import axios from "axios";
import { useState } from "react";
import { useStudents } from "./StudentContextProvider";
import { StudentItemProps } from "../components/Types";
import styled from "styled-components";

const StudentCard = styled.div`
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 20px;
  max-width: 500px;
`;

const StudentItem: React.FC<StudentItemProps> = ({ data }) => {
  const { removeStudent, setEditingStudent } = useStudents();

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
  const editHandler = () => setEditingStudent(data);

  return (
    <>
      <StudentCard>
        <div className="test">
          <h3>
            {name} {surname}
          </h3>
          <p>Age: {age}</p>
          <p>Phone: {showInfo ? phone : "****"}</p>
          <p>Email: {showInfo ? email : "****"}</p>
          <p>IT Knowledge: {itKnowledge}</p>
          <p>Group: {group}</p>
          <p>{interests}</p>
        </div>

        <button onClick={privateInfoHandler}>
          {showInfo ? "Hide Private Info" : "Show Private Info"}
        </button>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={editHandler}>Edit</button>
      </StudentCard>
    </>
  );
};

export default StudentItem;
