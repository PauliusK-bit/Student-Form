import axios from "axios";
import { API_URL } from "./config";

export const saveStudent = async (
  studentData: string,
  editingStudentId: number
) => {
  try {
    if (editingStudentId) {
      const { data } = await axios.put(
        `${API_URL}/students/${editingStudentId}`,
        studentData
      );
      return data;
    } else {
      const { data } = await axios.post(`${API_URL}/students`, studentData);
      return data;
    }
  } catch (error) {
    console.error("Error handling student", error);
    throw new Error("Failed to process student. Please try again");
  }
};
