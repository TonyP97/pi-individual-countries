import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../actions";
import "./Paginado.css"

export default function Paginado({countriesPerPage}){
    const dispatch = useDispatch();
    const { countries, page } = useSelector((state) => state);

    const pageNumbers = [] // acá me guardo los números de página
    
    // esta función cambia el número de página, lo setea usando la action importada
    const changePage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
    };

    for (let i = 0; i <= Math.trunc((countries.length /countriesPerPage)) ; i++) { // me devuelvo la parte entera del num por si salen decimales
                    pageNumbers.push(i + 1) // para que arranque en la primer página
                }

return (
    // lista de todas las páginas que permite seleccionarlas
    <div className="contenedorPaginado">
        <ul className="paginado">
            {pageNumbers?.map((page) => (
            <li key={page} className="number">
                <button className="botonPage" onClick={() => changePage(page)}>
                    {page}
                </button>
            </li>

            ))}
        </ul>
        
        {/* botonera que permite cambiar de página y muestra la pagina actual */}
        {pageNumbers.length > 0 &&(
        <div className="botoncitospage">
            <div>
                <button className="botonprimer" onClick={() => changePage(1)} disabled={page === 1}>Primera</button>
                <button className="botonatras" onClick={() => changePage(page - 1)} disabled={page === 1}>Anterior</button>
            </div>
            <span className="spannumero">
                Página {page} de {pageNumbers.length}
            </span>
            <div>
                <button className="botonsiguiente" onClick={() => changePage(page + 1)} disabled={page >= pageNumbers.length}>Siguiente</button>
                <button className="botonultima" onClick={() => changePage(pageNumbers.length)} disabled={page >= pageNumbers.length}>Última</button>
            </div>
        </div>
        )}
    </div>
)

}