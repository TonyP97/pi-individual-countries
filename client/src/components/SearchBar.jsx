import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";

// este componente se renderiza en el Home.jsx y nos permite buscar paises por nombre
export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState(""); // creo un estado local donde se va a ir guardando todo lo que el usuario tipee

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name)) // llamo a la función que esta hecha para encontrar un país por nombre, pasandole el name que sera lo que el usuario haya tipeado en el input
    }

    return(
        <div>
            <input 
            type="text" 
            placeholder="Buscar..."  
            onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)} >Buscar</button>
        </div>
    )
}