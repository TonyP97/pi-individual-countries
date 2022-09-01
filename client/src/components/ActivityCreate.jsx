import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./ActivityCreate.css" 

// Ruta de creación de actividad turística: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Dificultad
// Duración
// Temporada
// [ ] Posibilidad de seleccionar/agregar varios países en simultáneo
// [ ] Botón/Opción para crear una nueva actividad turística

function validate(input){ // esta función valida, si falta algo en algun input, nos lanza un error
    let errors = [];
    if(!input.name){
        errors.name = "Se requiere un nombre de actividad"
    } 
    else if(!input.difficulty || input.difficulty > 5 || input.difficulty < 1) {
        errors.difficulty = "Se requiere un nivel de dificultad del 1 al 5"
    }
    else if(!input.duration || input.duration > 24){
        errors.duration = "La duración debe ser expresada en horas de 1 a 24"
    }
    else if(!input.season){
        errors.season = "Se requiere una estación del año"
    }
    else if(!input.country.length){
        errors.country = "Se requiere al menos un país"
    }
    return errors
}

export default function ActivityCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); // esto sirve para redirigir 
    const countries = useSelector((state) => state.countries); // traigo todo lo que esta en mi state de countries
    const [errors, setErros] = useState({});

    // declaro mi input con los diferentes campos que deben ser modificados/los campos que son requeridos por la actividad
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: []
    });

    // utilizada en nombre, duración y dificultad, esta funcion se encarga de setear en mi input el valor asignado al input
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErros(validate({ // valida que haya algo en el input
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    };

    // function handleCheck(e){
    //     if (e.target.checked){
    //         setInput({
    //             ...input,
    //             season: e.target.value
    //         })
    //     }
    // };

    // esta funcion asigna al input de season el valor de la estación del año seleccionado
    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        })
        setErros(validate({ // valida que haya algo en el input
            ...input,
            [e.target.season] : e.target.value
        }))
    };

    // esta funcion asigna al input de country, los paises que hayan sido seleccionados para adquirir la actividad turisticas
    // verifico que no se repita el pais
    function handleSelect(e){
        if(input.country.includes(e.target.value)){
            setInput({
                ...input,
            })
        } else {
            setInput({
                ...input,
                country: [...input.country, e.target.value]
            })
        }   
        setErros(validate({ // valida que haya algo en el input
            ...input,
            [e.target.country] : e.target.value
        }))
    };

    // esta funcion utiliza la función encargada de crear la actividad cuando se submitea el formulario con todos sus inputs llenos, y setea el input vación con los datos que contenga.
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postActivity(input));
        alert("Actividad creada correctamente");
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            country: [] 
        });
        history.push("/home") // ya se creo la actividad llevame al home
    };

    // esta función elimina un país seleccionado para adquirir la actividad
    function handleDelete(e){
        setInput({
            ...input,
            country: input.country.filter(cntry => cntry !== e)
        })
    }

    // para que al actualizar la página se cargue la lista de países en el select
    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])


    return(
        <div key="contenedorActiviCreate">
        <div key="contenedorActivityCreate" className="contenedorActivityCreate">

            {/* BOTON VOLVER */}
            <Link to= "/home"><button className="botonVolverr">Volver</button></Link>

            {/* TITULO */}
            <h1>Crear actividad</h1>

            {/* FORMULARIO */}
            <form className="formularioCrear" onSubmit={(e) => handleSubmit(e)}>
                {/* NOMBRE */}
                <div className="nombre">
                    <label>Nombre:</label>
                    <input 
                    className="inputnombre"
                    type="text"
                    value={input.name}
                    name= "name" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                {/* <div className="dificultad">
                    <label>Dificultad</label>
                    <input 
                    type="number"
                    // type="text"
                    value={input.difficulty}
                    name= "difficulty" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (
                        <p className="error">{errors.difficulty}</p>
                    )}
                </div> */}
                {/* DIFICULTAD */}
                <div className="dificultad">
                    <label>Dificultad:</label>
                    <input 
                    className="inputrange"
                    type="range"
                    value={input.difficulty}
                    min="1"
                    max="5"
                    name= "difficulty" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (
                        <p className="error">{errors.difficulty}</p>
                    )}
                </div>
                {/* DURACIÓN */}
                <div className="duracion">
                    <label>Duración:</label>
                    <input 
                    className="inputduracion"
                    type="number"
                    min="1"
                    max="24"
                    value={input.duration}
                    name= "duration" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.duration && (
                        <p className="error">{errors.duration}</p>
                    )}
                </div>
                {/* <div>
                    <label>Estación</label>
                    <label><input 
                    type="checkbox" 
                    name="Verano"
                    value="Verano"
                    onChange={(e) => handleCheck(e)}
                    />Verano</label>
                    <label><input 
                    type="checkbox"
                    name="Otoño"
                    value="Otoño"
                    onChange={(e) => handleCheck(e)}
                    />Otoño</label>
                    <label><input 
                    type="checkbox" 
                    name="Invierno"
                    value="Invierno"
                    onChange={(e) => handleCheck(e)}
                    />Invierno</label>
                    <label><input 
                    type="checkbox" 
                    name="Primavera"
                    value="Primavera"
                    onChange={(e) => handleCheck(e)}
                    />Primavera</label>
                </div> */}
                {/* ESTACIÓN */}
                <div className="estacion">
                    <label>Estación:</label>
                    <select onChange={(e) => handleSelectSeason(e)} className="selectEstacion" defaultValue="Selecciona una estación">
                        <option value="Selecciona una estación" disabled>Selecciona una estación</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                    {errors.season && (
                        <p className="error">{errors.season}</p>
                    )}
                </div>
                {/* PAISES */}
                <div className="paises">
                    <select onChange={(e) => handleSelect(e)} className="selectPaises" defaultValue="Selecciona paises">
                        <option value="Selecciona paises" disabled>Selecciona paises</option>
                        {countries.map((c) =>(
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    {
                        errors.country && (
                        <p className="error">{errors.country}</p>
                    )}
                    
                </div>
                {/* CREAR ACTIVIDAD    */}
                <div>
                <button id="botonCrear" type="submit" className="botonCrear" disabled={!input.name || !input.difficulty || !input.duration || !input.season || !input.country.length }>Crear actividad</button>
                </div>
            </form>
            {/* PAISES SELECCIONADOS */}
            {input.country.map(el => 
                <div className="divCountries">
                    <p>{el}</p>
                    <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                </div>
                )}
        </div>
        </div>
    )
}