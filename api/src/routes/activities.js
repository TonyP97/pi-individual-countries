const { Router } = require('express');
const axios = require("axios")
const {Country, Activity} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

router.get("/activities", async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: Country
        })
    } catch (error) {
        res.json({error: "No se encontraron actividades"})
    }
});

router.post("/activities", async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        const createActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
        const findActivity = await Country.findAll({
            where: {
                name: countries,
            }
        })
        createActivity.addCountries(findActivity);
        return res.send(`la actividad ${name} ha sido creada`)
    } catch (error) {
        res.json({error: "Datos invalidos"})
    }
});

module.exports = router;