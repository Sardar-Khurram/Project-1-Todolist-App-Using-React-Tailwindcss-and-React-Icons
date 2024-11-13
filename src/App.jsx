import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Rocket from './assets/icon7.svg';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(true);
  const [content, setContent] = useState("Hide finished Todos");

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);


  const todosToggler = () => {
    if (todos.length > 0)
      showTodos ? setContent("Show Finished Todos") : setContent("Hide Finished Todos");
    setShowTodos(!showTodos);
  };

  const TOLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    TOLS();
  };

  const handleDelete = (e, id) => {
    const permission = confirm("Do you really want to delete this todo");
    if (permission) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      TOLS();
    }
  };

  const handleAdd = () => {
    if (todo === "") {
      const confirmation = confirm("Do you really want to add an empty Todo?");
      if (confirmation) {
        setTodos(prevTodos => {
          const newTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }];
          TOLS(newTodos);
          return newTodos;
        });
        setTodo("");
      }
    } else {
      setTodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }];
        TOLS(newTodos);
        return newTodos;
      });
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    TOLS();
  };

  return (
    <>
      <div className="bg-green-400 min-h-screen pt-4">
        <div className="logo items-center justify-center flex flex-col">
          <h1 className="text-center text-green-800 font-bold italic text-4xl md:text-6xl">Tasker</h1>
          <div className="w-20 md:w-40 h-1 bg-green-800"></div>
        </div>

        {/* UI of TODO App */}
        <div className="mx-2 md:mx-5 px-4 md:px-8 pt-2 mt-3 rounded-xl bg-green-300 min-h-[85vh] shadow-lg">

          {/* Adding a new Todo part */}
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold text-center">Add a Todo</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <input placeholder="Write your todo" type="text" className="w-full md:w-1/2 rounded-lg border border-green-500 outline-none p-2 mb-2 md:mb-0" onChange={handleChange} value={todo} />
              <button onClick={()=>{handleAdd()}} className="text-white bg-green-700 hover:bg-green-900 transition-all font-bold py-1 px-8 text-md rounded-md mx-2 md:mx-4">Save</button>
            </div>
          </div>

          {/* Shows finished todos */}
          <div className="flex items-center gap-2 mb-3">
            <input type="checkbox" onChange={todosToggler} checked={showTodos} />
            <span className="text-sm font-extrabold text-green-800">{content}</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-center font-bold text-green-800 mb-3">Your Todos</h2>

          <div className="todos p-4 overflow-y-scroll max-h-[58vh] bg-white rounded-lg shadow-md">
            {todos.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <img className="w-24 md:w-36 mb-2" src={Rocket} alt="img" />
                <p className="text-green-800 font-bold text-lg md:text-xl">Oops! No Todos Left - You're All Caught Up</p>
              </div>
            )}

            {todos.map(item => (
              (showTodos || !item.isCompleted) && (
                <div key={item.id} className={`todo flex gap-1 flex-col md:flex-row items-center justify-between my-2 border border-green-500 p-2 rounded-md bg-green-100 hover:bg-green-200 transition-shadow shadow-sm`}>
                  <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} />
                  <div className={`flex-1 mx-2 ${item.isCompleted ? 'line-through text-gray-500' : 'text-green-800'}`}>{item.todo}</div>
                  <div className="buttons flex flex-col gap-2 md:flex-row">
                    <button onClick={(e) => handleEdit(e, item.id)} className="text-white bg-green-600 hover:bg-green-800 transition-all font-bold py-1 px-2 text-sm rounded-md mx-1">Edit</button>
                    <button onClick={(e) => handleDelete(e, item.id)} className="text-white bg-green-600 hover:bg-green-800 transition-all font-bold py-1 px-2 text-sm rounded-md mx-1">Delete</button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
