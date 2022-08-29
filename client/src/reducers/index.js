
const initialState = {
    countries : [], // este va a ser el estado que van a modificar los filtros
    allCountries : [], // aca siempre voy a tener todos los paises para que los filtros los saquen de acá
    activities: [],
    detail: [],
    page: 1
};

function rootReducer (state= initialState, action) {
    switch(action.type){
        // en el caso de obtener los paises, recibo el estado y le paso el payload(los paises) a mis array countries y allCountries (esto sirve para utilizar los filtros luego)
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        // en el caso de obtener las actividades, paso el payload a mi array de activities    
        case "GET_ACTIVITIES":
            return{
                ...state,
                activities: action.payload
            }
        // en el caso de recibir un pais por nombre, actualizo mi array countries con ese pais especifico, mientras el resto me quedan guardados en mi otro array
        case "GET_NAME_COUNTRIES":
            return{
                ...state,
                countries: action.payload
            }
        // en el caso de filtrarlos por continente, o que me pida todos los paises, tengo guardados todos los paises en mi array allCountries. En caso de encesitar los de un continente especifico, voy a guardar los que incluyan ese continente en mi array countries, en caso de querer volver a verlos todos, solo tengo que selccionar la opcion todos.
        case "FILTER_BY_CONTINENT":
            const allCountries = state.allCountries
            // si me pide todos, devuelvo todos, sino devuelvo los que el filtro pida
            const continentFiltered = action.payload === "Todos" ? allCountries : allCountries.filter(c => c.continents === action.payload)
            return{
                ...state,
                countries: continentFiltered
            }
        // si me pide filtar por actividad y no tengo, la unica opcion es ver todos los paises. En caso de tener actividades, filtro todos los paises basandose en la actividad que desea filtar y devuelvo solo los que la incluyan
        case "FILTER_BY_ACTIVITY":
            const filter = action.payload === "sin actividad"?state.allCountries : state.allCountries.filter((c) => {
                const activities = c.activities.map((a) => a.name)
                return activities.includes(action.payload)
            })
            return{
                ...state,
                countries: filter
            }
        // si me pide filtrar por orden ascendente/descendente de nombre
        case "ORDER_BY_NAME":
            const sortedArr = action.payload === "ascalf" ? state.countries.sort((a, b) => { // esto va comparando los paises y los va posicionando a la derecha o a la izquierda dependiendo de cual encuentre primero.
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
                countries: sortedArr // actualizo mi array de countries con el array sorteado
            }
        // si me pide filtrar por orden ascendente/descendente de poblacion
        case "ORDER_BY_POPULATION":
            const populationOrder = action.payload === "ascpob" ? state.countries.sort((a, b) => { // esto va comparando los paises y los va posicionando a la derecha o a la izquierda dependiendo de cual encuentre primero.
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
                countries: populationOrder // actualizo mi array de countries con el array sorteado
            }
        // en el caso de crear una actividad solo me devuelvo el estado
        case "POST_ACTIVITY":
            return{
                ...state
            }
        // en el caso de obtener los detalles de un pais, actualizo mi array detail con los datos del pais que me pasan por id
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        // en el caso de cambiar de página, setea la página
        case "SET_CURRENT_PAGE":
        return{
            ...state,
            page: action.payload
        }
        default: 
            return state;
        
    }
};

export default rootReducer;