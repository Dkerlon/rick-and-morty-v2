import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Nav from "../components/nav"
import '../css/infoCard.css'
export default function InfoCard() {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
                const data = await response.json()
                setCharacter(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching character:", error)
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [id])

    return (
        <>
            <Nav />
            {loading ? (
                <p>Loading...</p>
            ) : (
                character && (
                    <div className="container">
                        <header>
                            <div className="image">
                                <img src={character.image} alt={character.name} />
                            </div>
                            <h1>{character.name}</h1>
                        </header>
                        <main>
                            <div className="information">
                                <h2>Information</h2>
                                <ul>
                                    <li>
                                        <h3>Gender</h3>
                                        <span>{character.gender}</span>
                                    </li>
                                    <li>
                                        <h3>Status</h3>
                                        <span>{character.status}</span>
                                    </li>
                                    <li>
                                        <h3>Species</h3>
                                        <span>{character.species}</span>
                                    </li>
                                    <li>
                                        <h3>Origin</h3>
                                        <span>{character.origin.name}</span>
                                    </li>
                                </ul>
                                <Link className="backLink" to='/'>Go Back</Link>
                            </div>
                            <div className="episode">
                            <h2 style={{marginBottom:'10px'}}>Episodes</h2>
                                <ul>
                                    {character.episode.map((el) => (<li key={el.id}><b>episode:</b> {el}</li>))}
                                </ul>
                            </div>
                        </main>
                    </div>
                )
            )}
        </>
    )
}
