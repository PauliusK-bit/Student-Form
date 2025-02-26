import { Children, createContext, ReactNode, useState } from "react";

type StudentContextType = {
  name: string;
  surname: string;
  age: number | null;
  phone: number | null;
  itKnowledge: string;
  group: string;
  interests: string[];
  setStudentInfo: (info: StudentContextType) => void;
};

type StudentContextProviderProps = {
  children: ReactNode;
};

export const StudentContext = createContext<StudentContextType>({
  name: "",
  surname: "",
  age: null,
  phone: null,
  itKnowledge: "",
  group: "",
  interests: [],
  setStudentInfo: () => {},
});

export const StudentContextProvider: React.FC<StudentContextProviderProps> = ({
  children,
}) => {
  const [studentInfo, setStudentInfo] = useState<StudentContextType>({
    name: "",
    surname: "",
    age: null,
    phone: null,
    itKnowledge: "",
    group: "",
    interests: [],
    setStudentInfo: () => {},
  });

  return (
    <StudentContext.Provider value={studentInfo}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
