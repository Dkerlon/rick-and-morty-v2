import { Link, useParams } from "react-router-dom"

export default function Card(props){

    const lista = Array.isArray(props.lista) ? [...props.lista] : []

    return (
        <div className="card">
                {lista && lista.map((el) => (
                <div key={el.id}>
                    <img src={el.image} alt={el.name} />
                    <h2>{el.name}</h2>
                    <p>{el.species}</p>
                    <Link to={'/' + el.id}>Veja mais</Link>
                </div>
                ))}
            </div>
    )
}