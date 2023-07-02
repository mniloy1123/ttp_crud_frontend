import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Campuses from './features/campuses/Campuses';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Campuses />
    </Provider>
  );
}

export default App;
