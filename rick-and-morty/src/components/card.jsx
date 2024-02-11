import { Link } from "react-router-dom"
import '../css/card.css'
export default function Card(props){

    const lista = Array.isArray(props.lista) ? [...props.lista] : []

    return (
        <div className="cards">
                {lista && lista.map((el) => (
                <div key={el.id} className="card">
                    <img src={el.image} alt={el.name} />
                    <div className="info">
                        <h2>{el.name}</h2>
                        <p>{el.species}</p>
                        <Link className="buttonVejaMais" to={'/' + el.id}>Veja mais</Link>
                    </div>
                </div>
                ))}
            </div>
    )
}