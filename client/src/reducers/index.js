
const initialState = {
    countries : [], // este va a ser el estado que van a modificar los filtros
    allCountries : [], // aca siempre voy a tener todos los paises para que los filtros los saquen de acá
    activities: [],
    detail: []
};

function rootReducer (state= initialState, action) {
    switch(action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case "GET_ACTIVITIES":
            return{
                ...state,
                activities: action.payload
            }
        case "GET_NAME_COUNTRIES":
            return{
                ...state,
                countries: action.payload
            }
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            // si me pide todos, devuelvo todos, sino devuelvo los que el filtro pida
            const continentFiltered = action.payload === "Todos" ? allCountries : allCountries.filter(c => c.continents === action.payload)
            return{
                ...state,
                countries: continentFiltered
            }
        case "FILTER_CREATED":
            const filter = action.payload === "sin actividad"?state.allCountries : state.allCountries.filter((c) => {
                const activities = c.activities.map((a) => a.name)
                return activities.includes(action.payload)
            })
            return{
                ...state,
                countries: filter
            }
        case "ORDER_BY_NAME":
            const sortedArr = action.payload === "ascalf" ? state.countries.sort((a, b) => { // esto va comparando los nombres y los va posicionando a la derecha o a la izquierda dependiendo de cual encuentre primero.
                // si el valor es ascendente hace esto
                if (a.name > b.name){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0
            })  : // si el valor es descendente hace esto
            state.countries.sort((a, b) => {
                if (a.name > b.name){
                    return -1
                }
                if (b.name > a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: sortedArr
            }
        case "ORDER_BY_POPULATION":
            const populationOrder = action.payload === "ascpob" ? state.allCountries.sort((a, b) => { // esto va comparando los nombres y los va posicionando a la derecha o a la izquierda dependiendo de cual encuentre primero.
                // si el valor es ascendente hace esto
                if (b.population > a.population){
                    return 1
                }
                if (a.population > b.population){
                    return -1
                }
                return 0
            })  : // si el valor es descendente hace esto
            state.allCountries.sort((a, b) => {
                if (b.population > a.population){
                    return -1
                }
                if (a.population > b.population){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: populationOrder
            }
        case "POST_ACTIVITY":
            return{
                ...state
            }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        default: 
            return state;
        
    }
};

export default rootReducer;