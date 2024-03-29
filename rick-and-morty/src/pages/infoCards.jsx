import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import {BsBoxArrowLeft} from 'react-icons/bs'
import Nav from "../components/nav"
import '../css/infoCard.css'
import '../css/card.css'

export default function InfoCard() {

    const { id } = useParams()
    const [character, setCharacter] = useState(null)

    //loading = HomeInformações; Loading1 = LocationInformações; Loading2 = EpisodeInformações
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)

    //Arrays de requisições aos residentes
    const [residentsURL, setResidentsURL] = useState()
    const [residentsURLEpisode, setResidentsURLEpisode] = useState()

    const [residents, setResidents] = useState([])
    const [residentsEpisode, setResidentsEpisodes] = useState([])

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
                    setLoading2(true)
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
                    console.error("Error fetching location:", error)
                    setLoading(true)
                    setLoading1(true)
                    setLoading2(true)
                }
            } else if (urlPage[1] === `/episodes/${id}`){
                try {
                    const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
                    const data = await response.json()

                    setCharacter(data)

                    setLoading(true)
                    setLoading1(true)
                    setLoading2(false)

                    setResidentsURLEpisode(data.characters)

                    await searchResidentsEpisodes()
                    
                } catch{
                    console.error("Error fetching episode:", error)
                    setLoading(true)
                    setLoading1(true)
                    setLoading2(true)
                }
            }
        }
        fetchCharacter()
    }, [id,residents,residentsURL,residentsURLEpisode,residentsEpisode])

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

    const searchResidentsEpisodes = async () => {
        try {
            if(residentsURLEpisode) {
                const promise = residentsURLEpisode.map(async (residentsURLEpisode) => {
                    const response = await fetch(residentsURLEpisode)
                    const data = await response.json()
                    return data
                })
                const residentsData = await Promise.all(promise)
                setResidentsEpisodes(residentsData)
            }
        }catch(error) {
            console.error("Error fetching residents:", error)
        }
    }

    const renderResidents = () => {
        if (!loading1 && residents) {
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
                <Link className="backLink" to='/location' style={{margin:'30px 0'}}>Go Back <BsBoxArrowLeft/></Link>
                </>
            )
        } else if(!loading2){
    
            return (
                <>
                <h3 style={{margin:'40px 0px'}}>Residents</h3>
                <div className="cards">
                    {residentsEpisode.map((el) => (
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
                <Link className="backLink" to='/episodes' style={{margin:'30px 0'}}>Go Back <BsBoxArrowLeft/></Link>
                </>
            )
        }else {
            return <p>Loading Residents...</p>
        }
    }

    const render = (value) => {
        if (value === 1) {
            return (
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        character && (
                            <main className="container">
                                <header>
                                    <div className="image">
                                        <img src={character.image ? character.image : 'Unknown'} alt={character.name ? character.name : 'Unknown'} />
                                    </div>
                                    <h1>{character.name ? character.name : 'Unknown'}</h1>
                                </header>
                                <div style={{display:'flex'}}>
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
                                        <Link className="backLink" to='/'>Go Back <BsBoxArrowLeft/></Link>
                                    </div>
                                    {character.episode && (
                                        <div className="episode">
                                            <h2 style={{marginBottom:'10px'}}>Episodes</h2>
                                            <ul>
                                                {character.episode.map((el) => (<li key={el.id}><b>episode:</b> {el}</li>))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </main>
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
        }else if (value === 3) {
            return (
                <>
                    {loading2 ? (
                        <p>Loading...</p>
                    ) : (
                        character && (
                            <main className="container_description">
                                <h1>{character.name}</h1>
                                <div className="description">
                                    <div>
                                        <h3>Episode</h3>
                                        <br/>
                                        <span>{character.episode}</span>
                                    </div>
                                    <div>
                                        <h3>Date</h3>
                                        <br/>
                                        <span>{character.air_date}</span>
                                    </div>
                                </div>
                                {renderResidents()}
                            </main>
                        )
                    )}
                </>
            )
        }else if(value === 4){
            return <p>Carregando</p>
        }
    }

    return (
        <>
            <Nav />
            {!loading ? render(1): ''}
            {!loading1 && residents ? render(2): ''}
            {!loading2 && residentsEpisode ? render(3): ''}
            <div style={{width:'100%',textAlign:'center', margin:'240px 0px'}}>
                {loading && loading1 && loading2 ? render(4) : ''}
            </div>
        </>
    )
}
