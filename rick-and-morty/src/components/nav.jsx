import { Link } from "react-router-dom";
import '../css/nav.css'
import logo from '../assets/logo-min.svg'

export default function Nav(){

    return (
        <>
        <nav>
            <Link to='/'><img src={logo} alt="img"/></Link>
            <ul className="navList">
                <li><Link className="link" to='/'>Home</Link></li>
                <li><Link className="link" to='/location'>Location</Link></li>
                <li><Link className="link" to='/episodes'>Episodes</Link></li>
            </ul>  
        </nav>
        </>
    )
}