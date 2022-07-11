let id = window.location.search.split("?id=").join("");

let productData = [];
let i = 0;
let panierInit = JSON.parse(localStorage.getItem("itemArray")) || [];

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

        const addBacket = () => {
          let addButton = document.querySelector("#addToCart");

          let majPanier = {
            id: window.location.search.split("?id=").join(""),
            color: productData.color,
            quantity: document.querySelector("#quantity").value,
          };
          // for (let i = 0; i < localStorage.length; i++) {
          if (
            panierInit.length == 0 ||
            (panierInit[i] &&
              panierInit[i].id &&
              panierInit[i].id !== id &&
              panierInit[i].color !== productData.color)
          ) {
            console.log("true");
            panierInit.push(majPanier),
              localStorage.setItem("itemArray", JSON.stringify(panierInit));
            i++;
          } else {
            console.log("false");

            panierInit[i].quantity =
              parseInt(panierInit[i].quantity) + parseInt(majPanier.quantity);
            localStorage.setItem("itemArray", JSON.stringify(panierInit));
          }
          console.log(i);
        };
        // };
        addBacket();
      });
    });
};
fetchProduct();
