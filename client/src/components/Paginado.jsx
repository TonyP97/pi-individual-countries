import React from "react";

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allCountries/countriesPerPage) ; i++) { // redondea para arriba todos los paises sobre la cantidad de paises q quiero por pagina
        pageNumbers.push(i + 1) // para que no me muestre la página 0
    }

    return (
        <nav>
            <ul className="paginado">
                {/* si tengo este arreglo, mapealo y devolveme cada numero que te devuelva el paginado */}
                { pageNumbers && pageNumbers.map(number =>(
                    <li className="number" key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                        {/* <a onClick={() => paginado(number)}>{number}</a> */}
                    </li>
                ))}
            </ul>
        </nav>
    )
}