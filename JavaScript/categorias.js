import {categorias} from "../const/data.js";

const card = document.querySelector("#card");

let HTML = "<p>Not found</p>";

if (!!categorias.length){
    HTML = categorias.map(element => {
        return `
        <div class="col-md-12 text-center pb-4">
            <a class="btn btn-light rounded-pill" href="./Categorias/Entradas.html?id=${element.id}"
                role="button"><strong>${element.name}</strong></a>
        </div>
        `;
    });
}

card.insertAdjacentHTML("afterbegin", HTML);