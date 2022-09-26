//--- Get ID in html address ---//
let id = window.location.search.split("?id=").join("");
//--- Array of product description ---//
let productData = [];

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      let item = document.querySelector(".item");
      item.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;
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

        //--- Save basket in localStorage ---//

        function saveBasket(basket) {
          if (productData.color == "" || productData.quantity < 1) {
            return;
          } else {
            localStorage.setItem("basket", JSON.stringify(basket));
          }
        }

        //--- Get Basket in localStorage ---//

        function getBasket() {
          let basket = localStorage.getItem("basket");
          if (basket == null) {
            return [];
          } else {
            return JSON.parse(basket);
          }
        }

        //--- Add a product in cart ---//

        function addBasket(product) {
          product = {
            id: window.location.search.split("?id=").join(""),
            color: productData.color,
            quantity: productData.quantity,
          };

          let basket = getBasket();

          let foundProduct = basket.find(
            (p) => p.id == id && p.color == productData.color
          );

          if (foundProduct == undefined) {
            basket.push(product);
          } else {
            foundProduct.quantity += productData.quantity;
          }

          saveBasket(basket);
        }

        addBasket();
      });
    });
};

fetchProduct();
