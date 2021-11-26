import React, { useState, useRef } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function App() {
  const [todo, setTodo] = useState({ kuvaus: "", pvm: "", tarkeys: "" });
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const columns = [
    {
      flex: 1,
      headerName: "Description",
      field: "kuvaus",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      flex: 1,
      headerName: "Date",
      field: "pvm",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      flex: 1,
      headerName: "Priority",
      field: "tarkeys",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Select row first");
    }
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
        <button onClick={deleteTodo}>Delete</button>
      </div>
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "80%",
          margin: "auto",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows="true"
        ></AgGridReact>
      </div>
    </div>
  );
}

export default App;
