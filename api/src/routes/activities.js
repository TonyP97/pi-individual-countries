const { Router } = require('express');
// const axios = require("axios")
const {Country, Activity} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

//obtengo todas las actividades incluyendo los paises 
router.get('/activities', async (req, res) => {
    try {
       const allActivities = await Activity.findAll({
          include: Country
       })
       res.status(200).json(allActivities)
    } catch (error) {
       res.status(400).json({ error: "No se encontraron actividades" })
    }
 
 });

 // creo la actividad pasandole los datos necesarios, encuentro el país o paises a los cuales se debe asignar esa actividad y finalmente la creo
router.post("/activities", async (req, res) => {
    const { name, difficulty, duration, season, country } = req.body;
    
    try {
        const activityCreate = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
    
        const findCountry = await Country.findAll({
            where: {
                name: country,
            }
        });

        activityCreate.addCountries(findCountry); // trae el name del pais
        res.status(200).json("La actividad ha sido creada correctamente.")
    } catch (error) {
        res.status(400).json({error: "Error al crear la actividad indicada."})
    }
});


module.exports = router;