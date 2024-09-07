import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Rocket from './assets/icon7.svg';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(true)
  const [content, setcontent] = useState("Hide finished Todos")

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos);
    }

  }, [])

  // Function That will toggle thhe display of todos
  const todosToggler = () => {
    if (todos.length > 0)
      showTodos ? setcontent("Show Finished Todos") : setcontent("Hide Finished Todos");
    setShowTodos(!showTodos);
  }


  // Function that will save all todos in the local storage
  const TOLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Function that will handle any Update user want to do on todo
  const handleEdit = (e, id) => {
    let t = todos.filter(i => { return i.id === id })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    TOLS();
  }

  // Function that will handle any Delete user want to do on todo
  const handleDelete = (e, id) => {
    const permission = confirm("Do you really want to delete this todo");
    if (permission) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos);
      TOLS();
    }
  }

  // Function that will handle any Addition user want to do on todo
  const handleAdd = () => {
    if (todo === "") {
      const confirmation = confirm("Do you really want to add an empty Todo?");
      if (confirmation) {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        TOLS();
      }
      else {

      }
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
      TOLS();
    }
  }

  // Function that will handle the input problem
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  // Function that will handle any Delete user want to do on todo
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    TOLS();
  }

  return (
    <>

      <div className="bg-violet-400 h-[100vh] pt-2">
        <div className="logo items-center justify-center flex flex-col">
          <h1 className='text-center text-violet-800 font-bold italic text-6xl '>Tasker</h1>
          <div className='w-40  h-1 bg-violet-800 '></div>
        </div>

        {/* UI of TODO App */}
        <div className="mx-5 px-5 pt-1 mt-1 rounded-xl bg-violet-300 min-h-[85vh]">

          {/* Adding a new Todo part */}
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold text-center">Add a Todo</h2>
            <div className="flex items-center justify-center">
              <input placeholder='Write your todo' type="text" className='w-1/2 rounded-lg border border-violet-400 outline-none p-1' onChange={handleChange} value={todo} />
              <button onClick={handleAdd} className='text-white bg-violet-800 hover:bg-violet-950 font-bold py-1 px-8 text-md rounded-md mx-6'>Save</button>
            </div>
          </div>
          {/* Saved Todos Part */}

          {/* Shows finished todos */}
          <div className="flex items-center gap-2">
            <input className='' type="checkbox" onChange={todosToggler} checked={showTodos} name="" id="" />
            <span className='text-xs font-extrabold'>{content}</span>
          </div>
          <h2 className="text-5xl text-center font-bold">Your Todos</h2>

          <div className="todos p-5 overflow-y-scroll max-h-[58vh]">

            {/* Dispaly When Todos Are Blank */}
            {todos.length === 0 && <div className='flex items-center justify-center'>
              <img className='w-36 h-64' src={Rocket} alt="img" />
              <p className="text-violet-800 font-bold text-xl  ">Ooooops No Todos Left - You Have Finish All</p>
            </div>}

            {/* displaying and working on saved todos */}

            {todos.map(item => {
              return (showTodos || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-2 border border-1 border-violet-300 p-1">

                {/* Handling check boxes */}
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                <div className="buttons">

                  {/* Handling Edit Button */}
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='text-white bg-violet-800 hover:bg-violet-950 font-bold py-1 px-2 text-sm rounded-md mx-1'>Edit</button>

                  {/* Handling Delete button */}
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='text-white bg-violet-800 hover:bg-violet-950 font-bold py-1 px-2 text-sm rounded-md mx-1'>Delete</button>
                </div>
              </div>
            })}

          </div>
        </div>


      </div>
    </>
  )
}

export default App
