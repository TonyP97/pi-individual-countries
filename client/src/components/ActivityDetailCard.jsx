import React from "react";

export default function ActivityDetail(name, difficulty, duration, season){
    return(
        <div className="contenedorDetailActivity">
            <div className="detalleActividad">
                <h2>Actividad: {name}</h2>
                <h2>Dificultad: {difficulty}</h2>
                <h2>Duración: {duration}</h2>
                <h2>Estación: {season}</h2>
            </div> 
        </div>
    )
}