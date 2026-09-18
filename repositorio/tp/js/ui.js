/* ==========================================================================
   MÓDULO: ui.js - Renderizado Visual y Métricas del Catálogo
   Materia: Desarrollo de Software para Plataformas Móviles (7° 5ta)
   Profesor: Axel Castellano Gutiérrez
   ========================================================================== */

/**
 * TODO 1: Exportar función crearTarjetaProductoHTML(producto, esFavorito)
 * 1. Extraer con Destructuring: { id, title, price, category, thumbnail, stock } desde 'producto'.
 * 2. Retornar un Template Literal con la siguiente estructura HTML:
 *    <article class="tarjeta-producto" data-id="${id}">
 *        <div class="tarjeta-img-wrap">
 *            <img src="${thumbnail}" alt="${title}" loading="lazy" class="tarjeta-img">
 *            <span class="badge-categoria">${category}</span>
 *            <button class="btn-fav-card ${esFavorito ? 'en-favoritos' : ''}" data-id="${id}" aria-label="Guardar favorito">
 *                ${esFavorito ? '⭐' : '☆'}
 *            </button>
 *        </div>
 *        <div class="tarjeta-cuerpo">
 *            <h3 class="tarjeta-titulo">${title}</h3>
 *            <div class="tarjeta-precio-wrap">
 *                <span class="tarjeta-precio">$${price.toFixed(2)}</span>
 *                <span class="tarjeta-stock">Stock: ${stock}</span>
 *            </div>
 *        </div>
 *    </article>
 */
export function crearTarjetaProductoHTML(producto, esFavorito) {
    // Tu código acá:
    const { id, title, price, category, thumbnail, stock } = producto;
    console.log("Propiedades extraídas:", title, price);

    return `
        <article class="tarjeta-producto" data-id="${id}">
            <div class="tarjeta-img-wrap">
                <img src="${thumbnail}" alt="${title}" loading="lazy" class="tarjeta-img">
                <span class="badge-categoria">${category}</span>
                <button class="btn-fav-card ${esFavorito ? 'en-favoritos' : ''}" data-id="${id}" aria-label="Guardar favorito">
                    ${esFavorito ? '⭐' : '☆'}
                </button>
            </div>
            <div class="tarjeta-cuerpo">
                <h3 class="tarjeta-titulo">${title}</h3>
                <div class="tarjeta-precio-wrap">
                    <span class="tarjeta-precio">$${price.toFixed(2)}</span>
                    <span class="tarjeta-stock">Stock: ${stock}</span>
                </div>
            </div>
        </article>
    `;
}

/**
 * TODO: Exportar función filtrarProductos(lista, textoBusqueda, categoria, favoritosIds)
 * que filtre con .filter() por coincidencia de texto y categoría/favoritos.
 */
export function filtrarProductos(lista, textoBusqueda, categoria, favoritosIds = []) {
    // Tu código acá:
    const texto = textoBusqueda.toLowerCase().trim();

    return lista.filter(producto => {
        const coincideTexto = producto.title.toLowerCase().includes(texto);

        let coincideCategoria;
        if (categoria === "todas") {
            coincideCategoria = true;
        } else if (categoria === "favoritos") {
            coincideCategoria = favoritosIds.includes(producto.id);
        } else {
            coincideCategoria = producto.category === categoria;
        }

        console.log("Producto:", producto.title, "Coincide Texto:", coincideTexto, "Coincide Cat:", coincideCategoria);

        return coincideTexto && coincideCategoria;
    });
}

/**
 * TODO: Exportar función calcularTotalCatalogo(lista)
 * que calcule con .reduce() la suma acumulada de los precios.
 */
export function calcularTotalCatalogo(lista) {
    // Tu código acá:
    const total = lista.reduce((acc, producto) => acc + producto.price, 0);
    console.log("Suma acumulada:", total);
    return total;
}