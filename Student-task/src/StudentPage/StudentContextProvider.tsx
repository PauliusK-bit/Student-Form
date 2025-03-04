import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { API_URL } from "../components/config";
import { Student, StudentsContextType } from "../components/Types";
import { toast } from "react-toastify";

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }
  return context;
};

const StudentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const removeStudent = async (id: number) => {
    try {
      const { data } = await axios.delete(`${API_URL}/students/${id}`);
      console.log("Student deleted successfully", data);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      toast.error("Student was succesfully deleted");
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const addStudent = async (newStudent: Student) => {
    try {
      const { data } = await axios.post(`${API_URL}/students`, newStudent);

      setStudents((prevStudents) => [...prevStudents, data]);
      toast.success("Student was created");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await axios(`${API_URL}/students`);

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        students,
        removeStudent,
        addStudent,
        editingStudent,
        setEditingStudent,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
