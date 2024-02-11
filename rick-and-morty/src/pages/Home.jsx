import Filters from "../components/filter"
import Nav from "../components/nav"
import logo2 from '../assets/logo.svg'

export default function Home(){

    return (
        <>
        <header>
            <Nav/>
            <div className="logo">
                <img src={logo2}/>
            </div>
        </header>
        <Filters/>
        </>
    )
}