import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
    return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/addOrUpdate/-1">AddTodo</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    </header>
    );
}
export default Header;