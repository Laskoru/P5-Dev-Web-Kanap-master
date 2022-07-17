let id = window.location.search.split("?id=").join("");
let productData = [];

//let panierInit = JSON.parse(localStorage.getItem("itemArray")) || [];

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

        function saveBasket(basket) {
          localStorage.setItem("basket", JSON.stringify(basket));
        }

        function getBasket() {
          let basket = localStorage.getItem("basket");

          if (basket == null) {
            return [];
          } else {
            return JSON.parse(basket);
          }
        }

        function addBasket(product) {
          product = {
            id: window.location.search.split("?id=").join(""),
            color: productData.color,
            quantity: productData.quantity,
          };
          let basket = getBasket();

          let foundProduct = basket.find((p) => p.id == product.id);
          //console.log(foundProduct.id);
          if (basket.length == 0) {
            console.log("Premier produit dans le panier");
            basket.push(product);
          } else {
            //for (let i = 0; i < basket.length; i++) {
            if (
              id == foundProduct.id &&
              productData.color == foundProduct.color
            ) {
              console.log("Quantité ajouté");
              foundProduct.quantity += productData.quantity;
              localStorage.setItem("basket", JSON.stringify(product));
            } else if (foundProduct.id == undefined) {
              basket.push(product);
            }
            // }
            //product.quantity += productData.quantity;

            //basket.push(product);

            //basket.push(product);
          }
          //}
          saveBasket(basket);
        }

        addBasket();
      });
    });
};
fetchProduct();
