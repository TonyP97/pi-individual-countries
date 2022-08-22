import React from "react";
import { Link } from "react-router-dom";

// Pagina inicial: deben armar una landing page con

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

export default function LandingPage() {
    return (
        <div>
            <h1>Bienvenidos</h1>
            <Link to = "/home">
                <button>Home</button>
            </Link>
        </div>
    )
}