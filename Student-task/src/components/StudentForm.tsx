import React, { useState, useContext } from "react";
import { StudentContext } from "./StudentContextProvider";

const StudentForm: React.FC = () => {
  const { setStudentInfo } = useContext(StudentContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [itKnowledge, setItKnowledge] = useState(5);

  const knowledgeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setItKnowledge(Number(event.target.value));

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setStudentInfo({
      name,
      surname,
      age,
      phone,
      itKnowledge,
      group,
      interests,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setInterests((prev) =>
        checked
          ? [...prev, value]
          : prev.filter((interest) => interest !== value)
      );
    } else if (type === "radio") {
      setGroup(value);
    } else if (type === "range") {
      setItKnowledge(Number(value));
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "surname":
          setSurname(value);
          break;
        case "age":
          setAge(value === "" ? "" : Number(value));
          break;
        case "phone":
          setPhone(value === "" ? "" : Number(value));
          break;
        case "email":
          setEmail(value);
          break;
      }
    }
  };

  return (
    <form onSubmit={formHandler}>
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          id="surname"
          value={surname}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="it-knowledge">IT Knowledge</label>
        <input
          type="range"
          name="it-knowledge"
          id="it-knowledge"
          min={1}
          max={10}
          onChange={knowledgeHandler}
          value={itKnowledge}
        />
        <span>{Math.abs(itKnowledge)}</span>
      </div>
      <fieldset>
        <legend>Group:</legend>
        {["TYPE-20", "TYPE-22", "TYPE-23", "TYPE-24"].map((type, index) => (
          <div className="form-control" key={type}>
            <input
              type="radio"
              name="group"
              id={`group-${index}`}
              value={type}
              checked={group === type}
              onChange={handleChange}
            />
            <label htmlFor={`group-${index}`}>{type}gr.</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Interests of languages:</legend>
        {["JavaScript", "Node.js", "Python", "PHP"].map((lang, index) => (
          <div className="form-control" key={lang}>
            <input
              type="checkbox"
              name="interest"
              id={`interest-${index}`}
              value={lang}
              checked={interests.includes(lang)}
              onChange={handleChange}
            />
            <label htmlFor={`interest-${index}`}>{lang}</label>
          </div>
        ))}
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
