import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css"

export default function PageNotFound() {

return (
    <div>
        <h1 className="notFound404">404 Page Not Found</h1>
        <Link to='/home'><button className="botonVolver404">Home</button></Link>
    </div>
)

}