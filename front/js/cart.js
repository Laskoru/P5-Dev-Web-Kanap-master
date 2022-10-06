let productData = [];
let basket = [];
let price = 0;
let totalQuantity = 0;

//--- Get cart in LocalStorage ---//
basket = JSON.parse(localStorage.getItem("basket"));

if (basket == null || basket.length == 0) {
  document.querySelector(
    "#cartAndFormContainer"
  ).innerHTML = `<h1>Votre panier est vide</h1>`;
} else {
  for (i = 0; i < basket.length; i++) {
    let id = basket[i].id;
    let quantity = basket[i].quantity;
    let color = basket[i].color;

    //--- Cart display ---//

    async function fetchProduct() {
      await fetch(`http://localhost:3000/api/products/${basket[i].id}`)
        .then((res) => res.json())
        .then((promise) => {
          productData = promise;
          document.querySelector(
            "#cart__items"
          ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${basket.color}">
    <div class="cart__item__img">
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
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
          <input type="number" class="itemQuantity" oninput="validity.valid||(value='1');" onchange="changeQuantity()" data-id="${id}" data-color="${color}" data-quantity="${quantity} name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${id}" data-color="${color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
        });

      //--- Total Price ---//

      price += productData.price * quantity;
      document.querySelector("#totalPrice").innerHTML = price;

      //--- Total Quantity ---//

      totalQuantity += parseInt(quantity);
      document.querySelector("#totalQuantity").innerHTML = totalQuantity;

      //--- Delete a product in cart ---//

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

            location.reload();
          });
        }
      }
      deleteItem();
    }

    fetchProduct();
  }
}

// Modify Quantity in cart

function changeQuantity() {
  let changeQuantity = document.querySelectorAll(".itemQuantity");
  changeQuantity.forEach((item) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let i in basket) {
      if (
        basket[i].id == item.dataset.id &&
        basket[i].color == item.dataset.color &&
        changeQuantity[i].value >= 1
      ) {
        (basket[i].quantity = parseInt(changeQuantity[i].value)),
          localStorage.setItem("basket", JSON.stringify(basket));
        location.reload();
      } else {
        location.reload();
      }
    }
  });
}

//--- Declaration of variables used for form and REGEX ---//

let form = document.querySelector(".cart__order__form");
let confirm = document.getElementById("order");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

let addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let genericRegex = /^[a-zA-Z\u00C0-\u00FF ,.'-]+$/;

//--- Validate Form ---//

function validateForm() {
  confirm.addEventListener("click", (e) => {
    if (
      genericRegex.test(firstName.value) == true &&
      genericRegex.test(lastName.value) == true &&
      genericRegex.test(city.value) == true &&
      emailRegex.test(email.value) == true &&
      addressRegex.test(address.value) == true
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

//--- Order cart ---//

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
        // Send to confirmation order //
        window.location.assign(`confirmation.html?orderId=${orderId}`);
        // Delete localStorage //
        localStorage.clear();
      });
  }
}
