export const tarjetas = [{
    fkCategory: 1,
    data: [{
        name: "ARROZ CON CAMARONES",
        price: 12222
    },
    ]
}];

export const categorias = [
    {
        id: 8,
        name: "Entradas",

    },
    {
        id: 1,
        name: "Arroz",

    },
    {
        id: 2,
        name: "Carnes"

    },
    {
        id: 3,
        name: "FrutosMar"

    },
    {
        id: 4,
        name: "MenuInfantil"

    },
    {
        id: 5,
        name: "Pastas"

    },
    {
        id: 6,
        name: "Sopas"

    },
    {
        id: 7,
        name: "Tipicos"

    }
];

export const mainData = [
    {
        fkCategory: 8,
        name: "PATACONES",
        id: 1,
        price: 11.000,
        uri: "../Imagenes/Entradas/patacones.jpg",
        description: "delicioso patacon",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 6,
    },
    {
        fkCategory: 8,
        name: "AROS DE CEBOLLA",
        id: 2,
        price: 11.000,
        uri: "../Imagenes/Entradas/aros.jpg",
        description: "deliciosos aros de cebolla",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 8,
    },
    {
        fkCategory: 8,
        name: "CROQUETAS DE YUCA",
        id: 3,
        price: 11.000,
        uri: "../Imagenes/Entradas/croquetas.jpg",
        description: "deliciosas croquetas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 5,
    },
    {
        fkCategory: 8,
        name: "PAPAS RUSTICAS",
        id: 7,
        price: 11.000,
        uri: "../Imagenes/Entradas/papas.jpg",
        description: "deliciosas papas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 2,
    },
    {
        fkCategory: 8,
        name: "CAMARONES REBOSADOS",
        id: 4,
        price: 16.000,
        uri: "../Imagenes/Entradas/camarones.jpg",
        description: "deliciosos camarones",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 7,
    },
    {
        fkCategory: 8,
        name: "TAJADAS CHIPS",
        id: 5,
        price: 11.000,
        uri: "../Imagenes/Entradas/chips.jpg",
        description: "deliciosas tajadas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 3,
    },
    {
        fkCategory: 8,
        name: "CAMARONES REBOSADOS",
        id: 6,
        price: 16.000,
        uri: "../Imagenes/Entradas/camarones.jpg",
        description: "deliciosos camarones",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 7,
    },
    {
        fkCategory: 1,
        name: "A la valenciana",
        id: 1,
        price: 11.000,
        uri: "../Imagenes/Arroces/a la valenciana.jpg",
        description: "deliciosas tajadas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 3,
    },
    
    {
        fkCategory: 1,
        name: "Con camaron",
        id: 2,
        price: 11.000,
        uri: "../Imagenes/Arroces/con camaron.jpg",
        description: "deliciosas tajadas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 3,
    },

    {
        fkCategory: 1,
        name: "Con Frutos de mar",
        id: 3,
        price: 11.000,
        uri: "../Imagenes/Arroces/con frutos del mar.jpg",
        description: "deliciosas tajadas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 3,
    },

    {
        fkCategory: 1,
        name: "Con Pollo",
        id: 4,
        price: 11.000,
        uri: "../Imagenes/Arroces/con pollo.webp",
        description: "deliciosas tajadas",
        gm: 1000,
        kcal: 1000,
        person: "who knows",
        quantity: 3,
    },

];

const properties = {
    DELETE: "delete"
}

const getCart = localStorage.getItem("cart") ? [...JSON.parse(localStorage?.getItem("cart"))] : [];
export const cart = new Proxy(getCart, {

    set: (target, property, value) => {

        const {DELETE} = properties;

        switch (property) {
            case DELETE:
                target.splice(value, 1);
            default:
                target[property] = value;

        }
        
        localStorage.setItem("cart", JSON.stringify(target));

        return true;
    }
});