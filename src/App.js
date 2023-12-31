import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Campuses from "./features/campuses/Campuses";
import Students from "./features/students/Students";
import AddCampus from "./features/campuses/AddCampus";
import SingleCampusPage from "./features/campuses/SingleCampusPage";
import SingleStudentPage from "./features/students/SingleStudentPage";
import EditCampusPage from "./features/campuses/EditCampusPage";
import EditStudentPage from "./features/students/EditStudentPage";
import AddStudent from "./features/students/AddStudent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Martel", serif',
    h1: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h2: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h3: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h4: {
      fontFamily: '"Source Code Pro", monospace',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campuses" element={<Campuses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add-campus" element={<AddCampus />} />
            <Route path="/campuses/:id" element={<SingleCampusPage />} />
            <Route path="/campuses/:id/edit" element={<EditCampusPage />} />
            <Route path="/students/:id" element={<SingleStudentPage />} />
            <Route path="/students/:id/edit" element={<EditStudentPage />} />
            <Route path="/add-student" element={<AddStudent />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
