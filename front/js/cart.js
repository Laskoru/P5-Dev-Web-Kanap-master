const items = document.querySelector("#items");

fetch("http://localhost:3000/api/products/").then((response) => {
  if (response.ok) {
    response.json().then((products) => {
      for (let product of products) {
        let addProduct = [
          localStorage.getItem("color"),
          localStorage.getItem("quantity"),
          localStorage.getItem("id"),
        ];

        addProduct = document.querySelector(
          "#cart__items"
        ).innerHTML = `<article class="cart__item" data-id="${addProduct[2]}" data-color="${addProduct[1]}">
              <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.name}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${addProduct[3]}</h2>
                  <p>${addProduct[0]}</p>
                  <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${addProduct[1]}>
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
              </article>`;
      }
    });
  }
});
