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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteItem()">Supprimer</p>
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

//----------------Fonction pour supprimer un produit------------------//
let deleteProducts = document.getElementsByClassName("deleteItem");

function deleteItem() {
  for (i = 0; i < deleteProducts.length; i++) {
    basket.splice(i, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(basket);
    window.location.reload();
    break;
  }
  if (basket.length == 0) {
    localStorage.clear("basket");
    window.location.reload();
  }
}
