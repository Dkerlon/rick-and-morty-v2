import CardEpisodes from "../components/cardEpisodes"
import Nav from "../components/nav"
import { useState, useEffect } from "react"
import InfoCard from "./infoCards"
import rickandmorty from  '../assets/rickandmorty.png'

export default function Locations(){
    const [name,setName] = useState('')

    const [page,setPage] = useState(1)
    const [maxPages,setMaxPages] = useState()

    const [lista,setLista] = useState([])

    async function fetchAPI(URL) {

        const response = await fetch(`${URL}/?page=${page}&name=${name}`)
        const data = await response.json()
        const novaLista = data.results

        setLista(novaLista)
        setMaxPages(data.info.pages)
        console.log(novaLista)
    }

    useEffect(() => {

        const urlPage = window.location.href.split('5173')

        const handleFilter = () => {
            let URL = ''

            if (urlPage[1] === '/episodes') {
                URL = 'https://rickandmortyapi.com/api/episode'
                fetchAPI(URL)
            }
        }
        handleFilter()
    },[name,page])
    return (
    <>
    <Nav/>
    <div className="logo">
            <img src={rickandmorty}/>
    </div>
    <div className="filterContainer">
            <input style={{width:'30%'}} type="text"  placeholder="Filter by name" value={name} onChange={(e) => setName(e.target.value)} className='name'/>
        </div>
        <CardEpisodes lista={lista}/>
        <div className="navPages">
                <button onClick={() => setPage(1)}>Página 1</button>
                <button onClick={() => setPage(page+1)}>Avançar Página</button>
                <button onClick={() => setPage(page-1)}>Voltar Página</button>
                <button onClick={() => setPage(maxPages)}>Página {maxPages}</button>
        </div>
        <InfoCard/>
        <span style={{textAlign:'center',width:'100%',display:'inline-block',color:'#ccc',opacity:'0.8', marginBottom:'30px'}}>você está na página {page}</span>
    </>
    )
}