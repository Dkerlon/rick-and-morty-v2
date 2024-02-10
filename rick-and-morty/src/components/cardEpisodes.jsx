import { Link, useParams } from "react-router-dom"
export default function CardEpisodes(props){

    const lista = Array.isArray(props.lista) ? [...props.lista] : []

    return (
        <div className="cardsLocation">
                {lista && lista.map((el) => (
                <div key={el.id} className="cardLocation">
                    <div className="infoLocation">
                        <h2>{el.episode}</h2>
                        <p style={{opacity:'0.8'}}>{el.name}</p>
                        <Link className="buttonVejaMais" to={'/episodes/' + el.id}>Veja mais</Link>
                    </div>
                </div>
                ))}
            </div>
    )
}