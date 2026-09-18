/* ==========================================================================
   MÓDULO: api.js - Consumo de Servicios Externos (Fetch & Async/Await)
   Materia: Desarrollo de Software para Plataformas Móviles (7° 5ta)
   Profesor: Axel Castellano Gutiérrez
   ========================================================================== */

/**
 * TODO: Exportar una función asíncrona llamada descargarProductosTech()
 * que descargue en paralelo con Promise.all() las categorías:
 * - "https://dummyjson.com/products/category/smartphones"
 * - "https://dummyjson.com/products/category/laptops"
 * - "https://dummyjson.com/products/category/mobile-accessories"
 * y retorne un único array plano con todos los productos (.flatMap).
 */
export async function descargarProductosTech() {
    // Tu código acá:
    const urls = [
        "https://dummyjson.com/products/category/smartphones",
        "https://dummyjson.com/products/category/laptops",
        "https://dummyjson.com/products/category/mobile-accessories"
    ];

    try {
        // Paso 1.1: Descargar las 3 categorías en paralelo
        const respuestas = await Promise.all(
            urls.map(url => fetch(url, { signal: AbortSignal.timeout(8000) }))
        );
        console.log("Respuestas HTTP recibidas:", respuestas);

        // Validación obligatoria: fetch() NO entra al catch ante errores 404/500
        respuestas.forEach(res => {
            if (!res.ok) {
                throw new Error(`Error en el servidor: Código ${res.status}`);
            }
        });

        // Paso 1.2: Parsear los cuerpos JSON
        const datos = await Promise.all(respuestas.map(res => res.json()));
        console.log("Objetos JSON parseados:", datos);

        // Paso 1.3: Aplanar las 3 listas en un solo array
        const productos = datos.flatMap(categoria => categoria.products);
        console.log("Total de productos aplanados:", productos.length, productos);

        // Paso 1.4: Retorno final
        return productos;

    } catch (error) {
        console.error("Fallo la petición:", error.message);
        throw error;
    }
}