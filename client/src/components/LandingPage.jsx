import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

// Pagina inicial: deben armar una landing page con

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="titulo">Bienvenidos</h1>
            <Link to = "/home">
                <button className="botonHome">Home</button>
            </Link>
        </div>
    )
}