import { useEffect, useState } from "react"
import Card from "./card"
import '../css/card.css'
import {BsBoxArrowLeft} from 'react-icons/bs'

export default function Filters(){

    const [name,setName] = useState('')
    const [species,setSpecies] = useState('')
    const [gender,setGender] = useState('')
    const [status,setStatus] = useState('')
    const [page,setPage] = useState(1)

    const [maxPages,setMaxPages] = useState()
    const [lista,setLista] = useState([])

    useEffect(() => {

        const urlPage = window.location.href.split('5173')

        const handleFilter = () => {
            let URL = ''

            if (urlPage[1] === '/') {
                URL = 'https://rickandmortyapi.com/api/character'
                fetchAPI(URL)
            }
        }
        handleFilter()
    },[name, species, gender, status, page])

    async function fetchAPI(URL) {
        const response = await fetch(`${URL}/?page=${page}&name=${name}&species=${species}&gender=${gender}&status=${status}`)
        const data = await response.json()
        const novaLista = data.results

        setLista(novaLista)
        setMaxPages(data.info.pages)

    }

    return (
        <main className="mains">
        <div className="filterContainer">
            <input type="text"  placeholder="Filter by name" value={name} onChange={(e) => setName(e.target.value)} className='name'/>

            <select className="species" value={species} onChange={(e) => setSpecies(e.target.value)}>

                <option value=''>Species</option>
                <option value='human'>human</option>
                <option value='alien'>alien</option>
                <option value='Humanoid'>Humanoid</option>
                <option value='Poopybutthole'>Poopybutthole</option>
                <option value='Mythological Creature'>Mythological Creature</option>
                <option value='Humanoid'>Humanoid</option>
            </select>

            <select className="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value=''>Gender</option>
                <option value='Female'>Female</option>
                <option value='Male'>Male</option>
                <option value='Genderless'>Genderless</option>
                <option value='unknown'>Unknown</option>
            </select>

            <select className="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value=''>Status</option>
                <option value='alive'>Alive</option>
                <option value='dead'>Dead</option>
                <option value='unknown'>Unknown</option>
            </select>
        </div>
        <Card lista={lista}/>
        <div className="navPages">
        <button onClick={() => setPage(1)}>Página 1</button>
        <button onClick={() => setPage(page-1)}>Voltar Página</button>
        <button onClick={() => setPage(page+1)}>Avançar Página</button>
        <button onClick={() => setPage(maxPages)}>Página {maxPages}</button>
        </div>
        <span style={{textAlign:'center',width:'100%',display:'inline-block',color:'#ccc',opacity:'0.8', marginBottom:'30px'}}>você está na página {page}</span>
        </main>
    )
}