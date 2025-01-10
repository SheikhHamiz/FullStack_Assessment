import './App.css';
import AddTodo from './components/todo/addTodo/addTodo';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import TodoList from './components/todo/todoList/todoList';
import Header from "./components/Header/Header";
import AuthProvider from './auth/authContext';
import Login from './components/login/login';
import { useAuth } from './auth/authContext';
import { Navigate } from 'react-router-dom';

function App() {
  const AuthenticatedRoute = ({children}) => {
    const {authenticated} = useAuth();
    if(authenticated)
        return children;
    return <Navigate to={"/login"} />
  }
  return (
    <Router>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route element=<Login/> path={"/login"}/>
          <Route element=<AuthenticatedRoute><TodoList/></AuthenticatedRoute> path={"/"}/>
          <Route element= <AuthenticatedRoute><AddTodo/></AuthenticatedRoute> path={"/addOrUpdate/:id"}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
