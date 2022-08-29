import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import ActivityDetail from "./ActivityDetailCard"
import "./Detail.css"

// Ruta de detalle de país: debe contener

// [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// [ ] Código de país de 3 letras (id)
// [ ] Capital
// [ ] Subregión
// [ ] Área (Mostrarla en km2 o millones de km2)
// [ ] Población
// [ ] Actividades turísticas con toda su información asociada

export default function Detail(props){
    // console.log(props)
    const dispatch = useDispatch();
    const id = props.match.params.id // asi accedo al pais que matchea con el ID que debe mostrar

    useEffect(() => {
        dispatch(getDetail(id)) // de esta forma accedo al id de ese detalle
    }, [dispatch, id])

    const myCountry = useSelector((state) => state.detail) // accedo al estado del detail del país solicitado

    return(
        <div className="contenedorDetail">
            {
                myCountry.length? // si encontro el detalle del país solicitado, lo muestro
                <div className="detalle">
                    <img src={myCountry[0].flags} alt="Not found" className="imagen"/>
                    <h2>País: {myCountry[0].name}</h2>
                    <h3>{myCountry[0].id}</h3>
                    <h3>Continente: {myCountry[0].continents}</h3>
                    <h4>Capital: {myCountry[0].capital}</h4>
                    <h5>Subregión: {myCountry[0].subregion}</h5>
                    <p>Área: {myCountry[0].area}km2</p>
                    <p>Población: {myCountry[0].population}</p>
                    <h5>Actividades turísticas: {myCountry[0].activities.length? myCountry[0].activities.map(el => `||-${el.name} -Dificultad:${el.difficulty} -Duración:${el.duration} -Estación:${el.season}|| `) : "Ninguna por el momento"} </h5>
                </div> 
                : <p>Loading...</p> // sino muestro un Loading...
                
            }
                
                {/* <div>
                {
                myCountry.activities.map(el => {
                    return (
                        <div>
                            <ActivityDetail name={el.name} id={el.id} difficulty={el.difficulty} duration={el.duration} season={el.season}></ActivityDetail>
                        </div>
                    )
                    })
                }
                </div> */}
            

            <div>
                <Link to= "/home">
                    <button className="botonVolverDetail">Volver</button> 
                </Link>
            </div>
        </div>
    )
}