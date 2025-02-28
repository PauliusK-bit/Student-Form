export type Student = {
  id: number;
  name: string;
  surname: string;
  age: number;
  phone: string;
  email: string;
  itKnowledge: number;
  group: string;
  interests: string[];
};

export type StudentItemProps = {
  data: Student;
};

export type StudentsContextType = {
  students: Student[];
  removeStudent: (id: number) => void;
  addStudent: (newStudent: Student) => void;
  setEditingStudent: (student: Student | null) => void;
  editingStudent: Student | null;
};
