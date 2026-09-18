/* ==========================================================================
   MÓDULO: storage.js - Persistencia Local (LocalStorage & JSON)
   Materia: Desarrollo de Software para Plataformas Móviles (7° 5ta)
   Profesor: Axel Castellano Gutiérrez
   ========================================================================== */

const FAVORITOS_KEY = "techstore_favoritos_v1";

/**
 * TODO: Exportar función obtenerFavoritos() que lea de localStorage y devuelva array parseado.
 */
export function obtenerFavoritos() {
    // Tu código acá:
    const raw = localStorage.getItem(FAVORITOS_KEY);
    console.log("Raw de localStorage:", raw);

    const favoritos = JSON.parse(raw) ?? [];
    console.log("Array parseado:", favoritos);

    return favoritos;
}

/**
 * TODO: Exportar función esProductoFavorito(id) que retorne boolean si el id está en favoritos.
 */
export function esProductoFavorito(id) {
    // Tu código acá:
    const favoritos = obtenerFavoritos();
    const esFavorito = favoritos.includes(id);
    console.log(`¿El producto ${id} es favorito?:`, esFavorito);
    return esFavorito;
}

/**
 * TODO: Exportar función alternarFavorito(id) que agregue o quite el ID en localStorage.
 */
export function alternarFavorito(id) {
    // Tu código acá:
    let favoritos = obtenerFavoritos();

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favId => favId !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    console.log("Favoritos luego de alternar:", obtenerFavoritos());
}