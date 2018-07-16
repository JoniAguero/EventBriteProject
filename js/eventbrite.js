export class EventBriteAPI {

    constructor(){
        this.token = 'QP47CDFTEMY2SRYH6M5W';
        this.ordenar = 'date';
    }

    async obtenerCategorias() {

        const url = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token}`);
        return await url.json();

    }

    async obtenerSubategorias(id) {
        

        const url = await fetch(`https://www.eventbriteapi.com/v3/categories/${id}/?token=${this.token}`);
        return await url.json();

    }

    async obtenerBusqueda(busqueda, categoria) {


        const url = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${busqueda}&sort_by=${this.ordenar}&categories=${categoria}&token=${this.token}`);
        return await url.json();

    }

}