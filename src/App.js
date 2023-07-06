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

function App() {
  return (
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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
