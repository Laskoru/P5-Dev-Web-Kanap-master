// Variable servant à récupérer l'ID de la page html
let id = window.location.search.split("?id=").join("");
//
let productData = [];

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      let item = document.querySelector(".item");
      item.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${productData.imageUrl}" alt="${productData.name}">`;
      item.querySelector(
        ".item__content__titlePrice"
      ).innerHTML = `<h1 id="title">${productData.name}</h1>
          <p>Prix : <span id="price">${productData.price}</span>€</p>`;
      item.querySelector(
        ".item__content__description__title"
      ).innerHTML = `<p id="description">${productData.description}</p>`;
      for (let color of productData.colors) {
        item.querySelector(
          "#colors"
        ).innerHTML += `<option value=${color}>${color}</option>`;
      }
      document.querySelector("#addToCart").addEventListener("click", () => {
        document.querySelector("#quantity").reportValidity();
        productData.quantity = parseInt(
          document.querySelector("#quantity").value
        );
        let color = document.querySelector("#colors");
        color.selectedIndex;

        document.querySelector("#colors").reportValidity();

        productData.color = document.querySelector("#colors").value;

        // Fonction servant à sauvegarder le panier dans le localstorage //

        function saveBasket(basket) {
          localStorage.setItem("basket", JSON.stringify(basket));
        }

        // Fonction servant à récupérer le panier dans le localstorage //

        function getBasket() {
          let basket = localStorage.getItem("basket");

          if (basket == null) {
            return [];
          } else {
            return JSON.parse(basket);
          }
        }
        // Fonction servant à ajouter des produits dans le localstorage //

        function addBasket(product) {
          product = {
            id: window.location.search.split("?id=").join(""),
            color: productData.color,
            quantity: productData.quantity,
          };
          //Récupération du panier
          let basket = getBasket();
          // Variable comparant si un produit similaire avec une couleur similaire
          // existe déja dans le panier
          let foundProduct = basket.find(
            (p) => p.id == id && p.color == productData.color
          );
          // si aucun produit n'est trouvé, ajout du produit
          if (foundProduct == undefined) {
            console.log("Premier produit dans le panier");
            basket.push(product);
          } else {
            // si un produit similaire est trouvé, ajoute la quantité
            console.log("Quantité ajouté à un produit existant");
            foundProduct.quantity += productData.quantity;
          }
          saveBasket(basket);
        }

        addBasket();
      });
    });
};
fetchProduct();
