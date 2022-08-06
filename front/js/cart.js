let productData = [];
let basket = [];
let price = 0;
let totalQuantity = 0;

// Récupération du panier dans le localStorage
basket = JSON.parse(localStorage.getItem("basket"));

// Message si le basket est vide
if (basket === null) {
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
          <p class="deleteItem" onclick="deleteItem()" data-id="${id}" data-color="${color}">Supprimer</p>
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
//----------------Fonction pour supprimer un produit------------------//

function deleteItem() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.forEach((item) => {
    item.addEventListener("click", () => {
      let basket = JSON.parse(localStorage.getItem("basket"));
      if (basket.length === 1) {
        return (
          localStorage.removeItem("basket"),
          (window.location.href = "cart.html")
        );
      } else {
        for (let i in basket) {
          if (
            basket[i].id !== item.dataset.id ||
            basket[i].color !== item.dataset.color
          ) {
            return (
              (deleted = basket.filter(
                (e) =>
                  e.id !== item.dataset.id || e.color !== item.dataset.color
              )),
              localStorage.setItem("basket", JSON.stringify(deleted)),
              (window.location.href = "cart.html")
            );
          }
        }
      }
    });
  });
}

function changeQuantity() {
  let changeQuantity = document.querySelectorAll(".itemQuantity");
  changeQuantity.forEach((item) => {
    // item.addEventListener("change", () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let i in basket) {
      if (
        basket[i].id == item.dataset.id &&
        basket[i].color == item.dataset.color
      ) {
        (basket[i].quantity = parseInt(changeQuantity[i].value)),
          localStorage.setItem("basket", JSON.stringify(basket)),
          console.log(changeQuantity[i].value),
          (window.location.href = "cart.html");
      }
    }
    //});
  });
}
// function saveContact(contact) {
//   localStorage.setItem("contact", JSON.stringify(contact));
// }
// function addContact(contact) {
//   contact = {
//     prénom: firstName.value,
//     nom: lastName.value,
//     addresse: address.value,
//     ville: city.value,
//     email: email.value,
//   };
//   saveContact(contact);
// }
//function checkForm() {
let form = document.querySelector(".cart__order__form");
let confirm = document.querySelector("#order");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

// const regexAddress = /^[#.0-9a-zA-Z\s,-]+$/;
// const regexEmail =
//   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
// const regexName = /^[a-z ,.'-]+$/i;
// const checkFirstName = /^[a-zA-Z]+[a-zA-Z]+$/.test(firstName);
// const checkLastName = /^[a-zA-Z]+[a-zA-Z]+$/.test(lastName);
// const checkAddress = /^[#.0-9a-zA-Z\s,-]+$/.test(address);
// const checkCity = /^[a-zA-Z]+[a-zA-Z]+$/.test(city);
// const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//   email.value
// );

//--- FONCTION POUR VALIDER LE PRENOM ---//

function validateFirstName() {
  if (/^[a-zA-Z\u00C0-\u00FF ,.'-]+$/.test(firstName.value) == true) {
    console.log("Prénom ok");
    return true;
  } else {
    console.log("Prénom non ok");
    return false;
  }
}
validateFirstName();

//--- FONCTION POUR VALIDER LE NOM ---//

function validateLastName() {
  if (/^[a-zA-Z\u00C0-\u00FF ,.'-]+$/.test(lastName.value) == true) {
    console.log("Nom ok");
    return true;
  } else {
    console.log("Nom non ok");
    return false;
  }
}
validateLastName();

//--- FONCTION POUR VALIDER L'ADRESSE ---//

function validateAddress() {
  if (/^[#.0-9a-zA-Z\s,-]+$/.test(address.value) == true) {
    console.log("Adresse ok");
    return true;
  } else {
    console.log("Adresse non ok");
    return false;
  }
}
validateAddress();

//--- FONCTION POUR VALIDER LA VILLE ---//

function validateCity() {
  if (/^[a-zA-Z\u00C0-\u00FF]+$/.test(city.value) == true) {
    console.log("Ville ok");
    return true;
  } else {
    console.log("Ville non ok");
    return false;
  }
}
validateCity();

//--- FONCTION POUR VALIDER L'EMAIL ---//

function validateEmail() {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value) == true) {
    console.log("Email ok");
    return true;
  } else {
    console.log("Email non ok");
    return false;
  }
}
validateEmail();
