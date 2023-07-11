import React, { useEffect, useState } from "react";

function TodoList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  function addItem() {
    if (!newItem) {
      alert("Escriba una tarea.");
      return;
    }

    const item = {
      label: newItem,
      done: false
    };

    const updatedItems = [...items, item];
    setItems(updatedItems);
    setNewItem("");
    updateTodoList(updatedItems);
  }

  function deleteItem(itemIndex) {
    if (items.length > 1) {
      const updatedItems = items.filter((_item, index) => index !== itemIndex);
      setItems(updatedItems);
      updateTodoList(updatedItems);
    } else {
      alert("Debe haber al menos una tarea en la lista.");
    }
  }

  function updateTodoList(updatedItems) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89", {
      method: "PUT",
      body: JSON.stringify(updatedItems),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        fetchTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function clearList() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89", {
      method: "DELETE"
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setItems([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchTodoList() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89")
      .then((resp) => resp.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          crearUsuario();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function crearUsuario() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setItems([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="TodoList">
      <h1>To Do List!</h1>
      <input
        type="text"
        placeholder="Add your task"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={event => {
          if (event.key === "Enter") {
            addItem();
          }
        }}
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {Array.isArray(items) &&
          items.map((item, index) => (
            <li key={index}>
              {item.label}{" "}
              <button className="delete-button" onClick={() => deleteItem(index)}>
                ❌
              </button>
            </li>
          ))}
      </ul>
      <p>Usted tiene {items.length} tarea(s) pendiente(s).</p>
      <button onClick={clearList}>Clear List</button>
    </div>
  );
}

export default TodoList;
