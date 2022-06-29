let productData = [];
const fetchProduct = async () => {
  await fetch(
    `http://localhost:3000/api/products/${localStorage.getItem("id")}`
  )
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(productData);
      let stockColor = localStorage.getItem("color");
      let stockQuantity = localStorage.getItem("quantity");

      let cartItem = (document.querySelector(
        "#cart__items"
      ).innerHTML = `<article class="cart__item" data-id="${localStorage.getItem(
        "id"
      )}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${productData.imageUrl}" alt="${productData.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${productData.name}</h2>
          <p>${stockColor}</p>
          <p>${productData.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${stockQuantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`);
    });
};
fetchProduct();

let sauvegardePanier = [];
