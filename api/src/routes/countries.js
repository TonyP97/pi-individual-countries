const { Router } = require("express");
const axios = require("axios");
const { Activity, Country } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// [ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

const getApiInfo = async () => {
    try {
        let api = (await axios.get("https://restcountries.com/v3.1/all"));
        api = await api.data.map((c) => 
            Country.findOrCreate({
            where: {
                id: c.cca3,
                name: c.translations.spa.official,
                flags: c.flags.png,
                continents: c.continents[0],
                capital: c.capital != null ? c.capital[0] : "No data", 
                subregion: c.subregion != null ? c.subregion : "No data",
                area: c.area,
                population: c.population,
            }
        }))
        console.log("Base de datos cargada correctamente")
    } catch (error) {
        console.log(error)
    }   
};

getApiInfo();


router.get('/countries', async (req, res) => {
   const name = req.query.name // esto es por si me pasan el nombre por query
   let countriesTotal = await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes: [],
            }
        }
    });
   if(name){
    let countryName = await countriesTotal.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    countryName.length ? // encontraste algo?
    res.status(200).send(countryName) : // si enconraste manda esto
    res.status(404).send("No se encontró el país.")
   }
   else { // si no hay query
    res.status(200).send(countriesTotal)
   }
});

// [ ] GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

router.get("/countries/:id", async (req, res) =>{
    const { id } = req.params;
    const totalCountries = await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes: [],
            }
        }
    });
    if(id){
        let countriesID = await totalCountries.filter( c => c.id.toLowerCase() === id.toLowerCase())
        countriesID.length ? // encontraste algo?
        res.status(200).json(countriesID) : // si encontraste manda esto
        res.status(404).send('No se encontró el país')
    }
    })

// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

module.exports = router;