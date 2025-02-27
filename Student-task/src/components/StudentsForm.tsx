import { useState } from "react";
import { API_URL } from "./config";
import axios from "axios";
import { useStudents } from "../StudentPage/StudentContextProvider";

const StudentsForm = () => {
  const { addStudent, removeStudent } = useStudents();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [itKnowledge, setItKnowledge] = useState(7);
  const [group, setGroup] = useState("TYPE 20");
  const [interests, setInterests] = useState("");

  const [formError, setFormError] = useState("");

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const ageHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAge(event.target.value);
  const surnameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSurname(event.target.value);
  const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value);
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const groupHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGroup(event.target.value);
  const itKnowledgeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setItKnowledge(Number(event.target.value));

  const interestsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterests((prevState) => {
      const checked = event.target.checked;
      const value = event.target.value;

      if (checked) {
        return [...prevState, value];
      }

      return prevState.filter((interest) => interest !== value);
    });
  };

  const formHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !surname || !email || !phone || !age) {
      return setFormError(
        "Name, surname, email, phone number, age is required"
      );
    }

    const studentData = {
      name,
      surname,
      age: Number(age),
      phone,
      email,
      itKnowledge,
      group,
      interests,
    };

    try {
      // Jei reikia pašalinti studentą
      if (removeStudent && studentData.id) {
        await removeStudent(studentData.id); // Pašaliname studentą iš API ir konteksto
      } else {
        // Jei kurti naują studentą
        const { data } = await axios.post(`${API_URL}/students`, studentData);
        addStudent(data); // Pridedame studentą į kontekstą
      }
    } catch (error) {
      console.log("Error handling student", error);
      setFormError("Failed to process student. Please try again");
    }

    // try {
    //   const { data } = await axios.post(`${API_URL}/students`, studentData);
    //   addStudent(data);
    // } catch (error) {
    //   console.log("Error creating student", error);
    //   setFormError("Failed to create student. Please try again");
    // }
  };

  return (
    <form onSubmit={formHandler}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={nameHandler}
        />
      </div>

      <div className="form-control">
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          name="surname"
          id="surname"
          value={surname}
          onChange={surnameHandler}
        />
      </div>

      <div className="form-control">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={ageHandler}
        />
      </div>

      <div className="form-control">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={phoneHandler}
        />
      </div>

      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={emailHandler}
        />
      </div>

      <div className="form-control">
        <label htmlFor="it-knowledge">IT Knowledge:</label>
        <input
          type="range"
          name="person-it-knowledge"
          id="it-knowledge"
          min="1"
          max="10"
          value={itKnowledge}
          onChange={itKnowledgeHandler}
        />
        <output>{itKnowledge}</output>
      </div>

      <fieldset>
        <legend>Group:</legend>

        <div className="form-control">
          <input
            type="radio"
            name="group"
            id="group-1"
            value="TYPE 20"
            checked={group === "TYPE 20"}
            onChange={groupHandler}
          />
          <label htmlFor="group-1">TYPE 20gr.</label>
        </div>

        <div className="form-control">
          <input
            type="radio"
            name="group"
            id="group-2"
            value="TYPE 22"
            checked={group === "TYPE 22"}
            onChange={groupHandler}
          />
          <label htmlFor="group-2">TYPE 22gr.</label>
        </div>

        <div className="form-control">
          <input
            type="radio"
            name="group"
            id="group-3"
            value="TYPE 23"
            checked={group === "TYPE 23"}
            onChange={groupHandler}
          />
          <label htmlFor="group-3">TYPE 23gr.</label>
        </div>

        <div className="form-control">
          <input
            type="radio"
            name="group"
            id="group-4"
            value="TYPE 24"
            checked={group === "TYPE 24"}
            onChange={groupHandler}
          />
          <label htmlFor="group-4">TYPE 24gr.</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Interests of languages:</legend>

        <div className="form-control">
          <input
            type="checkbox"
            name="interest"
            id="interest-1"
            value="JavaScript"
            onChange={interestsHandler}
          />
          <label htmlFor="interest-1">JavaScript</label>
        </div>

        <div className="form-control">
          <input
            type="checkbox"
            name="interest"
            id="interest-2"
            value="Node.js"
            onChange={interestsHandler}
          />
          <label htmlFor="interest-2">Node.js</label>
        </div>

        <div className="form-control">
          <input
            type="checkbox"
            name="interest"
            id="interest-3"
            value="Python"
            onChange={interestsHandler}
          />
          <label htmlFor="interest-3">Python</label>
        </div>

        <div className="form-control">
          <input
            type="checkbox"
            name="interest"
            id="interest-4"
            value="PHP"
            onChange={interestsHandler}
          />
          <label htmlFor="interest-4">PHP</label>
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentsForm;
