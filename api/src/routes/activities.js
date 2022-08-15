const { Router } = require('express');
const axios = require("axios")
const {Country, Activity} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes
