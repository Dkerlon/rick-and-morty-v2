import { Link } from "react-router-dom";
import '../css/nav.css'
import logo from '../assets/logo-min.svg'
import logo2 from '../assets/logo.svg'
export default function Nav(){

    return (
        <>
        <nav>
            <img src={logo} alt="img"/>
            <ul className="navList">
                <li><Link className="link" to='/'>Home</Link></li>
                <li><Link className="link" to='/location'>Location</Link></li>
                <li><Link className="link" to='/episodes'>Episodes</Link></li>
            </ul>  
        </nav>
        <div className="logo">
            <img src={logo2}/>
        </div>
        </>
    )
}