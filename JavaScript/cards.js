const card = document.querySelector("#card");
import {mainData, cart} from "../const/data.js";
const id = new URLSearchParams(window.location.search).get("id");

const newData = [...mainData].filter(element => element.fkCategory === parseInt(id));

let HTML;
if (!!newData.data.length) {
    HTML = "<p>Not found</p>"
}
else {
    for (let element of newData) {
        HTML += `<div class="col-md-6 mb-2">
                    <div class="row boton">
                    <div class="col-11 bg-white shadow mx-auto rounded-lg" style="cursor: pointer;">
                        <div class="row">
                        <div class="col-4 pl-0 fotoprod-ch mr-3">
                            <img src="../Imagenes/Arroces/con camaron.jpg" width="1024" height="633" class="rounded-left">
                        </div>
                        <div class="col-8 pt-2 pl-0 pr-0">
                            <p class="text-dark mb-0"> <strong>${element}</strong><br>
                            <small>(...)</small>
                            </p>
                            <div class="row">
                            <div class="col-6">
                                <span class="text-left text-md-left text-danger"><strong>$ 30.000</strong></span>
                            </div>

                            <div class="col-6 text-right">
                                <span class=" text-md-right text-danger"><a href="#" class="text-danger agregar"><i
                                    class="fas fa-plus-circle fa-lg"></i></a></span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>`;
    }
}

card.innerHTML += HTML;

const aggre = (id) => card.push({idTable: 1, id});