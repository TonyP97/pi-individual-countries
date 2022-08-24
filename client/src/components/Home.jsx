import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, getActivities ,filterCreated, orderByName, orderByPopulation } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar países por nombre
// [ ] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera
// Nombre y codigo de 3 letras
// Continente
// [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
// [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.

export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries) // con use selector traeme en la constantes allCountries todo lo que esta en el estado de 
    const activities = useSelector((state) => state.activities)
    // ahora vamos a traer del state los countries
    // me defino estados locales
    const [currentPage, setCurrentPage] = useState(1); // arranco en la primer paginas
    const [countriesPerPage, setCountriesPerPage] = useState(10); // 10 paises por pagina
    const indexOfLastCountrie = currentPage === 1 ? currentPage * countriesPerPage : (currentPage * countriesPerPage) -1 // el indice del ultimo país va a ser la pagina actual multiplicada por los paises por pagina, si la pagina es 1 los paises por pagina van a ser 9, por eso para sacar el indice de las demás paginas se le debe restar uno, para recuperar el faltante en la primer pagina
    // const indexOfLastCountrie = currentPage * countriesPerPage 
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage; // el indice del ultimo pais menos la cantidad de paises que tengo por pagina me va a dar el indice del primer pais
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie) // esto me da los paises que se encuentran en la pagina actual
    if(currentPage === 1 && countriesPerPage === 10) {
        setCountriesPerPage(9) // 9 paises en la primer pagina
      } else if(currentPage !== 1 && countriesPerPage === 9) {
        setCountriesPerPage(10)} // 10 paises en el resto de las paginas
    // esta constante setea la pagina en el numero de pagina que se encuentra. ayuda al renderizado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const [orden, setOrden] = useState('');

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries)
    }

    function handleFilterContinent(e){
        e.preventDefault();
        dispatch(filterCountriesByContinent(e.target.value))
    } 

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))

    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    // renderizado
    return (
        <div>
            <Link to= "/"><button>Volver al landing</button></Link>
            <Link to = "/activities"><button>Crear actividad</button></Link>
            <h1>PI Countries</h1>
            <button onClick={e => {handleClick(e)}}>Volver a cargar los paises</button>
            
            
            <div>
                <select onChange={e => {handleFilterContinent(e)}}>
                    {/* continentes */}
                    <option hidden selected>Filtrar por continente</option>
                    <option value="Todos">Todos</option>
                    <option value="Antarctica">Antártida</option>
                    <option value="South America">América del sur</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">África</option>
                    <option value="Europe">Europa</option>
                    <option value="North America">América del norte</option>
                    <option value="Oceania">Oceanía</option>
                </select>

                <select onChange={e => {handleFilterCreated(e)}}>
                    {/* actividad */}
                    <option value="sin actividad" hidden selected>Filtrar por actividad turística</option>
                        {activities.map((act)=>(
                    <option value={act.name}>{act.name}</option>
                     ))}
                </select>

                <select onChange={e => {handleOrderByName(e)}}>
                    {/* orden alfabetico */}
                    <option hidden selected>Orden alfabético</option>
                    <option value="ascalf">Ascendente en orden alfabético</option>
                    <option value="descalf">Descendente en orden alfabético</option>
                </select>

                <select onChange={e => {handleOrderByPopulation(e)}}>
                    {/* orden poblacional */}
                    <option hidden selected>Orden poblacional</option>
                    <option value="ascpob">Ascendente por cantidad de población</option>
                    <option value="descpob">Descendente por cantidad de población</option>
                </select>

                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado={paginado}
                />

                <SearchBar/>

                {
                    // allCountries?.map((c) => {
                    currentCountries?.map((c) => {
                        return (
                            <Fragment>
                                <Link to={"/countries/" + c.id}>
                                    <Card name={c.name} id={c.id} continents={c.continents} flags={c.flags}/>
                                </Link>
                            </Fragment>

                    )})
                }
            </div>
        </div>
    )
}