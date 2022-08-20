const { Router } = require('express');
const axios = require("axios")
const {Country, Activity} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

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

router.post("/activities", async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body;
    
    try {
        const activityCreate = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
    
        const findActivity = await Country.findAll({
            where: {
                id: countryId,
            }
        });

        activityCreate.addCountries(findActivity);
        res.status(200).json("La actividad ha sido creada correctamente.")
    } catch (error) {
        res.status(400).json({error: "Error al crear la actividad indicada."})
    }
});


module.exports = router;