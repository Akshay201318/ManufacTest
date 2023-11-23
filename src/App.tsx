import React from "react";
import Table from "./components/Table";
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <Table type="Flavanoids" />
      <Table type="Gamma" />
    </div>
  );
};

export default App;
