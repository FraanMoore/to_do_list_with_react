import "./App.css";
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";


const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [lista, setLista] = useState([])

  /* const createTodoUser = () => {
       fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore',
       {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify([])
       }).then(res => res.json())
       .then(data => console.log(data))
       .catch(error => console.log(error))
   }; */

  const getTask = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore')
      .then(res => res.json())
      .then(data => {
        if (data.length == 1 && data[0].label == " ") {
          data.splice(0, 1);
          console.log(data)
        }
        setLista(data)
      })
      .catch(error => console.log(error))
  };
  const updateTask = (newTask) => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };
  function createList() {

    fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      }).then(res => res.json())
      .then(data => {
        console.log(data);
        setLista([{ label: inputValue, done: false }]);

        setInputValue("");

        updateTask([{ label: inputValue, done: false }]);
      })
      .catch(error => console.log(error))
  }

  const deleteAll = () => {
    setLista([]);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

  }
  const deleteTask = (index) => {
    let oneDelete = [...lista];
    oneDelete.splice(index, 1);
    console.log("borrarTarea", oneDelete)
      ;
    setLista(oneDelete);
    if (oneDelete.length == 0) {
      oneDelete = [{ label: " ", done: false }]
    }
    fetch('https://assets.breatheco.de/apis/fake/todos/user/FraanMoore',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(oneDelete)
      }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };

  useEffect(() => {
    /*createTodoUser();*/
    getTask();

  }, [])

  return (

    <div className='container'
      style={{
        padding: "5%",
        border: "10%",
        background: 'url("https://static.vecteezy.com/system/resources/previews/008/508/128/original/watercolor-green-plant-free-png.png")',
        width: "50%",
      }} >

      <div className="input-group">
        <input type="text" aria-label="First name" className="form-control border border-success " placeholder='Título de mis tareas'
          style={{
            fontWeight: 'bold',
            color: "#395815",
            bordercolor: "green",
            boxshadow: "none",
            outline: "none",
          }}
        />
      </div>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="¿Qué harás hoy?" aria-label="Recipient's username" aria-describedby="button-addon2"
          style={{
            boxshadow: "none",
            outline: "none",
          }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (lista.length > 0) {
                setLista(lista.concat({ label: inputValue, done: false }));

                setInputValue("");

                updateTask(lista.concat({ label: inputValue, done: false }));

              } else {
                createList();

              }
            }
          }} />
      </div>

      <div>
        <ul >
          {
            lista.length > 0 ?
              lista.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between"
                  style={{
                    boxshadow: "none",
                    backgroundcolor: "none",
                    listStyle: "none",
                    bordercolor: "#395815",
                  }}>
                  <p>{item.label} </p>
                  <button className="btn btn-outline-success "
                    style={{
                      border: "none",
                      fontweight: "bold",
                      padding: "5px 5px",
                      fontsize: "1.2em",
                      borderradius: "10px",
                    }}
                    onClick={deleteTask}> X </button>

                </li>

              )) : <></>}
        </ul>
        {lista.length === 0 || (lista.length == 1 && lista[0].label == " ") ? <div className="alert alert-success d-flex justify-content-center" role="alert">
          No tienes tareas!
        </div> : <div> <p className='task'>{lista.length} tareas</p></div>}

        <div>
          <button className='btn btn-light' onClick={deleteAll}>Borrar todas las tareas</button>
        </div>


      </div>
    </div>
  );
}
  ;




export default App;
