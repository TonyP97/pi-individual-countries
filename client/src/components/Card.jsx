import React from "react";
import "./Card.css"

// CARTA DE CADA PAÍS
// recibe por parametros los datos que debe renderizas, esta carta es renderizada en el Home.jsx
export default function Card ({name, id, continents, flags}){
    return(
        <div className="cartita">
            <h4>{continents}</h4>
            <h5>{id}</h5>
            <h3>{name}</h3>
            <img src={flags} alt="img not found" />
        </div>
    )
}