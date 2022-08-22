import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

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
    const allCountries = useSelector((state) => state.countries) // con use selector traeme en la constantes allCountries todo lo que esta en el estado de countries
    // ahora vamos a traer del state los countries
    useEffect(() => {
        dispatch(getCountries());
    }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries)
    }

    // renderizado
    return (
        <div>
            <Link to = "/activities"></Link>
            <h1>PI Countries</h1>
            <button onClick={e => {handleClick(e)}}>Volver a cargar los paises</button>
            
            
            <div>
                <select>
                    {/* continentes */}
                    <option value="Antarctica">Antártida</option>
                    <option value="South America">América del sur</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">África</option>
                    <option value="Europe">Europa</option>
                    <option value="North America">América del norte</option>
                    <option value="Oceania">Oceanía</option>
                </select>

                <select>
                    {/* actividad */}
                    <option value="Actividad"></option>
                </select>

                <select>
                    {/* orden alfabetico */}
                    <option value="ascalf">Ascendente en orden alfabético</option>
                    <option value="descalf">Descendente en orden alfabético</option>
                </select>

                <select>
                    {/* orden poblacional */}
                    <option value="ascpob">Ascendente por cantidad de población</option>
                    <option value="descpob">Descendente por cantidad de población</option>
                </select>

                {
                    allCountries?.map((c) => {
                        return (
                            <fragment>
                                <Link to={"/home/" + c.id}>
                                    <Card name={c.name} id={c.id} continents={c.continents} flags={c.flags}/>
                                </Link>
                            </fragment>

                    )})
                }
            </div>
        </div>
    )
}