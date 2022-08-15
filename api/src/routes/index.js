const { Router } = require('express');
const axios = require("axios")
// traigo las tablas
const { Activity, Country, country_activity } = require("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Activities = require("./activities.js")
const Countries = require("./countries.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", Activities)
router.use("/", Countries)


module.exports = router;
