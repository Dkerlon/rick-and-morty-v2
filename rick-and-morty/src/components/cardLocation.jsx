import { Link, useParams } from "react-router-dom"
import '../css/cardLocation.css'
export default function CardLocation(props){

    const lista = Array.isArray(props.lista) ? [...props.lista] : []

    return (
        <div className="cardsLocation">
                {lista && lista.map((el) => (
                <div key={el.id} className="cardLocation">
                    <div className="infoLocation">
                        <h2>{el.name}</h2>
                        <p style={{opacity:'0.8'}}>{el.type}</p>
                        <p style={{opacity:'0.8'}}>{el.dimension}</p>
                        <Link to={'/location/' + el.id}>Veja mais</Link>
                    </div>
                </div>
                ))}
            </div>
    )
}