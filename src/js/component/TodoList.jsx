import React, { useEffect, useState } from "react";

function TodoList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  var option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  } 

  useEffect (()=>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89", option)
    .then((resp)=>resp.json())
    .then((data)=>{
      setItems(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteItem(id) {
    let updatedItems = []
    updatedItems = items.filter((task,index) => {
      if (index !==id){
        return task
      }   
    })
    console.log(updatedItems)
    setItems(updatedItems);
  }



    // Paso 3: Actualizar la lista completa de tareas en la API después de eliminar una tarea
    fetch("https://assets.breatheco.de/apis/fake/todos/user/brianmoyar89", {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function clearList() {
    // Paso 4: Eliminar toda la lista de tareas en la API y actualizar el estado local
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
        {Array.isArray(items) && items.map((item, index) => (
          <li key={index}>
            {item.label}{" "}
            <button
              className="delete-button"
              onClick={() => deleteItem(index)}  
            >
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
