import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Nav from "../components/nav"
import '../css/infoCard.css'
import '../css/card.css'

export default function InfoCard() {

    const { id } = useParams()
    const [character, setCharacter] = useState(null)

    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)

    const [residentsURL, setResidentsURL] = useState();
    const [residents, setResidents] = useState([]);

    const searchResidents = async () => {
        try {
            if (residentsURL) {
                const promises = residentsURL.map(async (residentUrl) => {
                    const response = await fetch(residentUrl)
                    const data = await response.json()
                    return data
                })

                const residentsData = await Promise.all(promises)
                setResidents(residentsData)

            }
        } catch (error) {
            console.error("Error fetching residents:", error)
        }
    }

    useEffect(() => {
        async function fetchCharacter() {
            const urlPage = window.location.href.split('5173')
            if (urlPage[1] === `/${id}`) {
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
                    const data = await response.json()
                    setCharacter(data)
                    setLoading(false)
                    setLoading1(true)
                } catch (error) {
                    console.error("Error fetching character:", error)
                    setLoading(true)
                    setLoading1(true)
                }
            } else if (urlPage[1] === `/location/${id}`) {
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
                    const data = await response.json()

                    setCharacter(data)
                    setLoading1(false)
                    setLoading(true)
                    setResidentsURL(data.residents)

                    await searchResidents()
                } catch (error) {
                    console.error("Error fetching character:", error)
                    setLoading(true)
                    setLoading1(true)
                }
            }
        }
        fetchCharacter()
    }, [id,residents,residentsURL])

    const renderResidents = () => {
        if (!loading1) {
            return (
                <>
                <h3 style={{margin:'40px 0px'}}>Residents</h3>
                <div className="cards">
                    {residents.map((el) => (
                        <>
                        <div key={el.id} className="card">
                            <img src={el.image} alt={el.name} />
                            <div className="info">
                                <h2>{el.name}</h2>
                                <p>{el.species}</p>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
                <Link to={'/location'} className="backLink">Go Back</Link>
                </>
            )
        } else {
            return <p>Loading Residents...</p>
        }
    };

    const render = (value) => {
        if (value === 1) {
            return (
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        character && (
                            <div className="container">
                                <header>
                                    <div className="image">
                                        <img src={character.image ? character.image : 'Unknown'} alt={character.name ? character.name : 'Unknown'} />
                                    </div>
                                    <h1>{character.name ? character.name : 'Unknown'}</h1>
                                </header>
                                <main>
                                    <div className="information">
                                        <h2>Information</h2>
                                        <ul>
                                            <li>
                                                <h3>Gender</h3>
                                                <span>{character.gender ? character.gender : 'Unknown'}</span>
                                            </li>
                                            <li>
                                                <h3>Status</h3>
                                                <span>{character.status ? character.status : 'Unknown'}</span>
                                            </li>
                                            <li>
                                                <h3>Species</h3>
                                                <span>{character.species ? character.species : 'Unknown'}</span>
                                            </li>
                                            <li>
                                                <h3>Origin</h3>
                                                <span>{character.origin ? character.origin.name : 'Unknown'}</span>
                                            </li>
                                        </ul>
                                        <Link className="backLink" to='/'>Go Back</Link>
                                    </div>
                                    {character.episode && (
                                        <div className="episode">
                                            <h2 style={{marginBottom:'10px'}}>Episodes</h2>
                                            <ul>
                                                {character.episode.map((el) => (<li key={el.id}><b>episode:</b> {el}</li>))}
                                            </ul>
                                        </div>
                                    )}
                                </main>
                            </div>
                        )
                    )}
                </>
            )
        } else if (value === 2) {
            return (
                <>
                    {loading1 ? (
                        <p>Loading...</p>
                    ) : (
                        character && (
                            <main className="container_description">
                                <h1>{character.name}</h1>
                                <div className="description">
                                    <div>
                                        <h3>Type</h3>
                                        <br/>
                                        <span>{character.type}</span>
                                    </div>
                                    <div>
                                        <h3>Dimension</h3>
                                        <br/>
                                        <span>{character.dimension}</span>
                                    </div>
                                </div>
                                {renderResidents()}
                            </main>
                        )
                    )}
                </>
            )
        }
    }

    return (
        <>
            <Nav />
            {!loading ? render(1): ''}
            {!loading1 && residents ? render(2): <p>Loading...</p>}
        </>
    )
}
