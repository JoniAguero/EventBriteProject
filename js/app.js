import { EventBriteAPI } from "./eventbrite.js";
import * as UI from "./interfaz.js";

const api = new EventBriteAPI();
let listCard;

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
    console.log(UI.eventosSection);

    while (UI.eventosSection.firstChild) {
        UI.eventosSection.removeChild(UI.eventosSection.firstChild);
    }

    api.obtenerBusqueda(busqueda, categoriaSeleccionada).then(data => {
        
        console.log(data);
        console.log(UI.eventosSection);
        
        
        const eventos = data.events;

        eventos.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.display = "inline-block";
            card.style.marginRight = "10px";
            card.style.height = "150px";
            card.style.width = "380px";
            card.style.transition = "0.5s";
            card.style.margin = "20px";
            card.style.cursor = "pointer";
            const cardImage = document.createElement('div');
            cardImage.classList.add('card-image');
            const image = document.createElement('img');
            if (element.logo !== null) {
                image.src = element.logo.url;
            } else {
                image.src = '../img/no-image.jpg'
            }
            
            cardImage.appendChild(image);
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            cardContent.appendChild(document.createTextNode(element.name.text));
            card.appendChild(cardImage);
            card.appendChild(cardContent);
            if(element.url){
                const cardUrl = document.createElement('url');
                cardUrl.appendChild(document.createTextNode(element.url));
                cardUrl.style.display = "none";
                card.appendChild(cardUrl);
            }
            
            UI.eventosSection.appendChild(card);
           
        });

    })
    .then( () => {
        listCard = document.querySelectorAll('.card');  
        listCard.forEach(element => {

            element.addEventListener('mouseover', () => {
                e.preventDefault();
                
                element.style.height = "158px";
                element.style.width = "399px";

            });

            element.addEventListener('mouseout', () => {
                e.preventDefault();

                element.style.height = "150px";
                element.style.width = "380px";

            });

            element.addEventListener('click', () => {
                e.preventDefault();
                let url = element.childNodes[2].textContent;
                window.open(url)
            })
            
        });
    })
    
});



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