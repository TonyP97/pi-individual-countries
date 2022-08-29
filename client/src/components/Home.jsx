import React, { Fragment } from "react";
// importo los hooks que voy a usar de react
import { useState, useEffect } from "react";
// importo los hooks de react redux
import { useDispatch, useSelector } from "react-redux";
// importo las actions
import { getCountries, filterCountriesByContinent, getActivities ,filterActivityCreated, orderByName, orderByPopulation, setCurrentPage } from "../actions";
import { Link } from "react-router-dom";
// importo los componentes
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css"

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
    // CONSTANTES
    const dispatch = useDispatch();
    // ahora vamos a traer del state los countries, las activities y las páginas
    const allCountries = useSelector((state) => state.countries) // con use selector traeme en la constantes allCountries todo lo que esta en el estado de 
    const activities = useSelector((state) => state.activities)
    const page = useSelector((state) => state.page)
    
    // constantes paginado
    const countriesPerPage = 10; // 10 paises por página
    const indexOfLastCountrie = page * countriesPerPage - 1; // el index del ultimo país, se resta 1 porque en la primer página son 9 
    const indexOfFirstCountrie = page === 1 ? indexOfLastCountrie - (countriesPerPage - 1) : indexOfLastCountrie - countriesPerPage; // si es la primer página, se muestran 9, sino 10
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie) // paises de la página actual

    const [, setOrden] = useState('');

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
    }, [dispatch])
    
    // HANDLES
    // esta funcion me recarga los paises nuevamente y además me hace un reload de la página, lo utilizo para "limpiar los filtros"
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries);
        window.location.reload();
    }
    
    // esta funcion actua sobre el div de filtros, se encarga de filtrar los continentes por nombre utilizando la funcion que trae desde las actions
    function handleFilterContinent(e){
        e.preventDefault();
        dispatch(filterCountriesByContinent(e.target.value))
    } 

    // al igual que la funcion anterior, actua sobre el div de filtros, en este caso los filtra por actividad creada
    function handlefilterActivityCreated(e){
        e.preventDefault();
        dispatch(filterActivityCreated(e.target.value))

    }

    // actua sobre el div de filtros, en este caso los filtra por nombre
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        // console.log(orden)
    }

    // actua sobre el div de filtros, los filtra por poblacion
    function handleOrderByPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    // RENDERIZADO
    return (
        <div>
            {/* BOTON VOLVER */}
            <Link to= "/"><button className="botonVolver">Volver</button></Link>
            
            {/* TÍTULO */}
            <h1>PI Countries</h1>

            {/* CREAR ACTIVIDADES */}
            <Link to = "/activities"><button className="botonCrearActividad">Crear actividad</button></Link>
            
            {/* FILTROS */}
            <div className="filtros">
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

                <select onChange={e => {handlefilterActivityCreated(e)}}>
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

                {/* LIMPIAR FILTROS */}
                <button onClick={e => {handleClick(e)}} className="botonLimpiar">Limpiar filtros</button>
            </div>
            
            {/* BUSCADOR */}
            <div className="buscador">
                <SearchBar/>
            </div>

            {/* CARTAS */}
            <div className="contenedor">
            <div className="cartas">
                {
                // allCountries?.map((c) => {
                currentCountries?.map((c) => {
                    return (
                        <Fragment>
                            <Link to={"/countries/" + c.id} className="carta">
                                <Card name={c.name} id={c.id} continents={c.continents} flags={c.flags}/>
                            </Link>
                        </Fragment>                            
                    )})
                }
            </div>
            </div>

            {/* PAGINACIÓN */}
            <div className="paginadito">
                <Paginado
                countriesPerPage={countriesPerPage}
                />
            </div>
        </div>
    )
}