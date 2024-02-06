import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Nav from "../components/nav"

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
                    <div>
                        <header>
                            <Link to='/'>Go Back</Link>
                            <img src={character.image} alt={character.name} />
                            <h1>{character.name}</h1>
                        </header>
                        <main>
                            <div>
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
                                    <li>
                                        <h3>Type</h3>
                                        <span>{character.type}</span>
                                    </li>
                                </ul>
                            </div>
                        </main>
                    </div>
                )
            )}
        </>
    )
}
