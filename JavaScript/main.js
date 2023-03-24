import { mainData, cart as arrayCart } from "../const/data.js";
const handleMain = document.querySelector("#handleMain");

const fkCategory = parseInt(new URLSearchParams(window.location.search)?.get("id"));
const cart = document.querySelector("span[data-cart-items-lenght]");

window.addEventListener("load", () => {

    let HTML = "<p>Not found</p>";
    const SELECT_ALL_FROM_CATEGORY_INNER_JOIN_MAINDATA_ = mainData.filter(item => item.fkCategory === fkCategory)
    if (!!!SELECT_ALL_FROM_CATEGORY_INNER_JOIN_MAINDATA_.length) return handleMain.innerHTML = HTML;


    HTML = "";
    for (let { uri, name, price, id } of SELECT_ALL_FROM_CATEGORY_INNER_JOIN_MAINDATA_) {

        const isAlreadyInTheCart = arrayCart.some(el =>  (el.id === id && el.fkCategory === fkCategory));

        HTML += `
        <div class="col-md-6 mb-2" data-sausage="${id}">
            <div class="row">
            <div class="col-11 bg-white shadow mx-auto rounded-lg" style="cursor: pointer;">
                <div class="row">
                <div class="col-4 pl-0 fotoprod-ch mr-3">
                    <img src="${uri}" width="1024" height="633" class="rounded-left">
                </div>
    
                <div class="col-8 pt-2 pl-0 pr-0">
                    <p class="text-dark mb-0"> <strong>${name}</strong><br>
                    <small>(...)</small>
                    </p>
                    <div class="row">
                    <div class="col-6 d-flex justify-content-around align-items-center w-10">
                        <span class="text-left text-md-left text-danger"><strong>$ ${price}</strong></span>
                        <button class='btn ${isAlreadyInTheCart ?
                "btn-success"
                :
                "btn-primary"
            }' data-keep-saucer=${id}>${isAlreadyInTheCart ? "Plato Guardado" : "Guardar"}</button>
                    </div>
                    <div class="col-6 text-right" >
                    </div>
                    </div>
                </div>
    
                </div>
            </div>
            </div>
        </div>
        `;
    }

    cart.textContent = arrayCart.length;

    handleMain.innerHTML = HTML;
});

handleMain.addEventListener("click", event => {
    const target = event.target;
    const dataset = target.dataset;

    const datasets = {
        sausage: target.closest("[data-sausage]")?.dataset?.sausage,
        keepSaucer: dataset?.keepSaucer && parseInt(dataset?.keepSaucer)
    }

    if (!!dataset.sausage) return;

    if (!!datasets.keepSaucer) {

        let message = "Plato Guardado";
        if (arrayCart.some(item => (item.id === datasets.keepSaucer && item.fkCategory === fkCategory) )) {
            message = "Guardar";

            arrayCart.delete = arrayCart.findIndex(element => element.id === datasets.keepSaucer);


        }
        else arrayCart.push({
            fkCategory,
            id: datasets.keepSaucer
        });

        target.classList.toggle("btn-primary");
        target.classList.toggle("btn-success");
        target.textContent = message;
        return cart.textContent = arrayCart.length


    }

    return window.location.href = `./renderDetail.html?id=${datasets.sausage}&fkCategory=${fkCategory}`;
});