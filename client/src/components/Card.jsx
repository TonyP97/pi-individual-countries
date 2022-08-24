import React from "react";
import { Link } from "react-router-dom";

export default function Card ({name, id, continents, flags}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{id}</h5>
            <h4>{continents}</h4>
            <img src={flags} alt="img not found" />
        </div>
    )
}