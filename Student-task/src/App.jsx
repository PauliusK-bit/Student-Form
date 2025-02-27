import StudentsForm from "./components/StudentsForm";
import StudentsProvider from "./StudentPage/StudentContextProvider";
import StudentsList from "./StudentPage/StudentsList";

function App() {
  return (
    <StudentsProvider>
      <StudentsForm />
      <StudentsList />
    </StudentsProvider>
  );
}

export default App;
