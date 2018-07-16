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

UI.buscarButton.addEventListener('click', (e) => {
    e.preventDefault();

    const busqueda = UI.inputBusqueda.value;
    const categoriaSeleccionada = UI.selectCategorias.value;
    console.log(busqueda);
    console.log(categoriaSeleccionada);

    api.obtenerBusqueda(busqueda, categoriaSeleccionada).then(data => {
        
        console.log(data);
        
        const eventos = data.events;

        eventos.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.display = "inline-block";
            const cardImage = document.createElement('div');
            cardImage.classList.add('card-image');
            const image = document.createElement('img');
            image.src = element.logo.url;
            const titleCard = document.createElement('span');
            titleCard.classList.add('card-title');
            titleCard.appendChild(document.createTextNode(element.name.text));
            cardImage.appendChild(image);
            cardImage.appendChild(titleCard);
            const cardContent = document.createElement('div');
            cardContent.appendChild(document.createTextNode(element.end.timezone));
            card.appendChild(cardImage);
            card.appendChild(cardContent);

            UI.eventosSection.appendChild(card);
        });

        


    })
    
})


// UI.selectCategorias.addEventListener('change', (e) => {
     
//     const arraySelect = document.querySelectorAll('#selectSubcategorias option');

//     console.log(arraySelect);
//     arraySelect.forEach(element => {
//         console.log(element);

//         element.remove();
//     });

//     e.preventDefault();
//     const id = e.target.value;

//     api.obtenerSubategorias(id).then(data => {

//         const subcategorias = data.subcategories;

//         console.log(subcategorias);

//         subcategorias.forEach(element => {
//             const option = document.createElement('option');
//             option.value = element.id;
//             option.appendChild(document.createTextNode(element.name));

//             UI.selectSubcategorias.appendChild(option);
//         });
//     })
    

// })