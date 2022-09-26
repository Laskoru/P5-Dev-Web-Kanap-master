const items = document.querySelector("#items");

// Display Products

fetch("http://localhost:3000/api/products/").then((response) => {
  if (response.ok) {
    response.json().then((products) => {
      for (let product of products) {
        items.innerHTML += `<a href="./product.html?id=${product._id}">
                    <article>
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                    </article>
                  </a>`;
      }
    });
  }
});
