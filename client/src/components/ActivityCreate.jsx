import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";

// Ruta de creación de actividad turística: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Dificultad
// Duración
// Temporada
// [ ] Posibilidad de seleccionar/agregar varios países en simultáneo
// [ ] Botón/Opción para crear una nueva actividad turística

function validate(input){
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
    else if(!input.country){
        errors.country = "Se requiere al menos un país"
    }
    return errors
}

export default function ActivityCreate(){
    const dispatch = useDispatch();
    const history = useHistory(); // esto sirve para redirigir 
    const countries = useSelector((state) => state.countries);
    const [errors, setErros] = useState({});

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErros(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    };

    function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }
    };

    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        })
        setErros(validate({
            ...input,
            [e.target.season] : e.target.value
        }))
    };

    function handleSelect(e){
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
        setErros(validate({
            ...input,
            [e.target.country] : e.target.value
        }))
    };

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
        history.push("/home") // ya se creo el personaje llevame al home
    };

    function handleDelete(e){
        setInput({
            ...input,
            country: input.country.filter(cntry => cntry !== e)
        })
    }

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    return(
        <div>
            <Link to= "/home"><button>Volver</button></Link>
            <h1>Crear actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input 
                    type="text"
                    value={input.name}
                    name= "name" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Dificultad</label>
                    <input 
                    // type="number"
                    type="text"
                    value={input.difficulty}
                    name= "difficulty" 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (
                        <p className="error">{errors.difficulty}</p>
                    )}
                </div>
                <div>
                    <label>Duración</label>
                    <input 
                    type="text"
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
                <div>
                    <label>Estación</label>
                    <select onChange={(e) => handleSelectSeason(e)}>
                        <option disabled selected>Selecciona una estación</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                    {errors.season && (
                        <p className="error">{errors.season}</p>
                    )}
                </div>
                <div>
                    {/* <label>Seleccionar paises</label> */}
                    <select onChange={(e) => handleSelect(e)}>
                        <option disabled selected>Selecciona paises</option>
                        {countries.map((c) =>(
                            <option value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    {/* <ul><li>{input.country.map(e => e + ' ,')}</li></ul> */}
                    {errors.country && (
                        <p className="error">{errors.country}</p>
                    )}
                    
                </div>   
                <div>
                <button type="submit">Crear actividad</button>
                </div>
            </form>
            {input.country.map(el => 
                <div className="divCountries">
                    <p>{el}</p>
                    <button className="botonX" onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </div>
    )
}