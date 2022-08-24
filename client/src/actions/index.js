import axios from "axios";
// la logica se arma en reducers

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    };
}

export function getActivities(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: "GET_ACTIVITIES",
            payload: json.data
        })
    }
}

export function postActivity(payload){
    return async function(dispatch){
        var json = await axios.post("http://localhost:3001/activities", payload);
        return json;
    }
}

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

export function filterCountriesByContinent(payload){
    console.log(payload)
    return ({
        type: "FILTER_BY_CONTINENT",
        payload
    })
}

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    }
}

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