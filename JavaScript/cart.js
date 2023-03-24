import { categorias, mainData, cart as arrayCart } from "../const/data.js";

const cart = document.querySelector("[data-cart-items]");
const cartSummary = document.querySelector("[data-cart-summary]");

const cartViewGlobalVariables = {
    HTML: "",
    renderCartDataOptions: {
        price: 0,
        quantity: 0
    },

    datasetValues: {
        REMOVE_ITEM: "removeItem",
        STEP_DOWN: "stepDown",
        STEP_UP: "stepUp",
        IMG_NAVIGATE: "imgNavigate",
        STOP_EXECUTION: "Stop execution",
        separator: "//**//"
    },

    cartViewContainer: document.querySelector("div[id='cartViewContainer']")
}

const setValuesSummaryView = () => {
    cartSummary.querySelectorAll("[data-field]").forEach(element => {

        return element.textContent = cartViewGlobalVariables.renderCartDataOptions[element.dataset.field];
    });
}


const cartVoid = () => {
    cart.innerHTML += "<h3 class='text-center text-muted'>Carrito vacio</h3>";
    cartViewGlobalVariables.cartViewContainer.removeChild(cartViewGlobalVariables.cartViewContainer.querySelector("div[data-cart-summary]"));
    throw new Error(cartViewGlobalVariables.datasetValues.STOP_EXECUTION);
}

if (!arrayCart.length) cartVoid();

const cartItems = mainData.filter(({ fkCategory, id }) => {

    return arrayCart.find(el => (el.fkCategory === fkCategory && el.id === id));
}
);

for (let { name, id, price, uri, quantity, fkCategory } of cartItems) {

    const { name: type } = categorias.find(({ id }) => id === fkCategory);
    const { renderCartDataOptions, datasetValues } = cartViewGlobalVariables;

    renderCartDataOptions.price += price;
    renderCartDataOptions.quantity++;

    cartViewGlobalVariables.HTML += `
    <hr class="my-4">
      
    <div class="row mb-4 d-flex justify-content-between align-items-center" id="cartChild">
      <div class="col-2">
        <img
        data-type="${datasetValues.IMG_NAVIGATE}"
        data-value="${id}${datasetValues.separator}${fkCategory}"
          src="${uri}"
          class="img-fluid rounded-3 cursor-pointer" alt="${name}">
      </div>
      <div class="col-3">
        <h6 class="text-muted">${type}</h6>
        <h6 class="text-black mb-0">${name}</h6>
      </div>
      <div class="col-3 d-flex">
        <button class="btn btn-link px-2" data-type=${datasetValues.STEP_DOWN}>
          <i class="fas fa-minus"></i>
        </button>

        <input min="0" max=${quantity} value="1" type="number"
          class="form-control form-control-sm" />

        <button class="btn btn-link px-2" data-type=${datasetValues.STEP_UP}
            data-value=${quantity}>
          <i class="fas fa-plus"></i>
        </button>

        <span class='text-danger cursor-pointer'><strong data-type='${datasetValues.REMOVE_ITEM}'
        data-value='${id}${datasetValues.separator}${fkCategory}${datasetValues.separator}${price}'>X</strong></span>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">$ ${price}</h6>
      </div>
      <p id="saucerId" data-id=${id} data-fk-category=${fkCategory} hidden></p>
    </div>

    <hr class="my-4">
    `;
}

setValuesSummaryView();

cart.insertAdjacentHTML("beforeend", cartViewGlobalVariables.HTML);

cart.onclick = (event) => {

    const dataset = event.target.dataset;

    if (!dataset) return;

    const { REMOVE_ITEM, STEP_DOWN, STEP_UP, separator, IMG_NAVIGATE } = cartViewGlobalVariables.datasetValues;

    switch (dataset.type) {
        case REMOVE_ITEM:
            {
                const values = dataset.value.split(separator);

                const index = arrayCart.findIndex(({ id, fkCategory }) => {

                    return id === parseInt(values[0]) && fkCategory === parseInt(values[1]);
                });

                if (index === -1) return;

                arrayCart.delete = index;

                const children = event.target.closest("div[id='cartChild']");

                cartViewGlobalVariables.renderCartDataOptions.quantity--;
                cartViewGlobalVariables.renderCartDataOptions.price -= values[2];
                setValuesSummaryView();

                cart.removeChild(children);
                return arrayCart.length || cartVoid();
            }

        case STEP_DOWN:
            {
                const input = event.target.parentNode.querySelector("input[type='number']");
                if (parseInt(input.value) <= 0) return;
                return input.stepDown();
            }

        case STEP_UP:
            {

                const input = event.target.parentNode.querySelector("input[type='number']");
                if (parseInt(input.value) > parseInt(dataset.value)) return;
                return input.stepUp();
            }

        case IMG_NAVIGATE:
            {

                const values = dataset.value.split(separator);
                return window.location.href = `./renderDetail.html?id=${values[0]}&fkCategory=${values[1]}`;
            }
    }
}