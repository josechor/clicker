var puntos
var cps
var ppc

function almacenamiento() {
    console.log("Intervalo")
    localStorage.setItem("puntos", puntos);
    localStorage.setItem("cps", cps);
    localStorage.setItem("ppc", ppc);
    localStorage.setItem("chupo", JSON.stringify(upgrades))
}

function asignarVar() {
    console.log("hola")
    if (localStorage.getItem("primeraVez") == null) {
        localStorage.setItem("primeraVez", true);
        puntos = 0;
        cps = 0;
        ppc = 1;
    } else {
        puntos = parseInt(localStorage.getItem("puntos"));
        cps = parseInt(localStorage.getItem("cps"));
        ppc = parseInt(localStorage.getItem("ppc"))
        upgrades = JSON.parse(localStorage.getItem("chupo"))
    }
    updatePuntos();
    updateMyStats();
    updateValues();
}

setInterval(() => {
    almacenamiento()
}, 1000);





function cookie() {
    document.cookie = "puntos=" + puntos;
    document.cookie = "cps=" + cps;

}
setInterval(() => {
    cookie();
}, 1000);

//Declaración de upgrades
let chupo = { name: "Chupo", class: "chupo", amount: 0, cps: 1, ppc: 1, cost: 10, basecost: 10 };
let sandia = { name: "Sandía", class: "sandia", amount: 0, cps: 3, ppc: 5, cost: 100, basecost: 100 };
let aleron = { name: "Alerón", class: "aleron", amount: 0, cps: 7, ppc: 15, cost: 1000, basecost: 1000 };
let manguitos = { name: "Manguitos", class: "manguitos", amount: 0, cps: 20, ppc: 40, cost: 5000, basecost: 5000 };
let aceite = { name: "Aceite", class: "aceite", amount: 0, cps: 60, ppc: 200, cost: 10000, basecost: 10000 };
let coche = { name: "Coche", class: "coche", amount: 0, cps: 200, ppc: 800, cost: 50000, basecost: 50000 };
let gatos = { name: "Stickers de gatos", class: "gatos", amount: 0, cps: 500, ppc: 1500, cost: 1000000, basecost: 1000000 };
let upgrades = [chupo, sandia, aleron, manguitos, aceite, coche, gatos];

addElements(upgrades);
updateValues();
updateMyStats();

document.querySelector(".clicker-btn").addEventListener("click", function () {
    puntos += ppc;
    updatePuntos();
});

document.querySelectorAll(".store-item").forEach(element => {
    element.addEventListener("click", function () {
        comprar(element);
    });
});

//Añade los cps cada segundo
const interval = setInterval(function () {
    puntos += cps;
    updatePuntos();
}, 1000);

//Actualizar valores
function updateValues() {
    upgrades.forEach(element => {
        let item = document.querySelector("." + element.class);
        if (item != null) {
            item.querySelector(".store-item-name").innerHTML = element.name;
            item.querySelector(".store-item-amount").innerHTML = "Cantidad: " + element.amount;
            item.querySelector(".store-item-benefits-ppc").innerHTML = "ppc: " + element.ppc;
            item.querySelector(".store-item-benefits-cps").innerHTML = "cps: " + element.cps;
            item.querySelector(".store-item-cost").innerHTML = "Coste: " + element.cost;
        }
    });
}

//Actualizar puntos
function updatePuntos() {
    document.querySelector(".text").innerHTML = puntos;
    checkCost();
}

//Actualizar stats
function updateMyStats() {
    document.querySelector(".clicker-ppc").innerHTML = "Puntos por click: " + ppc;
    document.querySelector(".clicker-cps").innerHTML = "Puntos por segundo: " + cps;

}

function checkCost() {
    upgrades.forEach(element => {
        let object = document.querySelector("." + element.class);
        if (object != null) {
            if (element.cost > puntos) {
                changeClass(object, "store-item-enabled", "store-item-disabled");
            } else {
                changeClass(object, "store-item-disabled", "store-item-enabled");
            }
        }
    })
}

function changeClass(object, oldClass, newClass) {
    // var regExp = new RegExp('(?:^|\\s)' + oldClass + '(?!\\S)', 'g');
    object.className = object.className.replace(oldClass, newClass);
}

//Comprar
function comprar(element) {
    if (element.className.includes("store-item-enabled")) {
        let upgrade;
        upgrades.forEach(obj => {
            if (element.className.includes(obj.class)) {
                upgrade = obj;
            }
        });

        //Comprar
        upgrade.amount++;
        cps += upgrade.cps;
        ppc += upgrade.ppc;
        puntos -= upgrade.cost;
        increasePrice(upgrade);

        //Refrescar
        updateValues();
        updateMyStats();
        updatePuntos();
    }
}

function increasePrice(upgrade) {
    upgrade.cost = Math.ceil(upgrade.basecost * Math.pow(Math.E, 0.15 * upgrade.amount));
}

//Añadir elementos dinámicamente:
function addElements(upgrades) {
    let parent = document.querySelector(".store-list");
    upgrades.forEach(element => {
        parent.innerHTML +=
            "<li class=\"store-item-disabled " + element.class + " store-item\">" +
            "<p class=\"store-item-name\">" + element.name + "</p> " +
            "<p class=\"store-item-amount\">" + element.amount + "</p>" +
            "<div class=\"store-item-benefits\">" +
            "<p class=\"store-item-benefits-ppc\">" + element.ppc + "</p>" +
            "<p class=\"store-item-benefits-cps\">" + element.cps + "</p>" +
            "</div> " +
            "<p class=\"store-item-cost\">" + element.cost + "</p>" +
            "</li>";
    });
}