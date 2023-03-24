import { mainData } from "../const/data.js";
// const item = JSON.parse(localStorage.getItem("data"));

const params = new URLSearchParams(window.location.search);

const selectedSausage = mainData.find(element => 
    (element.id === parseInt(params.get("id")) && element.fkCategory === parseInt(params.get("fkCategory")) ) 
    );

for (let type in selectedSausage) {
    const tag = document?.querySelector(`#${type}`);
    if (!!!tag) continue;
    tag.textContent = selectedSausage[type];
} 

document.querySelector("#handleQuantity").addEventListener("click", event => {
    const target = event.target;
    
    if (target.tagName !== "BUTTON") return;
    
    const onPressButton = target.dataset.type;

    const quantity = document.querySelector("#quantity");
    const value = parseInt(quantity.value);

    if (onPressButton === "minus" && value > 1) {
        quantity.value = value - 1;
        console.log("On value");
    }
    else if (onPressButton === "plus" && value < selectedSausage.quantity) {
        quantity.value = value + 1;
    }
});