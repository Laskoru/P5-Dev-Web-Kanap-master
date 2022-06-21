const id = window.location.search.split("?id=").join("");
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

        let chooseColor = color.options[color.selectedIndex].value;
        const addBacket = () => {
          let addButton = document.querySelector("#addToCart");
          addButton.addEventListener("click", () => {
            localStorage.setItem(
              "quantity",
              document.querySelector("#quantity").value
            );
            localStorage.setItem("color", chooseColor);
            localStorage.setItem(
              "id",
              window.location.search.split("?id=").join("")
            );
            localStorage.setItem("name", productData.name);
            alert("Produit(s) ajouté(s) au panier : " + productData.quantity);
            console.log(localStorage);
          });
        };
        addBacket();
      });
    });
};
fetchProduct();
