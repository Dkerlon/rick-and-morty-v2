import CardLocation from "../components/cardLocation"
import Nav from "../components/nav"
import { useState, useEffect } from "react"
import locationLogo from '../assets/locationLogo.svg'
import vector from '../assets/vector.png'


export default function Locations(){
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [dimension,setDimension] = useState('')

    const [page,setPage] = useState(1)
    const [maxPages,setMaxPages] = useState()

    const [lista,setLista] = useState([])

    async function fetchAPI(URL) {

        const response = await fetch(`${URL}/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
        const data = await response.json()
        const novaLista = data.results

        setLista(novaLista)
        setMaxPages(data.info.pages)
    }

    useEffect(() => {

        const urlPage = window.location.href.split('5173')

        const handleFilter = () => {
            let URL = ''

            if (urlPage[1] === '/location') {
                URL = 'https://rickandmortyapi.com/api/location'
                fetchAPI(URL)
            }
        }
        handleFilter()
    },[name,type,dimension,page])
    return (
    <>
    <Nav/>
    <div className="logo">
            <img src={vector}/>
    </div>
    <div className="filterContainer">
            <input type="text"  placeholder="Filter by name" value={name} onChange={(e) => setName(e.target.value)} className='name'/>

            <select className="type" value={type} onChange={(e) => setType(e.target.value)}>

                <option value=''>Type</option>
                <option value='Planet'>Planet</option>
                <option value='Cluster'>Cluster</option>
                <option value='Space station'>Space station</option>
                <option value='Diegesis'>Diegesis</option>
                <option value='Dimension'>Dimension</option>
                <option value='Mount'>Mount</option>
                <option value='Convention'>Convention</option>
                <option value='Liquid'>Liquid</option>
                <option value='Quasar'>Quasar</option>
                <option value='Quadrant'>Quadrant</option>
                <option value='Microverse'>Microverse</option>
                <option value='TV'>TV</option>
                <option value='Resort'>Resort</option>
                <option value='Post-Apocalyptic Dimension'>ResPost-Apocalyptic Dimensionort</option>
                <option value='Fantasy town'>Fantasy town</option>
                <option value='Dream'>Dream</option>
                <option value='Menagerie'>Menagerie</option>
                <option value='Game'>Game</option>
                <option value='Daycare'>Daycare</option>
                <option value='Dwarf planet (Celestial Dwarf)'>Dwarf planet (Celestial Dwarf)</option>
                <option value='Miniverse'>Miniverse</option>
                <option value='Teenyverse'>Teenyverse</option>
                <option value='Box'>Box</option>
                <option value='Spacecraft'>Spacecraft</option>
                <option value='Spa'>Spa</option>
                <option value='Arcade'>Arcade</option>
                <option value='Woods'>Woods</option>
                <option value='Non-Diegetic Alternative Reality'>Non-Diegetic Alternative Reality</option>
                <option value='Nightmare'>Nightmare</option>
                <option value='Asteroid'>Asteroid</option>
                <option value='Acid Plant'>Acid Plant</option>
                <option value='Reality'>Reality</option>
                <option value='Death Star'>Death Star</option>
                <option value='Elemental Rings'>Elemental Rings</option>
                <option value='Human'>Human</option>
                <option value='Hell'>Hell</option>
                <option value='Police Department'>Police Department</option>
                <option value='Consciousness'>Consciousness</option>
                <option value='Memory'>Memory</option>
            </select>

            <select className="dimension" value={dimension} onChange={(e) => setDimension(e.target.value)}>
                <option value=''>Dimension</option>
                <option value='Dimension C-137'>Dimension C-137</option>
                <option value='unknown'>Unknown</option>
                <option value='Post-Apocalyptic Dimension'>Post-Apocalyptic Dimension</option>
                <option value='Replacement Dimension'>Replacement Dimension</option>
                <option value='Testicle Monster Dimension'>Testicle Monster Dimension</option>
                <option value='Cromulon Dimension'>Cromulon Dimension</option>
                <option value='Dimension C-500A'>Dimension C-500A</option>
                <option value='Dimension K-83'>Dimension K-83</option>
                <option value='Dimension J19ζ7'>Dimension J19ζ7</option>
                <option value='Eric Stoltz Mask Dimension'>Eric Stoltz Mask Dimension</option>
                <option value='Giant Telepathic Spiders Dimension'>Giant Telepathic Spiders Dimension</option>
                <option value='Fantasy Dimension'>Fantasy Dimension</option>
                <option value='Dimension K-22'>Dimension K-22</option>
                <option value='Dimension D-99'>Dimension D-99</option>
                <option value='Dimension D716'>Dimension D716</option>
                <option value='Dimension D716-B'>Dimension D716-B</option>
                <option value='Dimension D716-C'>Dimension D716-C</option>
                <option value='Dimension J-22'>Dimension J-22</option>
                <option value='Dimension C-35'>Dimension C-35</option>
                <option value='Pizza Dimension'>Pizza Dimension</option>
                <option value='Phone Dimension'>Phone Dimension</option>
                <option value='Chair Dimension'>Chair Dimension</option>
                <option value='Fascist Dimension'>Fascist Dimension</option>
                <option value='Fascist Shrimp Dimension'>Fascist Shrimp Dimension</option>
                <option value='Fascist Teddy Bear Dimension'>Fascist Teddy Bear Dimension</option>
                <option value='Wasp Dimension'>Wasp Dimension</option>
                <option value='Tusk Dimension'>Tusk Dimension</option>
                <option value='Magic Dimension'>Magic Dimension</option>
            </select>
        </div>
        <CardLocation lista={lista}/>
        <div className="navPages">
                <button onClick={() => setPage(1)}>Página 1</button>
                <button onClick={() => setPage(page+1)}>Avançar Página</button>
                <button onClick={() => setPage(page-1)}>Voltar Página</button>
                <button onClick={() => setPage(maxPages)}>Página {maxPages}</button>
        </div>
    </>
    )
}