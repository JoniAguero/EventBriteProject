import { EventBriteAPI } from "./eventbrite.js";
import * as UI from "./interfaz.js";

const api = new EventBriteAPI();

api.obtenerCategorias().then(data => {
    console.log(data);

    const categorias = data.categories;

    categorias.forEach(element => {
        const option = document.createElement('option');
        option.value = element.id;
        option.appendChild(document.createTextNode(element.name));

        UI.selectCategorias.appendChild(option);
    });
})

api.obtenerSubategorias(103).then(data => {

    console.log(data);

    const subcategorias = data.subcategories;

    console.log(subcategorias);

    subcategorias.forEach(element => {
        const option = document.createElement('option');
        option.value = element.id;
        option.appendChild(document.createTextNode(element.name));

        UI.selectSubcategorias.appendChild(option);
    });

})


UI.selectCategorias.addEventListener('change', (e) => {
     
    const arraySelect = document.querySelectorAll('#selectSubcategorias option');

    console.log(arraySelect);
    arraySelect.forEach(element => {
        console.log(element);

        element.remove();
    });

    e.preventDefault();
    const id = e.target.value;

    api.obtenerSubategorias(id).then(data => {

        const subcategorias = data.subcategories;

        console.log(subcategorias);

        subcategorias.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.appendChild(document.createTextNode(element.name));

            UI.selectSubcategorias.appendChild(option);
        });
    })
    

})