const { Router } = require("express");
const axios = require("axios");
const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// [ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

// me traigo la data de la api
const data = async () => {
    const arr = await axios.get("https://restcountries.com/v3.1/all")
    return arr.data.results
}

router.get("/countries", async (req, res) =>{
    // me guardo el nombre por si se busca el país por nombre
    const name = req.query.name;
    // guardo la consulta a la api
    const allCountries = await data();
    
    try {
        // si tengo la lista llena no hago nada
        let hay = await Country.findAll()

        if(!hay.length){ 
            // si no tengo nada en mi base de datos, lo creo
            await Country.bulkCreate(allCountries.data.map((c) => {
                return {
                    cca3: c.cca3,
                    name: c.name.common.toLowerCase(),
                    flags: c.flags[0],
                    continents: c.continents,
                    capital: c.capital || ["No tiene capital"],
                    subregion: c.subregion || ["No hay subregion"],
                    area: Number(c.area),
                    population: Number(c.population),
                  };
            }))
        }
    } catch (error) {
        
    }
})

// [ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado