import React, { useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function App() {
  const [todo, setTodo] = useState({ kuvaus: "", pvm: "", tarkeys: "" });
  const [todos, setTodos] = useState([]);
  const columns = [
    { headerName: "Description", field: "kuvaus" },
    { headerName: "Date", field: "pvm" },
    { headerName: "Priority", field: "tarkeys" },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1 className="App-header">TODOLIST</h1>
      <div className="App-input">
        Description:
        <input
          style={{ marginRight: 10 }}
          type="text"
          value={todo.kuvaus}
          name="kuvaus"
          onChange={inputChanged}
        />
        Date:
        <input
          style={{ marginRight: 10 }}
          type="date"
          value={todo.pvm}
          name="pvm"
          onChange={inputChanged}
        />
        Priority:
        <input
          type="text"
          value={todo.tarkeys}
          name="tarkeys"
          onChange={inputChanged}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "80%",
          margin: "auto",
        }}
      >
        <AgGridReact columnDefs={columns} rowData={todos}></AgGridReact>
      </div>
    </div>
  );
}

export default App;
