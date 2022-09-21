let productData = [];
let basket = [];
let price = 0;
let totalQuantity = 0;

// Récupération du panier dans le localStorage
basket = JSON.parse(localStorage.getItem("basket"));

// Message si le basket est vide
if (basket == null) {
  document.querySelector(
    "#cartAndFormContainer"
  ).innerHTML = `<h1>Votre panier est vide</h1>`;

  // Sinon, affichage du basket
} else {
  for (i = 0; i < basket.length; i++) {
    let id = basket[i].id;
    let quantity = basket[i].quantity;
    let color = basket[i].color;

    const fetchProduct = async () => {
      await fetch(`http://localhost:3000/api/products/${basket[i].id}`)
        .then((res) => res.json())
        .then((promise) => {
          productData = promise;
          document.querySelector(
            "#cart__items"
          ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${basket.color}">
    <div class="cart__item__img">
      <img src="${productData.imageUrl}" alt="${productData.name}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productData.name}</h2>
        <p>${color}</p>
        <p>${productData.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" onchange="changeQuantity()"  data-id="${id}" data-color="${color}" data-quantity="${quantity} name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onload="deleteItem()"data-id="${id}" data-color="${color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
        });
      // Calcul du prix total
      price += productData.price * quantity;
      document.querySelector("#totalPrice").innerHTML = price;
      // Calcul de la quantité total
      totalQuantity += parseInt(quantity);
      document.querySelector("#totalQuantity").innerHTML = totalQuantity;

      //----------------FONCTION SERVANT A SUPPRIMER UN PRODUIT------------------//

      function deleteItem() {
        let products = document.querySelectorAll(".deleteItem");

        for (let product of products) {
          product.addEventListener("click", () => {
            let id = product.dataset.id;
            let color = product.dataset.color;
            let deleteItem = basket.find(
              (element) => element.id == id && element.color == color
            );

            (basket = basket.filter((item) => item != deleteItem)),
              localStorage.setItem("basket", JSON.stringify(basket));
            window.location.href = "cart.html";
          });
        }
      }
      deleteItem();
    };

    fetchProduct();
  }
  function getBasket() {
    let basket = [];
    basket = localStorage.getItem("basket");

    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }
}

//----------------FONCTION SERVANT A MODIFIER LA QUANTITE D'UN PRODUIT------------------//

function changeQuantity() {
  let changeQuantity = document.querySelectorAll(".itemQuantity");
  changeQuantity.forEach((item) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let i in basket) {
      if (
        basket[i].id == item.dataset.id &&
        basket[i].color == item.dataset.color
      ) {
        (basket[i].quantity = parseInt(changeQuantity[i].value)),
          localStorage.setItem("basket", JSON.stringify(basket));
        window.location.href = "cart.html";
      }
    }
  });
}

//--- DECLARATION DES DIFFERENTES VARIABLES QUI SERVIRONT A LA PARTIE FORMULAIRE ---//

let form = document.querySelector(".cart__order__form");
let confirm = document.getElementById("order");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let checkFirstName = "";
let checkLastName = "";
let checkAddress = "";
let checkCity = "";
let checkEmail = "";

//--- FONCTION POUR VALIDER LE PRENOM ---//

function validateFirstName() {
  firstName.addEventListener("change", () => {
    if (/^[a-zA-Z\u00C0-\u00FF ,.'-]+$/.test(firstName.value) == true) {
      console.log("Prénom valide");
      document.getElementById("firstNameErrorMsg").innerText = null;
      firstName.style.border = "solid 2px rgba(0, 255, 0, 0.75)";
      checkFirstName = "ok";
    } else {
      console.log("Prénom invalide");
      document.getElementById("firstNameErrorMsg").innerText =
        "Veuillez renseigner un prénom valide";
      firstName.style.border = "solid 2px rgba(255, 0, 0, 0.75)";
      checkFirstName = "non ok";
    }
  });
}
validateFirstName();

//--- FONCTION POUR VALIDER LE NOM ---//

function validateLastName() {
  lastName.addEventListener("change", () => {
    if (/^[a-zA-Z\u00C0-\u00FF ,.'-]+$/.test(lastName.value) == true) {
      console.log("Nom valide");
      document.getElementById("lastNameErrorMsg").innerText = null;
      lastName.style.border = "solid 2px rgba(0, 255, 0, 0.75)";
      checkLastName = "ok";
    } else {
      console.log("Nom invalide");
      document.getElementById("lastNameErrorMsg").innerText =
        "Veuillez renseigner un nom valide";
      lastName.style.border = "solid 2px rgba(255, 0, 0, 0.75)";
      checkLastName = "non ok";
    }
  });
}
validateLastName();

//--- FONCTION POUR VALIDER L'ADRESSE ---//

function validateAddress() {
  address.addEventListener("change", () => {
    if (/^[#.0-9a-zA-Z\s,-]+$/.test(address.value) == true) {
      console.log("Adresse valide");
      document.getElementById("addressErrorMsg").innerText = null;
      address.style.border = "solid 2px rgba(0, 255, 0, 0.75)";
      checkAddress = "ok";
    } else {
      console.log("Adresse invalide");
      document.getElementById("addressErrorMsg").innerText =
        "Veuillez renseigner une adresse valide";
      address.style.border = "solid 2px rgba(255, 0, 0, 0.75)";
      checkAddress = "non ok";
    }
  });
}
validateAddress();

//--- FONCTION POUR VALIDER LA VILLE ---//

function validateCity() {
  city.addEventListener("change", () => {
    if (/^[a-zA-Z\u00C0-\u00FF]+$/.test(city.value) == true) {
      console.log("Ville valide");
      document.getElementById("cityErrorMsg").innerText = null;
      city.style.border = "solid 2px rgba(0, 255, 0, 0.75)";
      checkCity = "ok";
    } else {
      console.log("Ville invalide");
      document.getElementById("cityErrorMsg").innerText =
        "Veuillez renseigner une ville valide";
      city.style.border = "solid 2px rgba(255, 0, 0, 0.75)";
      checkCity = "non ok";
    }
  });
}
validateCity();

//--- FONCTION POUR VALIDER L'EMAIL ---//

function validateEmail() {
  email.addEventListener("change", () => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value) == true) {
      console.log("Email valide");
      document.getElementById("emailErrorMsg").innerText = null;
      email.style.border = "solid 2px rgba(0, 255, 0, 0.75)";
      checkEmail = "ok";
    } else {
      console.log("Email invalide");
      document.getElementById("emailErrorMsg").innerText =
        "Veuillez renseigner un email valide";
      email.style.border = "solid 2px rgba(255, 0, 0, 0.75)";
      checkEmail = "non ok";
    }
  });
}
validateEmail();

//--- FONCTION POUR VALIDER LE FORMULAIRE ---//

function validateForm() {
  confirm.addEventListener("click", (e) => {
    if (
      checkFirstName == "ok" &&
      checkLastName == "ok" &&
      checkAddress == "ok" &&
      checkCity == "ok" &&
      checkEmail == "ok"
    ) {
      e.preventDefault();
      order();
    } else {
      alert("Veuillez vérifiez vos informations de contact");
      e.preventDefault();
    }
  });
}
validateForm();

//--- FONCTION POUR EFFECTUER UNE REQUETE POST AVEC LES INFOS DE CONTACT AINSI QUE L'ID DES PRODUITS ---//

function order() {
  for (let i in basket) {
    const objectCommand = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: [basket[i].id],
    };
    let fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(objectCommand),
    };
    fetch("http://localhost:3000/api/products/order", fetchOption)
      .then((response) => response.json())
      .then((json) => {
        let orderId = json.orderId;
        // renvoie vers la page de confirmation avec l'id de la commande //
        window.location.assign(`confirmation.html?orderId=${orderId}`);
        // suppression du localStorage //
        localStorage.clear();
      });
  }
}
