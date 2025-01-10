import './App.css';
import AddTodo from './components/todo/addTodo/addTodo';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import TodoList from './components/todo/todoList/todoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route element=<TodoList/> path={"/"}/>
        <Route element= <AddTodo/> path={"/addOrUpdate/:id"}/>
      </Routes>
    </Router>
  );
}

export default App;
