let productData = [];
let panier = [];
let price = 0;
let totalQuantity = 0;
panier = JSON.parse(localStorage.getItem("basket"));

// Message si le panier est vide
if (panier === null) {
  document.querySelector(
    "#cartAndFormContainer"
  ).innerHTML = `<h1>Votre panier est vide</h1>`;

  // Sinon, affichage du panier
} else {
  for (i = 0; i < panier.length; i++) {
    let id = panier[i].id;
    let quantity = panier[i].quantity;
    let color = panier[i].color;

    const fetchProduct = async () => {
      await fetch(`http://localhost:3000/api/products/${panier[i].id}`)
        .then((res) => res.json())
        .then((promise) => {
          productData = promise;
          document.querySelector(
            "#cart__items"
          ).innerHTML += `<article class="cart__item" data-id="${id}" data-color="${panier.color}">
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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
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
}
