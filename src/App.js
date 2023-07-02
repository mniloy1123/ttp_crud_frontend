import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Campuses from './features/campuses/Campuses';
import Students from './features/students/Students';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
