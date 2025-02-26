import StudentContextProvider from "./components/StudentContextProvider";

import StudentPage from "./StudentPage/StudentPage";

function App() {
  return (
    <StudentContextProvider>
      <StudentPage />
    </StudentContextProvider>
  );
}

export default App;
