// --- Déclaration de la variable pour récupérer l'order ID dans l'adresse
//HTML et l'inserer dans la page ---//

let orderId = window.location.search.split("?orderId=").join("");
document.querySelector("#orderId").innerText = `${orderId}`;
