import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { legacy_createStore } from 'redux'


const UPDATE_TODO = "UPDATE_TODO"
const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS"
const DELETE_TODO = "DELETE_TODO"

//action creator 

const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo
})

const updateTodoStatus = (id,status) => ({
  type: UPDATE_TODO_STATUS,
  payload: {id,status}
})

const deleteTodo = (id)=>({
  type:  DELETE_TODO,
  payload : id
})
function todoReducer(state = [], {type, payload}) {
  switch(type) {
    case UPDATE_TODO:
    return [...state, payload]
    case UPDATE_TODO_STATUS:
      return state.map(todo=>todo.id === payload.id ? {...todo, status: payload.status}: todo)
    case DELETE_TODO:
      return state.filter(todo=>todo.id !== payload)
    default :
    return state;
  }
}

export const store = legacy_createStore(todoReducer)


function App() {
  const todos = useSelector((state)=>state)
 // const [render, setRender] = useState(0)
  const [todo, setTodo] = useState("")

  const dispatch = useDispatch()

  
  const handleAddTodo = () => {
    const newTodo = { title: todo, status: false, id: Math.random().toString() }
    dispatch(updateTodo(newTodo))
    setTodo("")
  }

  const handleUpdateStatus = (id, status) => {
    dispatch(updateTodoStatus(id, status))
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  return (
    <>
      <pre>
        {JSON.stringify(todos)}
      </pre>
      <div className="main-todo">
        <input type="text"  vaule={todo} onChange={(e)=>setTodo(e.target.value)}/> 
        <button onClick={handleAddTodo}>Add todo</button>

        <div className="id-status">
          {todos.map((todo)=>(
            <div key={todo.id}>
               <input type="checkbox" checked={todo.status} onChange={(e)=>handleUpdateStatus(todo.id, e.target.checked)}/>
              <span>{todo.title}</span>
              <button onClick={()=>handleDeleteTodo(todo.id)}>DELETE</button>
            </div>
           
          ))}
        </div>
        
       
      
      </div>
    </>
  )
}

export default App
