import axios from "axios";
// la logica se arma en reducers

// esta funcion obtiene los datos de todos los paises
export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    };
}

// esta funcion obtiene los datos de todas las actividades
export function getActivities(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: "GET_ACTIVITIES",
            payload: json.data
        })
    }
}

// esta funcion crea una actividad(post) en el componente ActivityCreate
export function postActivity(payload){
    return async function(dispatch){
        var json = await axios.post("http://localhost:3001/activities", payload);
        return json;
    }
}

// esta funcion obtiene un pais basandose el nombre pasado por query
export function getNameCountries(name){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

// esta funcion filtra los paises por continente
export function filterCountriesByContinent(payload){
    console.log(payload)
    return ({
        type: "FILTER_BY_CONTINENT",
        payload
    })
}

// esta funcion filtra los paises por actividades
export function filterActivityCreated(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload
    }
}

// esta funcion ordena los paises por nombre
export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

// esta funcion ordena los paises por poblacion
export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    }
}

// esta funcion obtiene los detalles de un pais basado en su id
export function getDetail (id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/countries/"+id)
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        } 
        catch(error){
            console.log(error)
        }
    }
}

// esta funcion es para el paginado
export const setCurrentPage = (payload) => {
    return {
      type: "SET_CURRENT_PAGE",
      payload,
    };
  };


// export function getDetail (id) {
//     return function (dispatch) {
//         axios.get("http://localhost:3001/countries/" + id)
//         .then ((response) => {
//             console.log(response.data)
//             return dispatch({
//                 type: "GET_DETAIL",
//                  payload: response.data
//             })
//         })
//         .catch((error) => {
//             console.error(error)
//         })
//     }
// }